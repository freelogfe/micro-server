'use strict'
const fse = require('fs-extra')
const nodegit = require('nodegit')
const ora = require('ora')
const path = require('path')
const CWD = process.cwd()

const wwzhUser = {
  token: 'dc82d902325baab2eff756689c04af50ea12a0a5',
  name: 'Wweizhi',
  email: '790727372@qq.com',
}
const signature = nodegit.Signature.now(wwzhUser.name, wwzhUser.email)

const I18N_BRANCH_NAME = 'i18n'
const REMOTE_BRANCH_NAME = 'i18n-test'
const REMOTE_ORIGIN = 'origin'

async function openRepository(opts) {
  const { reposUrl, reposDirName, i18nDirPath } = opts
  const reposDirPath = path.resolve(CWD, reposDirName)
  const exists = await fse.pathExistsSync(reposDirPath)

  let repository = null
  if (!exists) {
    const spinner = ora(`clone into '${reposUrl}'...`)
    spinner.start()
    try {
      repository = await nodegit.Clone(reposUrl, reposDirName, {
        fetchOpts: {
          callbacks: {
            credentials() {
              return nodegit.Cred.userpassPlaintextNew(wwzhUser.token, 'x-oauth-basic')
            },
            certificateCheck() {
              return 0
            },
          },
        },
      })
      spinner.succeed()
      updateTrackListFile(opts)
      // await setSparseCheckout(reposDirName, i18nDirPath, repository)
    } catch (e) {
      spinner.fail(e.toString())
      console.log('[error]: ', e)
    }
  } else {
    repository = await nodegit.Repository.open(reposDirPath)
  }

  return repository
}

async function updateTrackListFile(opts) {
  const trackListFilePath = path.resolve(CWD, 'track-list.json')
  fse.ensureFileSync(trackListFilePath)
  const trackListJon = require(trackListFilePath, { throws: false }) || {}
  const { reposUrl, reposDirName, i18nDirPath } = opts
  trackListJon[reposDirName] = { reposUrl, i18nDirPath }
  fse.writeFileSync(trackListFilePath, JSON.stringify(trackListJon, null, '\t'))
}

async function setSparseCheckout(reposDirName, i18nDirPath, repository) {
  const config = await repository.config()
  await config.setBool('core.sparseCheckout', 1)
  const sparseCoFilePath = path.resolve(CWD, reposDirName, '.git/info/sparse-checkout')
  fse.ensureFileSync(sparseCoFilePath)
  fse.writeFileSync(sparseCoFilePath, i18nDirPath)
}

async function checkRemoteBranch(repository, brName) {
  let reference
  try {
    reference = await repository.getReference(REMOTE_BRANCH_NAME).catch(e => e)
    const isCheckoutToHead = reference instanceof Error

    if (isCheckoutToHead) {
      const targetCommit = await repository.getHeadCommit()
      reference = await repository.createBranch(brName, targetCommit, false)
      await repository.checkoutBranch(reference, {})
      const commit = await repository.getReferenceCommit('refs/remotes/origin/' + brName)
      await nodegit.Reset.reset(repository, commit, 3, {})
    } else {
      await repository.checkoutBranch(reference, {})
      console.log(`Already on '${brName}'`)
    }
  } catch (e) {
    console.log('[checkRemoteBranch error]:', e)
  }
  return reference
}

async function createNewBranch(repository, brName = I18N_BRANCH_NAME) {
  let reference
  try {
    // reference = await repository.getReference(brName)
    reference = await repository.getBranch(brName).catch(e => e)
    if (reference instanceof Error) {
      // 不存在该分支，可新建
      const commit = await repository.getMasterCommit()
      reference = await repository.createBranch(brName, commit, 0)
      console.log(`Created branch ${brName}`)
    } else {
      console.log(` A branch named '${brName}' already exists.`)
    }
    await repository.checkoutBranch(reference, {})
    console.log(`Switched to a new branch '${brName}'`)
  } catch (e) {
    console.log('[createNewBranch error]: ', e)
  }
  return reference
}

async function commitAndPush(repository) {
  const changes = await getChangesByStatus(repository)

  if (changes.size === 0) {
    console.log('nothing to commit, working tree clean')
  } else {
    const commitId = await commitFiles(repository, changes)

    const errorCode = await push(repository)

    if (errorCode == null) {
      console.log(`[nodegit i18n] push success! ${commitId}`)
    }
  }
}

async function getChangesByStatus(repository) {
  const statuses = await repository.getStatus()
  const changes = new Set()
  statuses.forEach(status => {
    const path = status.path()
    if (status.isNew() || status.isModified() || status.isDeleted() || status.isTypechange() || status.isRenamed()) {
      changes.add(path)
    }
  })
  return changes
}

async function commitFiles(repository, changes) {
  const indexResult = await repository.refreshIndex()
  const oidResult = await indexResult.addAll().then(() => indexResult.write()).then(() => indexResult.writeTree())
  const head = await nodegit.Reference.nameToId(repository, 'HEAD')
  const parent = await repository.getCommit(head)
  const commitMsg = `[nodegit i18n] commit ${changes.size} changes.`
  console.log(commitMsg, [ ...changes ])
  const oid = await repository.createCommit('HEAD', signature, signature, commitMsg, oidResult, [parent])
  return oid.tostrS()
}

async function push(repository) {
  const remoteResult = await repository.getRemote(REMOTE_ORIGIN)
  let refSpecs = await remoteResult.getPushRefspecs()

  if (refSpecs.length === 0) {
    const refSpec = `refs/heads/${REMOTE_BRANCH_NAME}:refs/heads/${REMOTE_BRANCH_NAME}`
    nodegit.Remote.addPush(repository, 'origin', refSpec)
    refSpecs = [ refSpec ]
  }

  const result = await remoteResult.push(
    refSpecs,
    {
      callbacks: {
        credentials() {
          return nodegit.Cred.userpassPlaintextNew(wwzhUser.token, 'x-oauth-basic')
        },
      },
    }
  )
  return result
}

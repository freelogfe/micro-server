'use strict'
const Service = require('egg').Service
const nodegit = require('nodegit')
const path = require('path')
const fse = require('fs-extra')
const checkRemoteBranch = require('../../nodegit-core/checkRemoteBranch')
const addAndCommit = require('../../nodegit-core/addAndCommit')
const push = require('../../nodegit-core/push')

class I18nManagementService extends Service {
  async trackRepository(repositoryName = 'freelogfe-web-repos') {
    const { I18N_BRANCH_NAME, REMOTE_ORIGIN, user: { name, email, token } } = this.app.config.nodegit
    const repositoryInfo = this._getRepositoryInfo(repositoryName)
    try {
      const repository = await nodegit.Repository.open(repositoryInfo.reposDirPath)
      const ref = await repository.getCurrentBranch()
      console.log('repository --', ref.name())
      await checkRemoteBranch(repository, I18N_BRANCH_NAME)
      const commitId = await addAndCommit(repository, name, email)
      if (commitId != null) {
        push(repository, REMOTE_ORIGIN, I18N_BRANCH_NAME, token)
      }
    } catch (e) {
      console.log(e)
    }
    return repositoryInfo
  }

  _getRepositoryInfo(repositoryName) {
    const { trackedRepositories, i18nRepositoriesDirPath } = this.app.config.nodegit
    const CWD = process.cwd()
    for (const reposName in trackedRepositories) {
      const { reposUrl, reposI18nPath } = trackedRepositories[reposName]
      if (reposName === repositoryName) {
        return {
          reposName,
          reposUrl,
          reposI18nPath,
          reposDirPath: path.resolve(CWD, i18nRepositoriesDirPath, reposName),
        }
      }
    }
    return null
  }

  async getRepositoryI18nDirs(repositoryName) {
    const { i18nRepositoriesDirPath, trackedRepositories } = this.app.config.nodegit
    const { reposI18nPath } = trackedRepositories[repositoryName]
    const reposDirPath = path.resolve(process.cwd(), i18nRepositoriesDirPath, repositoryName)
    const reposI18nDirPath = path.resolve(reposDirPath, reposI18nPath)
    const dirs = this._scanI18nDirectory(reposI18nDirPath)
    return dirs
  }

  _scanI18nDirectory(path) {
    const dirs = fse.readdirSync(path)
    return dirs
  }
}

module.exports = I18nManagementService


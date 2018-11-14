const {execSync} = require('child_process')
const CWD = process.cwd()

function getGitBranchName() {
  var name = execSync(`git branch | grep '*' | sed 's/* //'`, {
    cwd: CWD
  }).toString()
  return name.trim()
}


function main() {
  var br = getGitBranchName()
  if (br === 'master') {
    execSync(`npm test`, {
      cwd: CWD,
      env: process.env,
      stdio: 'inherit'
    })
  }
}

main()
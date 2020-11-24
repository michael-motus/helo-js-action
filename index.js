const core = require('@actions/core');
const github = require('@actions/github');

const githubApi = require('./GithubGraphApi');
// const motus = require("./motus");


async function action (){
  var repoConfig = {
    id: null,
    name: 'empty',
    owner: 'you',
    token: null
  };

  try {
    console.log("config: " + JSON.stringify(repoConfig));
    repoConfig.name = core.getInput('repo-name', {required: true});
    repoConfig.owner = core.getInput('repo-owner', {required: true});
    repoConfig.token = core.getInput('repo-token', {required: true});
    console.log("config: " + JSON.stringify(repoConfig));
    var issueNumber = core.getInput('issue-number', {required: true});
    console.log(issueNumber);
    var stageLabel = core.getInput('new-label', {required: true});
    console.log(stageLabel);

    var issue = await githubApi.getIssueByNumber(issueNumber);
    console.log("Issue is:\n",JSON.stringify(issue));
   
    core.setOutput("repo", JSON.stringify(issue));
  } catch (error) {
    core.setFailed(error.message);
  }
}

action();

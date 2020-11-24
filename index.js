const core = require('@actions/core');
const github = require('@actions/github');
const { isNull } = require('util');

const githubApi = require('./GithubGraphApi');
// const motus = require("./motus");
var repoConfig = {
      id : null,
      // name : null,
      // owner : null,
      token : null,
  // id: "MDEwOlJlcG9zaXRvcnkzMTQzOTQyNjY=",
  name: "helo-js-action",
  owner:  "michael-motus",
  // token:"6dc0b11b5f007352b5ce99804c10ad56571c204d",
}

async function action (){
  try {
    // var repoString = github.context.repository;
    // repoString = repoString.split("/");
    // repoConfig.owner = repoString[0];
    // repoConfig.name = repoString[1];
    console.log("config: " + JSON.stringify(repoConfig));
    repoConfig.token = core.getInput('repo-token', {required: true});
    var repoInfo = core.getInput('repo-info', {required: true});
    console.log("input: " + repoInfo);
    repoInfo = repoInfo.split("/");
    repoConfig.owner = repoInfo[0];
    repoConfig.name = repoInfo[1];
    console.log("config: " + JSON.stringify(repoConfig));
   
    const response = await githubApi.getRepoInfo(repoConfig);
    console.log(JSON.stringify(response));
    const time = (new Date()).toTimeString();
    core.setOutput("repo", JSON.stringify(response));
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

action();

const core = require('@actions/core');
const github = require('@actions/github');

const githubApi = require('./GithubGraphApi');
// const motus = require("./motus");
const repoConfig = {
//       id : github.context.repo.id,
//       name : github.context.repo.name,
//       owner : github.context.repo.owner,
//       token : github.context.repo.token,
  id: "MDEwOlJlcG9zaXRvcnkzMTQzOTQyNjY=",
  name: "helo-js-action",
  owner:  "michael-motus",
  token:"6dc0b11b5f007352b5ce99804c10ad56571c204d",
}

async function action (){
  try {
    
    console.log(JSON.stringify(repoConfig));
  
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

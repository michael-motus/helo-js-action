const core = require('@actions/core');
const github = require('@actions/github');

const githubApi = require('./GithubGraphApi');
const motus = require("./motus");


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
    issueNumber = JSON.parse(issueNumber);
    console.log(issueNumber);
    var stageLabel = core.getInput('new-label', {required: true});
    console.log(stageLabel);

    var issue = await githubApi.getIssueByNumber(repoConfig, issueNumber);
    console.log("Issue is:\n",JSON.stringify(issue));
   
    core.setOutput("repo", JSON.stringify(issue));
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function setup(){
  const labels = [ ...motus.standards.disciplineLabels,
      ...motus.standards.needLabels,
      ...motus.standards.stageLabels,
      ...motus.standards.typeLabels,
  ];
  const columns = motus.standards.stageColumns;
  const projects = motus.standards.baseProjects;
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

    for(const label of labels) {
        console.log(repo_id, ", ", JSON.stringify(label));
        const result = await githubApi.addRepoLabel(repo_id, label);
        console.log("label result: ", JSON.stringify(result));
    };
    for(const project of projects) {
        const resultProject = await githubApi.addRepoProject(repoConfig, project.name, project.body);
        console.log("project result: ", JSON.stringify(resultProject));
        var projID = resultProject.id;
        console.log(projID);
        // for(const column of columns) {
        //     const resultColumn = await githubApi.addProjectColumn(resultProject.id, column.name)
        //     console.log("project result: ", JSON.stringify(resultColumn));               
        // }
    }
  } catch (err) {
      console.log("failed", err.request)
      console.log(err.message)
  }
}

setup();
// action();
const core = require('@actions/core');
const github = require('@actions/github');
const githubApi = require('../../../GithubGraphApi');

async function action (){
  var repoConfig = {
    id: null,
    name: 'empty',
    owner: 'you',
    token: null
  };

  try {
    console.log("config: " + JSON.stringify(repoConfig));
    repoConfig.id = core.getInput('repo-id', {required: true});
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
    if (issue.projectCards.totalCount > 0) {
      // - if card does not exist, throw error becasue issue is not assigned to a project
      // @todo-later:
      // - 2a: for each label throw error on incorrect design stage and state labels
      // - mavenlink integration
      const cards = issue.projectCards.nodes;
      for(const card of cards){
          const project = await githubApi.getProjectByNumber(repoConfig, card.project.number);
          console.log("Card is: \n",JSON.stringify(card));
          console.log("Project is: \n",JSON.stringify(project));
          const column = await githubApi.getColumnByName(project.columns.nodes, stageLabel);
          const check = await githubApi.setCardColumn(repoConfig, card.id, column.id);
          console.log("Move result: ", JSON.stringify(check));
      }
    }  
    // @todo: go through stage labels and remove other stages if they exist. 
    core.setOutput("repo", JSON.stringify(issue));
  } catch (error) {
    core.setFailed(error.message);
  }
}

action();
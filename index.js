const core = require('@actions/core');
const github = require('@actions/github');

const githubApi = require('./GithubGraphApi');

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

const baseProjects = [
  {
    "name" : "Design Overview",
    "body" : "Collection of *ALL* Design Issues in a Project"
  },
  {
    "name" : "Functional Design",
    "body" : "Collection of Functional Design Issues"
  },
  {
    "name" : "Mechanical Design",
    "body" : "Collection of Mechanical Design Issues"
  },
  {
    "name" : "Hardware Design",
    "body" : "Collection of Hardware Design Issues"
  },
  {
    "name" : "Firmware Design",
    "body" : "Collection of Firmware Design Issues"
  },
  {
    "name" : "Software Design",
    "body" : "Collection of Software Design Issues"
  }
];

const stageColumns = [
  {
    "name": "INVESTIGATION",
  },      
  {
    "name": "IMPLEMENTATION",
  },       
  {
    "name": "DESIGN REVIEW",
  },       
  {
    "name": "TESTING",
  },
  {
    "name": "RELEASED",
  },  
];

const disciplineLabels = [
  {
    "color": "23445D",
    "description": "Functional Design Issue",
    "name": "FUNCTIONAL",
  },      
  {
    "color": "006600",
    "description": "Mechnical Design Issue",
    "name": "MECHNICAL",
  },       
  {
    "color": "B0740C",
    "description": "Hardware Design Issue",
    "name": "HARDWARE",
  },       
  {
    "color": "CCCC00",
    "description": "Firmware Design Issue",
    "name": "FIRMWARE",
  },
  {
    "color": "990099",
    "description": "Software Design Issue",
    "name": "SOFTWARE",
  },       
];

const needLabels = [
  {
    "color": "FF0000",
    "description": "Issue is critical to design scope",
    "name": "CRITICAL",
  },       
  {
    "color": "FFB366",
    "description": "Issue is of high value to design scope",
    "name": "HIGH",
  },       
  {
    "color": "FFFF66",
    "description": "Issue is of low value to design scope",
    "name": "LOW",
  },       
  {
    "color": "FFF2CC",
    "description": "Issue is of no value to design scope",
    "name": "NONE",
  },       
];

const typeLabels = [
  {
    "color": "0075CA",
    "description": "Issue addresses documentation of functionality",
    "name": "Document",
  },       
  {
    "color": "D73A4A",
    "description": "Issue addresses intended functionality",
    "name": "Feature",
  },       
  {
    "color": "A2EEEF",
    "description": "Issue addresses unintended functionality",
    "name": "Bugs",
  },       
];

const stageLabels = [
  {
    "color": "14C4AD",
    "description": "This is an issue being investigated",
    "name": "INVESTIGATION",
  },      
  {
    "color": "7C7CCF",
    "description": "This is an issue being implmemented",
    "name": "IMPLEMENTATION",
  },       
  {
    "color": "999900",
    "description": "This is an issue in desgin review",
    "name": "DESIGN REVIEW",
  },       
  {
    "color": "177373",
    "description": "This is an issue being tested",
    "name": "TESTING",
  },
  {
    "color": "2EB237",
    "description": "This is an issue ready for release",
    "name": "RELEASED",
  },       
];

async function setup(){
  const labels = [ ...disciplineLabels,
      ...needLabels,
      ...stageLabels,
      ...typeLabels,
  ];
  const columns = stageColumns;
  const projects = baseProjects;
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
    repoConfig.id = core.getInput('repo-id', {required: true});
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
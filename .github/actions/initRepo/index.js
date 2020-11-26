const core = require('@actions/core');
const github = require('@actions/github');
const githubApi = require('../../../GithubGraphApi');

async function action(){
  const labels = [ ...githubApi.motusDefault.stages,
      ...githubApi.motusDefault.needLabels,
      ...githubApi.motusDefault.typeLabels,
      ...githubApi.motusDefault.statusLabels,
  ];

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

    console.log("labels: " + JSON.stringify(labels));
    for(const label of labels) {
        console.log("adding: ", JSON.stringify(label));
        const result = await githubApi.addRepoLabel(repoConfig, label);
        console.log("label result: ", JSON.stringify(result));
    }
  } catch (err) {
      console.log("failed", err.request)
      console.log(err.message)
  }
}

// setup();
action();
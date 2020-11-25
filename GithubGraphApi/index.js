const query = require('./query');
const mutation = require('./mutation');
const {graphql} = require('@octokit/graphql');

async function getIssueByNumber(repo, issueNumber) {
    const queryVariables = Object.assign({},{
        repo_owner: repo.owner, 
        repo_name: repo.name,
        headers: {
            authorization: `Bearer ` + repo.token,
            accept: `application/vnd.github.bane-preview+json`,
            },   
        },
        { issue_number: issueNumber}
    );
    try {
        const response = await Promise.resolve(graphql(
                    query.issueByNumber,
                    queryVariables 
                    )
        );
        return response.repository.issue;
    } catch (err) {
        console.log("failed", err.request);
        console.log(err.message);
        return null;
    }
}

async function getColumnByName(columns, name) {
    console.log("get "+name+" from "+JSON.stringify(columns));
    for(const column of columns){
        console.log(column.name);
        if (column.name.toLowerCase() === name.toLowerCase()){
            console.log("matched: \n",JSON.stringify(column));
            return column;
        } 
    };
    console.log(name+" not found");
    return null;
}

async function getProjectByNumber(repo, projectNumber) {
    const queryVariables = Object.assign({},{
        repo_owner: repo.owner, 
        repo_name: repo.name,
        headers: {
            authorization: `Bearer ` + repo.token,
            accept: `application/vnd.github.bane-preview+json`,
            },   
        },
        { project_number: projectNumber }
    );

    try {
        const response = await graphql(
           query.projectByNumber,
           queryVariables 
        );
        return response.repository.project;
    } catch (err) {
        console.log("failed", err.request)
        console.log(err.message)
        return null;
    }
}

async function getRepoInfo(repo) {
    const queryVariables = Object.assign({},{
        repo_owner: repo.owner, 
        repo_name: repo.name,
        headers: {
            authorization: `Bearer ` + repo.token,
            accept: `application/vnd.github.bane-preview+json`,
            },   
        }
    );

    try {
        const response = await graphql(
           query.getRepoInfo,
           queryVariables 
        );
        return response.repository;
    } catch (err) {
        console.log("failed", err.request)
        console.log(err.message)
        return null;
    }
}

async function setCardColumn(repo, cardId, columnId) {
    const queryVariables = Object.assign({}, {
        repo_owner: repo.owner, 
        repo_name: repo.name,
        headers: {
            authorization: `Bearer ` + repo.token,
            accept: `application/vnd.github.bane-preview+json`,
            },   
        },
        { card_id: cardId, column_id: columnId }
    );

    try {
        console.log("card_id: ", queryVariables.card_id, " : ", cardId);
        console.log("colunm_id: ", queryVariables.column_id, " : ", columnId);

        const response = await graphql(
           mutation.setCardColumn,
           queryVariables 
        );
        return response.moveProjectCard.cardEdge.node;
    } catch (err) {
        console.log("failed", err.request)
        console.log(err.message)
        return null;
    }
}

async function addRepoLabel(repo, label) {
    const queryVariables = Object.assign({},{
        repo_owner: repo.owner, 
        repo_name: repo.name,
        headers: {
            authorization: `Bearer ` + repo.token,
            accept: `application/vnd.github.bane-preview+json`,
            },   
        },
        { repo_id: repo.id, label_name: label.name, label_description: label.description, label_color: label.color }
    );

    try {
        console.log("vars: ", JSON.stringify(queryVariables));

        const response = await graphql(
           mutation.addRepoLabel,
           queryVariables 
        );
        return response.createLabel.label;
    } catch (err) {
        console.log("failed", err.request)
        console.log(err.message)
        return null;
    }
}


async function addRepoProject(repo, projectName, projectBody ) {
    // @todo: add null parameter rejection for required parameters

    projectBody = projectBody || null;
    
    const queryVariables = Object.assign({},{
        repo_owner: repo.owner, 
        repo_name: repo.name,
        headers: {
            authorization: `Bearer ` + repo.token,
            accept: `application/vnd.github.bane-preview+json`,
            },   
        },
        { repo_id: [repo.id], owner_id: repo.id, project_name: projectName, project_body: projectBody }
    );

    try {
        console.log("vars: ", JSON.stringify(queryVariables));

        const response = await graphql(
           mutation.addRepoProject,
           queryVariables 
        );
        return response.createProject.project;
    } catch (err) {
        console.log("failed", err.request)
        console.log(err.message)
        return null;
    }
}

async function addProjectColumn(repo, projectId, columnName ) {
    // @todo: add null parameter rejection for required parameters
    
    const queryVariables = Object.assign({},{
        repo_owner: repo.owner, 
        repo_name: repo.name,
        headers: {
            authorization: `Bearer ` + repo.token,
            accept: `application/vnd.github.bane-preview+json`,
            },   
        },
        { project_id: projectId, column_name: columnName }
    );

    try {
        console.log("vars: ", JSON.stringify(queryVariables));

        const response = await graphql(
           mutation.addProjectColumn,
           queryVariables 
        );
        return response.addProjectColumn.project;
    } catch (err) {
        console.log("failed", err.request)
        console.log(err.message)
        return null;
    }
}

module.exports = {
    getColumnByName,
    getIssueByNumber,
    getProjectByNumber,
    setCardColumn,
    addRepoLabel,
    addRepoProject,
    addProjectColumn,
    getRepoInfo
}
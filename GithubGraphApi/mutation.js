const setStageLabels = `mutation setStageLabels($issue_id: ID!, $label_id:[ID!]!) {
    addLabelsToLabelable(input:{labelableId:$issue_id,labelIds:$label_id}){
      labelable {
        labels(first:100) {
            nodes {
            id
            name
            color
          }
        }
      }
    }
  }
`
const setCardColumn = `mutation setCardColumn($card_id: ID!, $column_id: ID!) {
    moveProjectCard(input: {cardId: $card_id, columnId:$column_id}) {
      cardEdge {
        node {
          id
          note
          column {
                project{
                name
            }
            name
            purpose
          }
        }
      }
    }
  }
`
const addRepoProject = `mutation createProject($repo_id: [ID!], $owner_id: ID!, $project_name: String!, $project_body: String) {
  createProject( input:{repositoryIds: $repo_id, ownerId: $owner_id, name: $project_name,  body: $project_body, }) {
      project{
        id
        body
        name
        owner{
          id
        }
        columns(first: 100){
          totalCount
          nodes{
            id
            name
          }
        }
      }
    }
  }
`
const addRepoLabel = `mutation addLaabel($repo_id: ID!, $label_name: String!, $label_description:String!, $label_color:String!) {
    createLabel(input:{repositoryId: $repo_id, name: $label_name, description: $label_description, color: $ label_color}) {
      label {
        repository {
          name
        }
        id
        name
        description
        color
      }
    }
  }
`
const addProjectColumn = `mutation addProjectColumn($project_id: ID!, $column_name: String!) {
    addProjectColumn(input:{projectId: $project_id, name: $column_name }) {
      project{
        id
        name
        columns(first:100) {
          nodes{
            id
            name
          }
        }
      }  
    }
  }
`
module.exports = {
  setCardColumn,
  setStageLabels,
  addRepoLabel,
  addRepoProject,
  addProjectColumn
}
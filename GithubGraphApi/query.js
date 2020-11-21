const labelByName = `query labelByName($repo_owner: String!, $repo_name: String!, $label_name: String!) {
        repository(owner: $repo_owner, name: $repo_name) {
            label(name: $label_name) {
                name
                description
                id
                color
            }
        }
    }
`
const projectByNumber = `query projectByNumber($repo_owner: String!, $repo_name: String!, $project_number: Int!) {
    repository(owner: $repo_owner, name: $repo_name) {
      project(number:$project_number){
        id
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
const issueByNumber = `query issueByNumber($repo_owner: String!, $repo_name: String!, $issue_number: Int!) {
    repository(owner: $repo_owner, name: $repo_name) {
      issue(number:$issue_number){
        id
        projectCards(first:100){
          totalCount
          nodes{
            id
            column{
              id
              name
              project{
                id
                number
                name
              }
            }
            project{
              id
              name
              number
            }
          }
        }
        labels(first:100){
          totalCount
          nodes {
            id
            name
            isDefault
            color
          }
        }
      }
    }
  }
`
const getRepoInfo = `query getRepoInfo($repo_owner: String!, $repo_name: String!) {
  repository(owner: $repo_owner, name: $repo_name) {
    id
    labels(first:100) {
      totalCount
      nodes{
        name
        description
        id
        color
      }
    }
    projects(first:100){
      totalCount
      nodes{
        id
        name
        body
        state
      }
    }
    issues(first: 100){
      totalCount
      nodes{
        id
        number
        title
        state
      }
    }
  }
}
`
module.exports = {
    issueByNumber,
    projectByNumber,
    labelByName,
    getRepoInfo
}

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


const needLabels = [
  {
    "color": "ff6767",
    "description": "Issue is critical to design scope",
    "name": "4: Critical",
  },       
  {
    "color": "ffbf7f",
    "description": "Issue is of high value to design scope",
    "name": "4: High",
  },       
  {
    "color": "fcfc7f",
    "description": "Issue is of low value to design scope",
    "name": "4: Low",
  },       
  {
    "color": "fff0bf",
    "description": "Issue is of no value to design scope",
    "name": "4: None",
  },       
];

const statusLabels = [
  {
    "color": "cfcfcf",
    "description": "new issue for triage",
    "name": "2: New",
  },
  {
    "color": "cfcfcf",
    "description": "re-opened issue for triage",
    "name": "2: Reopened",
  },
  {
    "color": "bf7fbf",
    "description": "issue ready for, or being worked on",
    "name": "2: In Progress",
  },
  {
    "color": "f7bfbf  ",
    "description": "issue is blocked, waiting on EPL action",
    "name": "2: Blocked",
  },
  {
    "color": "f7bf7f",
    "description": "issue is fixed, EPL action required",
    "name": "2: Fixed",
  },
  {
    "color": "bfdff7",
    "description": "issue is resolved",
    "name": "2: Resolved",
  },
  {
    "color": "bfdff7",
    "description": "issue is a duplicate",
    "name": "2: Duplicate",
  },
  {
    "color": "bfdff7",
    "description": "issue is cannot be reporduced",
    "name": "2: Can't Reproduce",
  },
  {
    "color": "bfdff7",
    "description": "issue is not going to be addressed",
    "name": "2: Won't Fix",
  },
];

  const typeLabels = [
    {
      "color": "1d76db",
      "description": "Issue addresses documentation of behaviour or functionality",
      "name": "3: Document",
    },       
  {
    "color": "d5765d",
    "description": "Issue addresses intended behaviour or functionality",
    "name": "3: Feature",
  },       
  {
    "color": "db1d1d",
    "description": "Issue addresses unintended behaviour or functionality",
    "name": "3: Bugs",
  },       
];

const stages = [
  {
    "color": "5f5f5f",
    "description": "This issue is new and waiting for triage",
    "name": "0: NEW",
  },      
  {
    "color": "1f7f5f",
    "description": "This issue is being investigated",
    "name": "1: INVESTIGATION",
  },
  {
    "color": "5f5f9f",
    "description": "This issue is being implmemented",
    "name": "1: IMPLEMENTATION",
  },           
  {
    "color": "1f7f9f",
    "description": "This issue is being tested",
    "name": "1: TESTING",
  },
  {
    "color": "3f5fbf",
    "description": "This issue is can be released",
    "name": "1: RELEASE",
  },       
];

module.exports = {
  baseProjects,
  statusLabels,
  needLabels,
  stages,
  typeLabels,
  disciplineLabels,  
}
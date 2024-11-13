import { storageService } from "../async-storage.service.js"
import { makeId } from "../util.service.js"

const STORAGE_KEY = "boardDB"
_createBoards()

export const boardService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  getEmptyBoard,
  filterBoard
}
window.cs = boardService

async function query(filterBy = { title: "" }) {
  let boards = await storageService.query(STORAGE_KEY)
  const { title } = filterBy

  if (title) {
    const regex = new RegExp(title, "i")
    boards = boards.filter((board) => regex.test(board.title))
  }

  return boards
}

function filterBoard(board, filters) {
  const filteredGroups = filterGroupsByTasks(board.groups, filters)

  return {
    ...board,
    groups: filteredGroups,
  };
}

function filterGroupsByTasks(groups, filters) {
  return groups
    .map(group => {

      // Check if the group matches group-level filters
      const groupMatches = (!filters.title || new RegExp(filters.title, "i").test(group.title))

      // Filter tasks within the group based on task-level filters only if the group does not match
      const filteredTasks = groupMatches ? group.tasks : filterEntities(group.tasks, filters)

      // Only return the group if it matches group-level filters or contains matching tasks
      if (groupMatches || filteredTasks.length > 0) {
        return { ...group, tasks: filteredTasks }
      }

      return null // Exclude groups that don't match and have no matching tasks
    })
    .filter(group => group) // Exclude null groups
}

function filterEntities(entities, filters) {
  let filtered = entities

  if (filters.title) {
    const regex = new RegExp(filters.title, "i")
    filtered = filtered.filter(entity => regex.test(entity.title))
  }
  if (filters.status) {
    filtered = filtered.filter(entity => entity.status === filters.status)
  }
  if (filters.priority) {
    filtered = filtered.filter(entity => entity.priority === filters.priority)
  }

  return filtered
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  let savedBoard
  if (board._id) {
    const boardToSave = {
      ...board,
      updatedAt: Date.now(),
    }
    savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
  } else {
    const boardToSave = _createBoard(board)
    savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
  }
  return savedBoard
}



function _createBoard(board) {
  board._id = makeId()
  board.createdAt = Date.now()
  board.groups = board.groups || []
  board.activities = board.activities || []
  board.labels = board.labels || [
    { id: "l101", title: "Done", color: "#01c875", type: "status" },
    { id: "l102", title: "Stuck", color: "#e02f4b", type: "status" },
    { id: "l103", title: "Working on it", color: "#fdbb63", type: "status" },
    { id: "l104", title: "Bonus", color: "#b57ce3", type: "status" },
    { id: "l105", title: "Coming soon", color: "#7aaffd", type: "status" },
    { id: "l106", title: "High", color: "#6545a9", type: "priority" },
    { id: "l107", title: "Medium", color: "#777ae5", type: "priority" },
    { id: "l108", title: "Low", color: "#7aaffd", type: "priority" },
    { id: "l109", title: "Critical", color: "#5c5c5c", type: "priority" }
  ]
  board.members = board.members || []
  return board
}

async function _createBoards() {
  let boards = await storageService.query(STORAGE_KEY)
  if (!boards || !boards.length) {
    await storageService.post(STORAGE_KEY, {

      "title": "Project Alpha",
      "isStarred": false,
      "archivedAt": 1589983468418,
      "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
      },
      "labels": [
        {
          "id": "l101",
          "title": "Done",
          "color": "#01c875",
          "type": "status"
        },
        {
          "id": "l102",
          "title": "Stuck",
          "color": "#e02f4b",
          "type": "status"
        },
        {
          "id": "l103",
          "title": "Working on it",
          "color": "#fdab3d",
          "type": "status"
        },
        {
          "id": "l104",
          "title": "Bonus",
          "color": "#b57ce3",
          "type": "status"
        },
        {
          "id": "l105",
          "title": "Coming soon",
          "color": "#7aaffd",
          "type": "status"
        },
        {
          "id": "l106",
          "title": "High",
          "color": "#401694",
          "type": "priority"
        },
        {
          "id": "l107",
          "title": "Medium",
          "color": "#5559df",
          "type": "priority"
        },
        {
          "id": "l108",
          "title": "Low",
          "color": "#579bfc",
          "type": "priority"
        },
        {
          "id": "l109",
          "title": "Critical",
          "color": "#333333",
          "type": "priority"
        }
      ],
      "members": [
        {
          "_id": "u101",
          "fullname": "Tal Taltal",
          "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
        },
        {
          "_id": "u102",
          "fullname": "Josh Ga",
          "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
        }
      ],
      "groups": [
        {
          "id": "g101",
          "title": "Website Redesign",
          "color": "#007bff",
          "tasks": [
            {
              "id": "c101",
              "title": "Define Project Scope",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                },
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "High",
              "date": "2024-11-01T00:00:00Z",
              "conversation": []
            },
            {
              "id": "c102",
              "title": "Create Wireframes",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                },
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Done",
              "priority": "Medium",
              "date": "2024-11-01T00:00:00Z",
              "conversation": []
            },
            {
              "id": "c103",
              "title": "Design Homepage Mockup",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                },
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Stuck",
              "priority": "Critical",
              "date": "2024-11-01T00:00:00Z",
              "conversation": []
            },
            {
              "id": "c104",
              "title": "Develop Landing Page",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                },

              ],
              "status": "Done",
              "priority": "Low",
              "conversation": []
            },
            {
              "id": "c105",
              "title": "Review Competitor Websites",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "Low",
              "conversation": []
            },
            {
              "id": "c106",
              "title": "Conduct Usability Testing",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                },
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "Medium",
              "conversation": []
            },
            {
              "id": "c107",
              "title": "Implement SEO Best Practices",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Done",
              "priority": "Finished",
              "conversation": []
            },
            {
              "id": "c108",
              "title": "Create Mobile Layout",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "High",
              "conversation": []
            },
            {
              "id": "c109",
              "title": "Test Cross-Browser Compatibility",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                },
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Stuck",
              "priority": "Critical",
              "conversation": []
            }
          ]
        },
        {
          "id": "g102",
          "title": "Marketing Campaign",
          "color": "#ff6347",
          "tasks": [
            {
              "id": "c201",
              "title": "Define Target Audience",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Stuck",
              "priority": "Critical",
              "conversation": []
            },
            {
              "id": "c202",
              "title": "Create Social Media Content Calendar",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                },
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "Low",
              "conversation": []
            },
            {
              "id": "c203",
              "title": "Set Up Email Campaign",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "Medium",
              "conversation": []
            },
            {
              "id": "c204",
              "title": "Track Campaign Performance",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Done",
              "priority": "Finished",
              "conversation": []
            },
            {
              "id": "c205",
              "title": "Design Ad Creatives",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "High",
              "conversation": []
            },
            {
              "id": "c206",
              "title": "Schedule Social Media Posts",
              "assignedTo": [
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Stuck",
              "priority": "Critical",
              "conversation": []
            },
            {
              "id": "c207",
              "title": "Launch Google Ads Campaign",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Done",
              "priority": "Finished",
              "conversation": []
            }
          ]
        },
        {
          "id": "g103",
          "title": "Product Launch",
          "color": "#e02f4b",
          "tasks": [
            {
              "id": "c301",
              "title": "Conduct Market Research",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "High",
              "conversation": []
            },
            {
              "id": "c302",
              "title": "Finalize Product Features",
              "assignedTo": [
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Stuck",
              "priority": "Critical",
              "conversation": []
            },
            {
              "id": "c303",
              "title": "Prepare Press Release",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Stuck",
              "priority": "Medium",
              "conversation": []
            },
            {
              "id": "c304",
              "title": "Organize Launch Event",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Done",
              "priority": "Finished",
              "conversation": []
            },
            {
              "id": "c305",
              "title": "Develop Product Training Materials",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                },
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Working on it",
              "priority": "High",
              "conversation": []
            },
            {
              "id": "c306",
              "title": "Arrange Media Coverage",
              "assignedTo": [
                {
                  "_id": "u102",
                  "fullname": "Josh Ga",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762540/samples/man-portrait.jpg"
                }
              ],
              "status": "Done",
              "priority": "Finished",
              "conversation": []
            },
            {
              "id": "c307",
              "title": "Launch Product Website",
              "assignedTo": [
                {
                  "_id": "u101",
                  "fullname": "Tal Taltal",
                  "imgUrl": "https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg"
                }
              ],
              "status": "Done",
              "priority": "Finished",
              "conversation": []
            },
            {
              "id": "c308",
              "title": "Plan Product Demos",
              "assignedTo": [

              ],
              "status": "Working on it",
              "priority": "Medium",
              "date": "2024-11-01T00:00:00Z",
              "conversation": []
            }
          ]
        }
      ],
      "activities": [],
      "cmpsOrder": [
        "StatusPicker",
        "MemberPicker",
        "DatePicker",
        "PriorityPicker"
      ],
      "_id": "9sOst",
      "updatedAt": 1731371110061
    })


    await storageService.post(STORAGE_KEY, {
      "title": "AI Research Project",
      "isStarred": true,
      "archivedAt": null,
      "createdBy": {
        "_id": "u102",
        "fullname": "Jane Doe",
        "imgUrl": "http://some-other-img"
      },
      "labels": [
        {
          "id": "l101",
          "title": "Done",
          "color": "#01c875",
          "type": "status"
        },
        {
          "id": "l102",
          "title": "Stuck",
          "color": "#e02f4b",
          "type": "status"
        },
        {
          "id": "l103",
          "title": "Working on it",
          "color": "#fdab3d",
          "type": "status"
        },
        {
          "id": "l104",
          "title": "Bonus",
          "color": "#b57ce3",
          "type": "status"
        },
        {
          "id": "l105",
          "title": "Coming soon",
          "color": "#7aaffd",
          "type": "status"
        },
        {
          "id": "l106",
          "title": "High",
          "color": "#401694",
          "type": "priority"
        },
        {
          "id": "l107",
          "title": "Medium",
          "color": "#5559df",
          "type": "priority"
        },
        {
          "id": "l108",
          "title": "Low",
          "color": "#579bfc",
          "type": "priority"
        },
        {
          "id": "l109",
          "title": "Critical",
          "color": "#333333",
          "type": "priority"
        }
      ],
      "members": [
        {
          "_id": "u102",
          "fullname": "Alice Smith",
          "imgUrl": "https://robohash.org/1"
        },
        {
          "_id": "u103",
          "fullname": "Bob Johnson",
          "imgUrl": "https://robohash.org/2"
        },
        {
          "_id": "u104",
          "fullname": "Ron Johnson",
          "imgUrl": "https://robohash.org/3"
        }
      ],
      "groups": [
        {
          "id": "g0gwnB",
          "title": "Phase 1 - Research",
          "color": "#ff6347",
          "tasks": [
            {
              "id": "lEP7NF",
              "title": "Literature Review",
              "assignedTo": [
                {
                  "_id": "u102"
                },
                "u102",
                "u103",
                "u104"
              ],
              "status": "Done",
              "priority": "Medium"
            },
            {
              "id": "JS0oQP",
              "title": "Develop Hypothesis",
              "assignedTo": [
                {
                  "_id": "u103"
                },
                "u102"
              ],
              "status": "Working on it",
              "priority": "High"
            },
            {
              "id": "c305",
              "title": "Analyze Previous Studies",
              "assignedTo": [
                {
                  "_id": "u104"
                }
              ],
              "status": "Stuck",
              "priority": "Low"
            },
            {
              "id": "c306",
              "title": "Prepare Research Materials",
              "assignedTo": [
                {
                  "_id": "u102"
                },
                "u103"
              ],
              "status": "Done",
              "priority": "Medium"
            }
          ]
        },
        {
          "id": "g1xyzB",
          "title": "Phase 2 - Development",
          "color": "#007bff",
          "tasks": [
            {
              "id": "c401",
              "title": "Set Up Lab Equipment",
              "assignedTo": [
                {
                  "_id": "u102"
                }
              ],
              "status": "Working on it",
              "priority": "High"
            },
            {
              "id": "c402",
              "title": "Conduct Initial Experiments",
              "assignedTo": [
                {
                  "_id": "u103"
                },
                "u104",
                "u103"
              ],
              "status": "Stuck",
              "priority": "Critical"
            },
            {
              "id": "c403",
              "title": "Gather Results",
              "assignedTo": [
                {
                  "_id": "u104"
                },
                "u104",
                "u102",
                "u103"
              ],
              "status": "Stuck",
              "priority": "Low"
            },
            {
              "id": "c404",
              "title": "Analyze Data",
              "assignedTo": [
                {
                  "_id": "u102"
                },
                "u102"
              ],
              "status": "Working on it",
              "priority": "Medium"
            }
          ]
        }
      ],
      "activities": [],
      "cmpsOrder": [
        "StatusPicker",
        "MemberPicker",
        "DatePicker",
        "PriorityPicker"
      ],
      "_id": "hX7O6",
      "updatedAt": 1731371128062
    })
  }
}



function loadBoardsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : undefined
}

function getDefaultFilter() {
  return { title: "", status: "", priority: "", person: "" }
}

function getEmptyBoard() {
  return {
    title: "",
    isStarred: false,
    archivedAt: null,
    createdBy: {
      _id: "",
      fullname: "",
      imgUrl: "",
    },
    style: {
      backgroundImage: "",
    },
    labels: [
      { id: "l101", title: "Done", color: "#01c875", type: "status" },
      { id: "l102", title: "Stuck", color: "#e02f4b", type: "status" },
      { id: "l103", title: "Working on it", color: "#fdbb63", type: "status" },
      { id: "l104", title: "Bonus", color: "#b57ce3", type: "status" },
      { id: "l105", title: "Coming soon", color: "#7aaffd", type: "status" },
      { id: "l106", title: "High", color: "#6545a9", type: "priority" },
      { id: "l107", title: "Medium", color: "#777ae5", type: "priority" },
      { id: "l108", title: "Low", color: "#7aaffd", type: "priority" },
      { id: "l109", title: "Critical", color: "#5c5c5c", type: "priority" }
    ],
    members: [],
    groups: [],
    activities: [],
    cmpsOrder: [
      "StatusPicker",
      "MemberPicker",
      "PriorityPicker",
      "DatePicker"
    ]
  }
}



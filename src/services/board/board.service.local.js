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
      title: "Robot dev proj",
      isStarred: false,
      archivedAt: 1589983468418,
      createdBy: {
        _id: "u101",
        fullname: "Abi Abambi",
        imgUrl: "http://some-img",
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
      members: [
        {
          _id: "u101",
          fullname: "Tal Taltal",
          imgUrl: "https://robohash.org/35",
        },
        {
          _id: "u102",
          fullname: "Josh Ga",
          imgUrl: "https://robohash.org/4",
        },
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
              "assignedTo": { "_id": "u101", "fullname": "Tal Taltal" },
              "status": "Working on it",
              "priority": "High"
            },
            {
              "id": "c102",
              "title": "Create Wireframes",
              "assignedTo": { "_id": "u102", "fullname": "Josh Ga" },
              "status": "Done",
              "priority": "Medium"
            },
            {
              "id": "c103",
              "title": "Design Homepage Mockup",
              "assignedTo": { "_id": "u103", "fullname": "Sam Lee" },
              "status": "Stuck",
              "priority": "Critical"
            },
            {
              "id": "c104",
              "title": "Develop Landing Page",
              "assignedTo": { "_id": "u104", "fullname": "Lily Chen" },
              "status": "Done",
              "priority": "Low"
            },
            {
              "id": "c105",
              "title": "Review Competitor Websites",
              "assignedTo": { "_id": "u101", "fullname": "Tal Taltal" },
              "status": "Working on it",
              "priority": "Low"
            },
            {
              "id": "c106",
              "title": "Conduct Usability Testing",
              "assignedTo": { "_id": "u102", "fullname": "Josh Ga" },
              "status": "Working on it",
              "priority": "Medium"
            },
            {
              "id": "c107",
              "title": "Implement SEO Best Practices",
              "assignedTo": { "_id": "u105", "fullname": "Lily Chen" },
              "status": "Done",
              "priority": "Finished"
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
              "assignedTo": { "_id": "u101", "fullname": "Tal Taltal" },
              "status": "Stuck",
              "priority": "Critical"
            },
            {
              "id": "c202",
              "title": "Create Social Media Content Calendar",
              "assignedTo": { "_id": "u102", "fullname": "Josh Ga" },
              "status": "Working on it",
              "priority": "Low"
            },
            {
              "id": "c203",
              "title": "Set Up Email Campaign",
              "assignedTo": { "_id": "u103", "fullname": "Sam Lee" },
              "status": "Working on it",
              "priority": "Medium"
            },
            {
              "id": "c204",
              "title": "Track Campaign Performance",
              "assignedTo": { "_id": "u104", "fullname": "Lily Chen" },
              "status": "Done",
              "priority": "Finished"
            },
            {
              "id": "c205",
              "title": "Design Ad Creatives",
              "assignedTo": { "_id": "u101", "fullname": "Tal Taltal" },
              "status": "Working on it",
              "priority": "High"
            },
            {
              "id": "c206",
              "title": "Schedule Social Media Posts",
              "assignedTo": { "_id": "u102", "fullname": "Josh Ga" },
              "status": "Stuck",
              "priority": "Critical"
            },
            {
              "id": "c207",
              "title": "Launch Google Ads Campaign",
              "assignedTo": { "_id": "u103", "fullname": "Sam Lee" },
              "status": "Done",
              "priority": "Finished"
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
              "assignedTo": { "_id": "u101", "fullname": "Tal Taltal" },
              "status": "Working on it",
              "priority": "High"
            },
            {
              "id": "c302",
              "title": "Finalize Product Features",
              "assignedTo": { "_id": "u102", "fullname": "Josh Ga" },
              "status": "Stuck",
              "priority": "Critical"
            },
            {
              "id": "c303",
              "title": "Prepare Press Release",
              "assignedTo": { "_id": "u103", "fullname": "Sam Lee" },
              "status": "Stuck",
              "priority": "Medium"
            },
            {
              "id": "c304",
              "title": "Organize Launch Event",
              "assignedTo": { "_id": "u104", "fullname": "Lily Chen" },
              "status": "Done",
              "priority": "Finished"
            },
            {
              "id": "c305",
              "title": "Develop Product Training Materials",
              "assignedTo": { "_id": "u101", "fullname": "Tal Taltal" },
              "status": "Working on it",
              "priority": "High"
            },
            {
              "id": "c306",
              "title": "Arrange Media Coverage",
              "assignedTo": { "_id": "u102", "fullname": "Josh Ga" },
              "status": "Done",
              "priority": "Finished"
            },
            {
              "id": "c307",
              "title": "Launch Product Website",
              "assignedTo": { "_id": "u104", "fullname": "Lily Chen" },
              "status": "Done",
              "priority": "Finished"
            }
          ]
        }
      ],
      activities: [],

      cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker', "PriorityPicker"],
    })

    await storageService.post(STORAGE_KEY, {
      title: "AI Research Project",
      isStarred: true,
      archivedAt: null,
      createdBy: {
        _id: "u102",
        fullname: "Jane Doe",
        imgUrl: "http://some-other-img",
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
      members: [
        {
          _id: "u102",
          fullname: "Alice Smith",
          imgUrl: "https://robohash.org/1",
        },
        {
          _id: "u103",
          fullname: "Bob Johnson",
          imgUrl: "https://robohash.org/2",
        },
        {
          _id: "u104",
          fullname: "Ron Johnson",
          imgUrl: "https://robohash.org/3",
        },
      ],
      groups: [
        {
          id: "g201",
          title: "Phase 1 - Research",
          color: "#ff6347",
          tasks: [
            {
              id: "c201",
              title: "Literature Review",
              assignedTo: { _id: "u102", fullname: "Alice Smith" },
              status: "Done",
              priority: "Medium"
            },
            {
              id: "c202",
              title: "Develop Hypothesis",
              assignedTo: { _id: "u103", fullname: "Bob Johnson" },
              status: "Working on it",
              priority: "High"
            },
          ],
        },
      ],
      activities: [],
      cmpsOrder: [
        "StatusPicker",
        "MemberPicker",
        "DatePicker",
        "PriorityPicker"
      ]
    })
  }
}

function loadBoardsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : undefined
}

function getDefaultFilter() {
  return { title: "" }
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
      "PriorityPicker"
    ]
  }
}



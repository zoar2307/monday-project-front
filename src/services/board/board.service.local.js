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
        { id: "l101", title: "Done", color: "#61bd4f" },
        { id: "l102", title: "Progress", color: "#61bd33" },
      ],
      members: [
        {
          _id: "u101",
          fullname: "Tal Taltal",
          imgUrl: "https://www.google.com",
        },
        {
          _id: "u102",
          fullname: "Josh Ga",
          imgUrl: "https://www.google.com",
        },
      ],
      groups: [
        {
          id: "g101",
          title: "Group 1",
          archivedAt: 1589983468418,
          tasks: [
            { id: "c101", title: "Replace logo" },
            { id: "c102", title: "Add Samples" },
          ],
        },
      ],
      activities: [],
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
        { id: "l201", title: "Completed", color: "#4a90e2" },
        { id: "l202", title: "In Progress", color: "#f5a623" },
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
          tasks: [
            { id: "c201", title: "Literature Review" },
            { id: "c202", title: "Develop Hypothesis" },
          ],
        },
      ],
      activities: [],
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
    labels: [],
    members: [],
    groups: [],
    activities: [],
    cmpsOrder: [],
  }
}

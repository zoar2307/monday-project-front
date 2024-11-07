import { storageService } from "../async-storage.service.js"
import { makeId } from "../util.service.js"

const STORAGE_KEY = "boards"
_createBoards()

export const boardService = {
  query,
  getById,
  save,
  remove,
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
  return {
    ...board,
    _id: makeId(),
    createdAt: Date.now(),
    groups: board.groups || [],
    activities: board.activities || [],
    members: board.members || [],
  }
}

function _createBoards() {
  let boards = loadBoardsFromStorage()
  if (!boards || !boards.length) {
    boards = [
      _createBoard({
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
      }),
      _createBoard({
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
            imgUrl: "https://example.com/alice.jpg",
          },
          {
            _id: "u103",
            fullname: "Bob Johnson",
            imgUrl: "https://example.com/bob.jpg",
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
      }),
    ]
    storageService.post(STORAGE_KEY, boards)
  }
}

function loadBoardsFromStorage() {
  return storageService.query(STORAGE_KEY)
}

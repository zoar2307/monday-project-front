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
  getEmptyBoard
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


function _createBoards() {
  let boards = loadBoardsFromStorage()
  if (!boards || !boards.length) {
    boards = []
    let board
    for (let i = 0; i < 3; i++) {
      board = _createBoard()
      boards.push(board)
    }
    console.log(boards);
    storageService.post(STORAGE_KEY, boards)
  }
}


///////////////

function _createBoard() {
  function makeId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function _getRandomDate() {
    return Date.now() - Math.floor(Math.random() * 1000000000);
  }

  const board = {
    title: `Project ${Math.floor(Math.random() * 1000)}`,
    isStarred: Math.random() < 0.5,
    archivedAt: _getRandomDate(),
    createdBy: {
      _id: makeId(),
      fullname: `User ${Math.floor(Math.random() * 100)}`,
      imgUrl: 'https://www.example.com/default-img.jpg',
    },
    style: {
      backgroundImage: 'https://www.example.com/default-background.jpg',
    },
    labels: [
      { id: makeId(), title: 'Done', color: '#61bd4f' },
      { id: makeId(), title: 'In Progress', color: '#ffab00' },
      { id: makeId(), title: 'To Do', color: '#eb5a46' },
    ],
    members: [
      { _id: makeId(), fullname: 'Alice Doe', imgUrl: 'https://www.example.com/user1.jpg' },
      { _id: makeId(), fullname: 'Bob Smith', imgUrl: 'https://www.example.com/user2.jpg' },
    ],
    groups: [
      {
        id: makeId(),
        title: `Group ${Math.floor(Math.random() * 100)}`,
        archivedAt: _getRandomDate(),
        tasks: [
          {
            id: makeId(),
            title: 'Sample Task 1',
            archivedAt: _getRandomDate(),
            status: 'In Progress',
            priority: 'High',
            dueDate: '2024-12-31',
            description: 'This is a sample task description.',
            comments: [
              {
                id: makeId(),
                title: 'Please review this task',
                createdAt: _getRandomDate(),
                byMember: {
                  _id: makeId(),
                  fullname: 'Commenter User',
                  imgUrl: '',
                },
              },
            ],
            checklists: [
              {
                id: makeId(),
                title: 'Checklist 1',
                todos: [
                  { id: makeId(), title: 'Sub-task 1', isDone: false },
                  { id: makeId(), title: 'Sub-task 2', isDone: true },
                ],
              },
            ],
            memberIds: [makeId(), makeId()],
            labelIds: ['l101', 'l102'],
            byMember: {
              _id: makeId(),
              fullname: 'Task Creator',
              imgUrl: '',
            },
            style: {
              backgroundColor: '#26de81',
            },
          },
        ],
        style: {},
      },
      {
        id: makeId(),
        title: `Group ${Math.floor(Math.random() * 100) + 1}`,
        tasks: [
          {
            id: makeId(),
            title: 'Another Task',
            status: 'To Do',
            priority: 'Medium',
            dueDate: '2025-01-15',
            description: 'Another task for the group.',
            comments: [],
            checklists: [],
            memberIds: [makeId()],
            labelIds: ['l101'],
            byMember: {
              _id: makeId(),
              fullname: 'Another User',
              imgUrl: '',
            },
            style: {
              backgroundColor: '#3498db',
            },
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: makeId(),
        title: 'Board Created',
        createdAt: _getRandomDate(),
        byMember: {
          _id: makeId(),
          fullname: 'Activity User',
          imgUrl: 'https://www.example.com/default-activity-img.jpg',
        },
        group: {
          id: makeId(),
          title: 'Initial Group',
        },
        task: {
          id: makeId(),
          title: 'Initial Task',
        },
      },
    ],
    cmpsOrder: ['StatusPicker', 'MemberPicker', 'DatePicker'],
  };

  return board;
}


function loadBoardsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY)
  return (data) ? JSON.parse(data) : undefined
}

function getDefaultFilter() {
  return { title: '' }
}

function getEmptyBoard() {
  return {
    title: '',
    isStarred: false,
    archivedAt: null,
    createdBy: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    style: {
      backgroundImage: '',
    },
    labels: [],
    members: [],
    groups: [],
    activities: [],
    cmpsOrder: [],
  }
}

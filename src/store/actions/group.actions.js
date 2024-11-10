import { boardService } from "../../services/board/board.service.local"
import { SET_GROUPS, ADD_GROUP, REMOVE_GROUP, UPDATE_GROUP } from "../reducers/group.reducer"
import { getRandomColor, makeId } from "../../services/util.service"
import { store } from "../store"

export async function loadGroups(boardId) {
  try {
    const board = await boardService.getById(boardId)
    const groups = board ? board.groups : []
    store.dispatch({ type: SET_GROUPS, groups })
  } catch (err) {
    console.error("Cannot load groups:", err)
  }
}

export async function addGroup(boardId) {
  const newGroup = {
    id: makeId(),
    title: "New Group",
    color: getRandomColor(),
    tasks: []
  }

  try {
    const board = await boardService.getById(boardId)
    if (!board) throw new Error('Board not found')

    board.groups.push(newGroup)
    await boardService.save(board) 

    store.dispatch({ type: ADD_GROUP, group: newGroup })
  } catch (err) {
    console.error("Cannot add group:", err)
  }
}


export async function removeGroup(boardId, groupId) {
  try {
    const board = await boardService.getById(boardId)
    board.groups = board.groups.filter((group) => group.id !== groupId)
    await boardService.save(board)
    store.dispatch({ type: REMOVE_GROUP, groupId })
  } catch (err) {
    console.error("Cannot remove group:", err)
  }
}

export async function updateGroup(boardId, updatedGroup) {
  try {
    const board = await boardService.getById(boardId)
    board.groups = board.groups.map((group) => group.id === updatedGroup.id ? updatedGroup : group)
    await boardService.save(board)
    store.dispatch({ type: UPDATE_GROUP, group: updatedGroup })
  } catch (err) {
    console.error("Cannot update group:", err)
  }
}

export async function addTaskToGroup(boardId, groupId, newTask) {
  try {
    const board = await boardService.getById(boardId)
    board.groups = board.groups.map((group) =>
      group.id === groupId ? { ...group, tasks: [...group.tasks, newTask] } : group
    )
    await boardService.save(board)
    const updatedGroup = board.groups.find((group) => group.id === groupId)
    store.dispatch({ type: UPDATE_GROUP, group: updatedGroup })
  } catch (err) {
    console.error("Cannot add task to group:", err)
  }
}

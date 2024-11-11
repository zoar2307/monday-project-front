import { store } from '../store'
import { ADD_TASK, UPDATE_TASK_PRIORITY, UPDATE_TASK_MEMBER, UPDATE_TASK_STATUS, SET_TASKS } from '../reducers/task.reducer'
import { boardService } from '../../services/board/board.service.local'
import { makeId } from '../../services/util.service'
import { loadBoard, loadBoards } from './board.actions'

export async function loadTasks(filterBy, boardId, groupId) {
  try {
    const board = await boardService.getById(boardId)

    const group = board.groups.find((grp) => grp.id === groupId)
    const tasks = group.tasks
    const filteredTasks = await boardService.queryTasks(tasks, filterBy)
    console.log(filteredTasks)

    store.dispatch({ type: SET_TASKS, filteredTasks })
  } catch (err) {
    console.log('Tasks action -> Cannot load Tasks')
    throw err
  } finally {

  }
}

export async function addTask(boardId, groupId, task) {
  try {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((grp) => grp.id === groupId)
    task.id = makeId()
    console.log(task)
    group.tasks.push(task)
    await boardService.save(board)
    store.dispatch({ type: ADD_TASK, task, groupId })
    await loadBoard(boardId)
  } catch (err) {
    console.error('Cannot add task:', err)
  }
}

export async function updateTask(boardId, groupId, taskId, data) {

  if (data.status) {
    updateTaskStatus(boardId, groupId, taskId, data.status)
  }
  else if (data.priority) {
    updateTaskPriority(boardId, groupId, taskId, data.priority)
  }
  else if (data.assignedTo) {
    updateTaskMember(boardId, groupId, taskId, data.assignedTo)
  }
}

export async function updateTaskStatus(boardId, groupId, taskId, status) {
  try {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((grp) => grp.id === groupId)
    const task = group.tasks.find((tsk) => tsk.id === taskId)
    task.status = status
    await boardService.save(board)
    store.dispatch({ type: UPDATE_TASK_STATUS, task, groupId })
    await loadBoard(boardId)
  } catch (err) {
    console.error('Cannot update task priority:', err)
  }
}

export async function updateTaskPriority(boardId, groupId, taskId, priority) {
  try {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((grp) => grp.id === groupId)
    const task = group.tasks.find((tsk) => tsk.id === taskId)
    task.priority = priority
    await boardService.save(board)
    store.dispatch({ type: UPDATE_TASK_PRIORITY, task, groupId })
    await loadBoard(boardId)
  } catch (err) {
    console.error('Cannot update task priority:', err)
  }
}
export async function updateTaskMember(boardId, groupId, taskId, member) {
  try {
    const board = await boardService.getById(boardId)
    if (!board) return

    const group = board.groups.find((grp) => grp.id === groupId)
    if (!group) return

    const task = group.tasks.find((tsk) => tsk.id === taskId)
    if (!task) return

    task.assignedTo = member
    await boardService.save(board)

    store.dispatch({ type: UPDATE_TASK_MEMBER, task, groupId })
    await loadBoard(boardId)
  } catch (err) {
    console.error("Failed to update task member:", err)
  }
}
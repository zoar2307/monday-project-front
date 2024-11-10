import { store } from '../store'
import { UPDATE_TASK, ADD_TASK, UPDATE_TASK_PRIORITY, UPDATE_TASK_MEMBER } from '../reducers/task.reducer'
import { boardService } from '../../services/board/board.service.local'

export async function addTask(boardId, groupId, task) {
  try {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((grp) => grp.id === groupId)
    group.tasks.push(task)
    await boardService.save(board)
    store.dispatch({ type: ADD_TASK, task, groupId })
  } catch (err) {
    console.error('Cannot add task:', err)
  }
}

export async function updateTaskStatus(boardId, groupId, taskId, status) {
  try {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((grp) => grp.id === groupId)
    const task = group.tasks.find((tsk) => tsk.id === taskId)
    task.status = status
    await boardService.save(board)
    store.dispatch({ type: UPDATE_TASK, task, groupId })
  } catch (err) {
    console.error('Cannot update task status:', err)
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
  
      store.dispatch({
        type: UPDATE_TASK_MEMBER,
        task,
        groupId,
      })
    } catch (err) {
      console.error("Failed to update task member:", err)
    }
  }
import { store } from '../store'
import { UPDATE_TASK, ADD_TASK, UPDATE_TASK_PRIORITY, UPDATE_TASK_MEMBER } from '../reducers/task.reducer'
import { boardService } from '../../services/board/board.service.local'
import { makeId } from '../../services/util.service'

export async function addTask(boardId, groupId, task) {
  try {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((grp) => grp.id === groupId)
    task.id = makeId()
    console.log(task)
    group.tasks.push(task)
    await boardService.save(board)
    store.dispatch({ type: ADD_TASK, task, groupId })
  } catch (err) {
    console.error('Cannot add task:', err)
  }
}

export async function updateGroup(taskId, updatedGroup) {
  try {
    const board = await boardService.getById(boardId)
    board.groups = board.groups.map((group) => group.id === updatedGroup.id ? updatedGroup : group)
    await boardService.save(board)
    store.dispatch({ type: UPDATE_GROUP, group: updatedGroup })
  } catch (err) {
    console.error("Cannot update group:", err)
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
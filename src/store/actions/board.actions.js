import { boardService } from "../../services/board/board.service.local";
import { getRandomColor, makeId } from "../../services/util.service";
import { ADD_BOARD, ADD_GROUP, BOARD_UNDO, REMOVE_BOARD, REMOVE_GROUP, SET_BACKDROP, SET_BOARD, SET_BOARDS, SET_FILTER_BY, SET_GROUPS, SET_IS_ADD_BOARD_MODAL, UPDATE_BOARD, UPDATE_GROUP } from '../reducers/board.reducer'

import { store } from '../store'

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log('board action -> Cannot load boards', err)
        throw err
    } finally {
    }
}

export async function loadBoard(boardId, filterBy) {
    try {
        const board = await boardService.getById(boardId)
        const filteredBoard = boardService.filterBoard(board, filterBy);
        store.dispatch({ type: SET_BOARD, board })
        filteredBoard._id = boardId
        return filteredBoard
    }
    catch (err) {
        console.log('board action -> Cannot load board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch({ type: REMOVE_BOARD, boardId })
    } catch (err) {
        console.log('board action -> Cannot remove board', err)
        throw err
    }
}

export async function saveBoard(board) {
    const type = board._id ? UPDATE_BOARD : ADD_BOARD
    try {
        store.dispatch({ type, board: board })
        store.dispatch({ type: SET_BOARD, board })
        const savedBoard = await boardService.save(board)

        return savedBoard
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.log('board action -> Cannot save board', err)
        throw err
    }
}

// Group Section

export async function updateGroups(groups) {
    const { currBoard } = store.getState().boardModule
    try {
        store.dispatch({ type: SET_GROUPS, groups })
        currBoard.groups = groups
        await boardService.save(currBoard)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Cannot add group:", err)
    }
}

export async function addGroup() {
    const { currBoard } = store.getState().boardModule

    const newGroup = {
        id: makeId(),
        title: "New Group",
        color: getRandomColor(),
        tasks: []
    }
    try {
        store.dispatch({ type: ADD_GROUP, group: newGroup })
        // const board = await boardService.getById(boardId)
        if (!currBoard) throw new Error('Board not found')

        currBoard.groups.push(newGroup)
        await boardService.save(currBoard)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Cannot add group:", err)
    }
}

export async function removeGroup(boardId, groupId) {
    try {
        store.dispatch({ type: REMOVE_GROUP, groupId })
        const board = await boardService.getById(boardId)
        board.groups = board.groups.filter((group) => group.id !== groupId)
        await boardService.save(board)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Cannot remove group:", err)
    }
}

export async function updateGroup(updatedGroup) {
    const { currBoard } = store.getState().boardModule

    try {
        store.dispatch({ type: UPDATE_GROUP, group: updatedGroup })
        currBoard.groups = currBoard.groups.map((group) => group.id === updatedGroup.id ? updatedGroup : group)
        await boardService.save(currBoard)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Cannot update group:", err)
    }
}

// Tasks

export async function addTask(groupId, task) {
    const { currBoard } = store.getState().boardModule

    try {
        // store.dispatch({ type: ADD_TASK, task, groupId })
        task.id = makeId()
        currBoard.groups = currBoard.groups.map((group) =>
            group.id === groupId ? { ...group, tasks: [...group.tasks, task] } : group
        )
        store.dispatch({ type: SET_GROUPS, groups: currBoard.groups })
        await boardService.save(currBoard)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error('Cannot add task:', err)
    }
}

export async function removeTask(groupId, taskId) {
    const { currBoard } = store.getState().boardModule

    try {
        const group = currBoard.groups.find((group) => group.id === groupId)
        if (!group) throw new Error("Group not found")
        group.tasks = group.tasks.filter((task) => task.id !== taskId)
        store.dispatch({ type: UPDATE_GROUP, group: group })
        await boardService.save(currBoard)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Cannot remove task:", err)
        throw err
    }
}



export async function updateTask(groupId, taskId, data) {

    if (data.status) {
        updateTaskStatus(groupId, taskId, data.status)
    }
    else if (data.priority) {
        updateTaskPriority(groupId, taskId, data.priority)
    }
    else if (data.assignedTo) {
        updateTaskMember(groupId, taskId, data.assignedTo)
    }
}

export async function updateTaskStatus(groupId, taskId, status) {
    const { currBoard } = store.getState().boardModule

    try {
        // const board = await boardService.getById(boardId)
        const group = currBoard.groups.find((grp) => grp.id === groupId)
        const task = group.tasks.find((tsk) => tsk.id === taskId)
        task.status = status
        store.dispatch({ type: UPDATE_GROUP, group: group })
        await boardService.save(currBoard)
        // store.dispatch({ type: UPDATE_TASK_STATUS, task, groupId })
        // await loadBoard(boardId)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error('Cannot update task priority:', err)
    }
}

export async function updateTaskPriority(groupId, taskId, priority) {
    const { currBoard } = store.getState().boardModule

    try {
        // const board = await boardService.getById(boardId)
        const group = currBoard.groups.find((grp) => grp.id === groupId)
        const task = group.tasks.find((tsk) => tsk.id === taskId)
        task.priority = priority
        store.dispatch({ type: UPDATE_GROUP, group: group })

        await boardService.save(currBoard)
        // store.dispatch({ type: UPDATE_TASK_PRIORITY, task, groupId })
        // await loadBoard(boardId)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error('Cannot update task priority:', err)
    }
}

export async function updateTaskMember(groupId, taskId, member) {
    const { currBoard } = store.getState().boardModule

    try {
        // const board = await boardService.getById(boardId)
        if (!currBoard) return

        const group = currBoard.groups.find((grp) => grp.id === groupId)
        if (!group) return

        const task = group.tasks.find((tsk) => tsk.id === taskId)
        if (!task) return

        task.assignedTo = member
        store.dispatch({ type: UPDATE_GROUP, group: group })

        await boardService.save(currBoard)

        // store.dispatch({ type: UPDATE_TASK_MEMBER, task, groupId })
        // await loadBoard(boardId)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Failed to update task member:", err)
    }
}

export function setFilterBy(filterBy = boardService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setBackdrop(backdrop) {
    store.dispatch({ type: SET_BACKDROP, backdrop })
}

export function setIsAddBoardModal(modal) {
    store.dispatch({ type: SET_IS_ADD_BOARD_MODAL, modal })
}

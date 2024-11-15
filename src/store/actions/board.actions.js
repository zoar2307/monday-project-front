import { boardService } from "../../services/board/board.service.remote";
import { getRandomColor, makeId } from "../../services/util.service";
import { ADD_BOARD, ADD_GROUP, BOARD_UNDO, REMOVE_BOARD, REMOVE_GROUP, SET_BACKDROP, SET_BOARD, SET_BOARDS, SET_FILTER_BY, SET_GROUPS, SET_GROUPS_FOR_FILTER, SET_IS_ADD_BOARD_MODAL, SET_LABELS, UPDATE_BOARD, UPDATE_BOARD_LABELS, UPDATE_GROUP } from '../reducers/board.reducer'

import { store } from '../store'

export async function loadBoards() {
    try {
        const boards = await boardService.query()
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
        const filteredBoard = boardService.filterBoard(board, filterBy)
        filteredBoard._id = boardId
        store.dispatch({ type: SET_BOARD, board: filteredBoard })
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
        const savedBoard = await boardService.save(board)
        store.dispatch({ type, board: savedBoard })
        store.dispatch({ type: SET_BOARD, board: savedBoard })
        return savedBoard
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.log('board action -> Cannot save board', err)
        throw err
    }
}

// Labels

export async function updateLabels(newLabels) {
    const { currBoard } = store.getState().boardModule
    try {
        store.dispatch({ type: UPDATE_BOARD_LABELS, newLabels: newLabels })
        currBoard.cmpsLabels = newLabels
        const savedBoard = await boardService.save(currBoard)

        return savedBoard
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.log('board action -> Cannot save board', err)
        throw err
    }
}

export async function removeLabel(labelId) {
    const { currBoard } = store.getState().boardModule
    try {
        const newLabels = currBoard.cmpsLabels.filter(label => label.id !== labelId)
        store.dispatch({ type: UPDATE_BOARD_LABELS, newLabels: newLabels })
        currBoard.cmpsLabels = newLabels
        const savedBoard = await boardService.save(currBoard)

        return savedBoard
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.log('board action -> Cannot save board', err)
        throw err
    }
}

export async function addLabel(name) {
    const { currBoard } = store.getState().boardModule
    let labelType
    let labelClass
    switch (name) {
        case 'Status':
            labelClass = 'status'
            labelType = 'StatusPicker'
            break;
        case 'Member':
            labelClass = 'members'
            labelType = 'MemberPicker'
            break;
        case 'Priority':
            labelClass = 'priority'
            labelType = 'PriorityPicker'
            break;
        case 'Date':
            labelClass = 'date'
            labelType = 'DatePicker'
            break;
        case 'File':
            labelClass = 'file'
            labelType = 'FilePicker'
            break;
        case 'Progress':
            labelClass = 'progress'
            labelType = 'ProgressBar'
            break;

        default:
            break;
    }

    const newLabel = {
        type: labelType,
        class: labelClass,
        title: name,
        id: makeId()
    }
    try {
        const newLabels = [...currBoard.cmpsLabels, newLabel]
        store.dispatch({ type: UPDATE_BOARD_LABELS, newLabels: newLabels })
        currBoard.cmpsLabels = newLabels
        const savedBoard = await boardService.save(currBoard)

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
        task.conversation = []
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
    else if (data.date) {
        updateTaskDate(groupId, taskId, data.date)
    }
    else if (data.file) {
        updateTaskFile(groupId, taskId, data.file)
    }
}

export async function updateTaskStatus(groupId, taskId, status) {
    const { currBoard } = store.getState().boardModule

    try {
        const group = currBoard.groups.find((grp) => grp.id === groupId)
        const task = group.tasks.find((tsk) => tsk.id === taskId)
        task.status = status
        store.dispatch({ type: UPDATE_GROUP, group: group })
        await boardService.save(currBoard)

    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error('Cannot update task priority:', err)
    }
}

export async function updateTaskPriority(groupId, taskId, priority) {
    const { currBoard } = store.getState().boardModule

    try {
        const group = currBoard.groups.find((grp) => grp.id === groupId)
        const task = group.tasks.find((tsk) => tsk.id === taskId)
        task.priority = priority
        store.dispatch({ type: UPDATE_GROUP, group: group })

        await boardService.save(currBoard)

    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error('Cannot update task priority:', err)
    }
}

export async function updateTaskMember(groupId, taskId, member) {
    const { currBoard } = store.getState().boardModule

    console.log(member)

    try {
        if (!currBoard) return

        const group = currBoard.groups.find((grp) => grp.id === groupId)
        if (!group) return

        const task = group.tasks.find((tsk) => tsk.id === taskId)
        if (!task) return

        task.assignedTo = member
        store.dispatch({ type: UPDATE_GROUP, group: group })

        await boardService.save(currBoard)

    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Failed to update task member:", err)
    }
}
export async function updateTaskDate(groupId, taskId, date) {
    const { currBoard } = store.getState().boardModule

    console.log(date)

    try {
        if (!currBoard) return

        const group = currBoard.groups.find((grp) => grp.id === groupId)
        if (!group) return

        const task = group.tasks.find((tsk) => tsk.id === taskId)
        if (!task) return

        task.date = date
        store.dispatch({ type: UPDATE_GROUP, group: group })

        await boardService.save(currBoard)

    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Failed to update task member:", err)
    }
}
export async function updateTaskFile(groupId, taskId, fileUrl) {
    const { currBoard } = store.getState().boardModule;

    try {
        if (!currBoard) return;

        const group = currBoard.groups.find((grp) => grp.id === groupId);
        if (!group) return;

        const task = group.tasks.find((tsk) => tsk.id === taskId);
        if (!task) return;

        // Store only the Cloudinary URL in the task file field
        task.file = fileUrl;

        store.dispatch({ type: UPDATE_GROUP, group });
        await boardService.save(currBoard);
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO });
        console.error("Failed to update task file:", err);
    }
}



export async function addTaskConversationUpdate(groupId, taskId, update) {
    const { currBoard } = store.getState().boardModule

    update.createdAt = Date.now()
    update.member = {
        _id: 'u101',
        fullname: 'Avivit Nehamia',
        imgUrl: 'https://res.cloudinary.com/dafozl1ej/image/upload/v1727762541/samples/upscale-face-1.jpg'
    }
    update.id = makeId()
    update.likes = []

    console.log(update)

    try {
        const group = currBoard.groups.find((grp) => grp.id === groupId)
        const task = group.tasks.find((tsk) => tsk.id === taskId)
        task.conversation.unshift(update)
        console.log(task)
        console.log(group)
        store.dispatch({ type: UPDATE_GROUP, group: group })
        await boardService.save(currBoard)

    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error('Cannot update task priority:', err)
    }
}

// Labels


export async function updateLabelsKanban(labels) {
    const { currBoard } = store.getState().boardModule
    try {
        store.dispatch({ type: SET_LABELS, labels })
        currBoard.labels = labels
        await boardService.save(currBoard)
    } catch (err) {
        store.dispatch({ type: BOARD_UNDO })
        console.error("Cannot add group:", err)
    }
}

export function setFilterBy(filterBy = boardService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function resetFilterBy(filterBy = boardService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setBackdrop(backdrop) {
    store.dispatch({ type: SET_BACKDROP, backdrop })
}

export function setIsAddBoardModal(modal) {
    store.dispatch({ type: SET_IS_ADD_BOARD_MODAL, modal })
}

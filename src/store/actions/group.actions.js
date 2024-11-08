import { ADD_GROUP, REMOVE_GROUP, SET_GROUPS, UPDATE_GROUP } from "../reducers/group.reducer"
import { store } from "../store"


export function loadGroups(boardId) {
    try {
        const state = store.getState()
        const board = state.boardModule.boards.find(board => board._id === boardId)
        const groups = board ? board.groups : []
        store.dispatch({ type: SET_GROUPS, groups })
    } catch (err) {
        console.error("group action -> Cannot load groups", err)
        throw err
    }
}

export async function removeGroup(boardId, groupId) {
    try {
        const state = store.getState()
        const board = state.boardModule.boards.find(board => board._id === boardId)
        if (!board) throw new Error("Board not found")

        board.groups = board.groups.filter(group => group.id !== groupId)
        store.dispatch({ type: REMOVE_GROUP, groupId })
    } catch (err) {
        console.error("group action -> Cannot remove group", err)
        throw err
    }
}

export async function saveGroup(boardId, group) {
    try {
        const state = store.getState()
        const board = state.boardModule.boards.find(board => board._id === boardId)
        if (!board) throw new Error("Board not found")

        const existingGroup = group.id && board.groups.find(g => g.id === group.id)
        if (existingGroup) {
            board.groups = board.groups.map(g => (g.id === group.id ? group : g))
        } else {
            group.id = generateId() 
            board.groups.push(group)
        }

        store.dispatch({
            type: existingGroup ? UPDATE_GROUP : ADD_GROUP,
            group,
        })

    } catch (err) {
        console.error("group action -> Cannot save group", err)
        throw err
    }
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9)
}

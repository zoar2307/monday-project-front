export const SET_GROUPS = 'SET_GROUPS'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'

const initialState = {
    groups: []
}

export function groupReducer(state = initialState, action = {}) {
    let groups
    switch (action.type) {
        case SET_GROUPS:
            return { ...state, groups: action.groups }

        case REMOVE_GROUP:
            groups = state.groups.filter(group => group.id !== action.groupId)
            return { ...state, groups }

        case ADD_GROUP:
            groups = [...state.groups, action.group]
            return { ...state, groups }

        case UPDATE_GROUP:
            groups = state.groups.map(group =>
                group.id === action.group.id ? action.group : group
            )
            return { ...state, groups }

        default:
            return state
    }
}

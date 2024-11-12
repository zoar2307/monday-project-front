export const SET_CONVERSATION_STATUS = 'LOADING_START'


const initialState = {
    isConversationOpen: false
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CONVERSATION_STATUS:
            return { ...state, isConversationOpen: action.status }

        default: return state
    }
}

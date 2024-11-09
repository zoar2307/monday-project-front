import { boardService } from '../../services/board/board.service.local'


export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_BACKDROP = 'SET_BACKDROP'

const initialState = {
    boards: [],
    filterBy: boardService.getDefaultFilter(),
    backdrop: false,
}

export function boardReducer(state = initialState, action = {}) {
    let boards
    switch (action.type) {
        // Boards
        case SET_BOARDS:
            return { ...state, boards: action.boards }

        case REMOVE_BOARD:
            boards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards }

        case ADD_BOARD:
            boards = [...state.boards, action.board]
            return { ...state, boards }

        case UPDATE_BOARD:
            boards = state.boards.map(board =>
                board._id === action.board._id ? action.board : board
            )
            return { ...state, boards }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case SET_BACKDROP:
            return { ...state, backdrop: action.backdrop }

        default:
            return state
    }
}

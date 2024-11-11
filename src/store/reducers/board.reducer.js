import { boardService } from '../../services/board/board.service.local'


export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_BACKDROP = 'SET_BACKDROP'
export const SET_IS_ADD_BOARD_MODAL = 'SET_IS_ADD_BOARD_MODAL'

const initialState = {
    boards: [],
    currBoard: {},
    filterBy: boardService.getDefaultFilter(),
    backdrop: false,
    isAddBoardModal: false
}

export function boardReducer(state = initialState, action = {}) {
    let boards
    switch (action.type) {
        // Boards
        case SET_BOARDS:
            return { ...state, boards: action.boards }

        case SET_BOARD:
            return { ...state, currBoard: action.board }

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

        case SET_IS_ADD_BOARD_MODAL:
            return { ...state, isAddBoardModal: action.modal }

        default:
            return state
    }
}

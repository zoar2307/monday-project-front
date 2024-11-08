import { boardService } from "../../services/board/board.service.local";
import {
    SET_BOARDS,
    REMOVE_BOARD,
    ADD_BOARD,
    UPDATE_BOARD,
    SET_FILTER_BY
} from '../reducers/board.reducer'
import { store } from '../store'

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
        // store.dispatch({ type: SET_MAX_PAGE, maxPage })
    } catch (err) {
        console.log('board action -> Cannot load boards')
        throw err
    } finally {
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
        return savedBoard
    } catch (err) {
        console.log('board action -> Cannot save board', err)
        throw err
    }
}

export function setFilterBy(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

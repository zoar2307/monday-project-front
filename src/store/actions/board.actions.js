import { boardService } from "../../services/board/board.service.local";
import {
    SET_BOARDS,
    REMOVE_BOARD,
    ADD_BOARD,
    UPDATE_BOARD,
    SET_FILTER_BY,
    SET_BACKDROP,
    SET_IS_ADD_BOARD_MODAL,
    SET_BOARD
} from '../reducers/board.reducer'
import { store } from '../store'
import { addGroup } from "./group.actions";

const { filterBy } = store.getState().boardModule

export async function loadBoards() {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch({ type: SET_BOARDS, boards })
        // store.dispatch({ type: SET_MAX_PAGE, maxPage })
    } catch (err) {
        console.log('board action -> Cannot load boards')
        throw err
    } finally {
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch({ type: SET_BOARD, board })
        console.log(board)
        loadBoards()
        return board
    }
    catch (err) {
        console.log('board action -> Cannot load board' + err)
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
        if (type === 'ADD_BOARD') {
            await addGroup(savedBoard._id)
        }
        return savedBoard
    } catch (err) {
        console.log('board action -> Cannot save board', err)
        throw err
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

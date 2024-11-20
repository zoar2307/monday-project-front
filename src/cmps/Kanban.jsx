import { useNavigate, useParams } from "react-router";
import { BoardDetailsHeader } from "./BoardDetailsHeader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadBoard, resetFilterBy } from "../store/actions/board.actions";
import { KanbanList } from "./KanbanList";
import { SOCKET_EVENT_BOARD_UPDATE } from "../services/socket.service";
import { SET_BOARD } from "../store/reducers/board.reducer";
import { useDispatch } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import loader from '../assets/img/loading4.mp4'

export function Kanban() {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const dispatch = useDispatch()

    const { boardId, taskId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_BOARD_UPDATE, updatedBoard => {
            // loadBoards()
            dispatch({ type: SET_BOARD, board: updatedBoard })
        })

        return () => {
            socketService.off(SOCKET_EVENT_BOARD_UPDATE)
        }
    }, [])

    useEffect(() => {
        if (boardId) initBoard()
    }, [boardId, filterBy])

    useEffect(() => {
        resetFilterBy()
    }, [])

    async function initBoard() {
        try {
            await loadBoard(boardId, filterBy)
            showSuccessMsg('Kanban loaded')
        } catch (err) {
            showErrorMsg('Had issues in board details')
            navigate('/board')
        }
    }

    if (!board) return <div className="board-details-loader">
        <video
            loop
            autoPlay={true}
            src={loader}
        >

        </video>
    </div>


    return (
        <section className="kanban">
            <BoardDetailsHeader board={board} />
            <KanbanList board={board} />
        </section>
    )
}
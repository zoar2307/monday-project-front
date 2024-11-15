import { useNavigate, useParams } from "react-router";
import { BoardDetailsHeader } from "./BoardDetailsHeader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadBoard, resetFilterBy } from "../store/actions/board.actions";
import { KanbanList } from "./KanbanList";

export function Kanban() {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    const { boardId, taskId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (boardId) initBoard()
    }, [boardId, filterBy])

    useEffect(() => {
        resetFilterBy()
    }, [])

    async function initBoard() {
        try {
            await loadBoard(boardId, filterBy)
        } catch (err) {
            console.log('Had issues in board details', err)
            navigate('/board')
        }
    }

    if (!board) return <div>Loading...</div>

    return (
        <section className="kanban">
            <BoardDetailsHeader board={board} />
            <KanbanList board={board} />
        </section>
    )
}
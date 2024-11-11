import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loadBoards } from "../store/actions/board.actions"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"
import { boardService } from "../services/board/board.service.local"

export function BoardDetails() {
  const { boardId } = useParams()
  const [board, setBoard] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (boardId) loadBoard()
  }, [boardId])

  async function loadBoard() {
    try {
      await loadBoards()
      const board = await boardService.getById(boardId)
      setBoard(board)
    } catch (err) {
      console.log('Had issues in board details', err)
      navigate('/board')
    }
  }

  if (!board) return <div>Loading...</div>

  return (
    board ? (
      <section className="board-details">
        <BoardDetailsHeader board={board} />
        <GroupList
          board={board}
          groups={board.groups || []}
          members={board.members || []}
          boardId={board._id}
          labels={board.labels || []}
        />
      </section>
    ) : (
      <div>Board not found.</div>
    )
  )
}

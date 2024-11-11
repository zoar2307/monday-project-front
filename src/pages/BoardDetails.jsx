import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { loadBoard, loadBoards } from "../store/actions/board.actions"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"

export function BoardDetails() {
  const { boardId } = useParams()
  const [board, setBoard] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (boardId) initBoards()
  }, [boardId])

  async function initBoards() {
    try {
      const returnedBoard = await loadBoard(boardId)
      setBoard(returnedBoard)
    } catch (err) {
      console.log('Had issues in board details', err)
      navigate('/board')
    }
  }

  if (!board) return <div>Loading...</div>

  return (
    boardId ? (
      <section className="board-details">
        <BoardDetailsHeader board={board} />
        <GroupList />
      </section>
    ) : (
      <div>Board not found.</div>
    )
  )
}

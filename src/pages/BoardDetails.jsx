import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loadBoards } from "../store/actions/board.actions"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"

export function BoardDetails() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const boards = useSelector((state) => state.boardModule.boards)
  const board = boards.find((board) => board._id === boardId)
  
  const [loading, setLoading] = useState(!board)

  useEffect(() => {
    const fetchBoards = async () => {
      if (!boards.length) {
        try {
          await dispatch(loadBoards())
        } catch (err) {
          console.error("Failed to load boards:", err)
        }
      }
      setLoading(false)
    }

    fetchBoards()
  }, [boards.length, dispatch])

  useEffect(() => {
    if (!loading && !board) {
      navigate("/board") 
    }
  }, [loading, board, navigate])

  if (loading) return <div>Loading...</div>

  return (
    board ? (
      <section className="board-details">
        <BoardDetailsHeader board={board} />
        <GroupList
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

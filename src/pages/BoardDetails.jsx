import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { GroupList } from "../cmps/GroupList"
import { loadBoards } from "../store/actions/board.actions"

export function BoardDetails() {
  const { boardId } = useParams()
  const boards = useSelector((state) => state.boardModule.boards)
  const board = boards.find((board) => board._id === boardId)
  const [loading, setLoading] = useState(!board)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBoards = async () => {
      if (!boards.length) {
        try {
          await loadBoards()
          setLoading(false)
        } catch (err) {
          setError("Failed to load boards.")
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchBoards()
  }, [boards.length])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (!board) return <div>Board not found.</div>

  return (
    <>
      <h2>{board.title}</h2>
      <GroupList groups={board.groups} />
    </>
  )
}

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadBoards } from "../store/actions/board.actions"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"

export function BoardDetails() {
  const { boardId } = useParams()
  const boards = useSelector((state) => state.boardModule.boards)
  const board = boards.find((board) => board._id === boardId)
  const [loading, setLoading] = useState(!board)

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

  return (
    <section className="board-details">
      <BoardDetailsHeader board={board} />
      <GroupList
        groups={board.groups}
        members={board.members}
        boardId={board._id}
        labels={board.labels}
      />
    </section>
  )
}

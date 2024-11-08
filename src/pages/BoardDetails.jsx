import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { GroupList } from "../cmps/GroupList"
import { BoardHeader } from "../cmps/BoardHeader"
export function BoardDetails() {
  const { boardId } = useParams()
  const board = useSelector((state) =>
    state.boardModule.boards.find((board) => board._id === boardId)
  )

  if (!board) return <div>Loading...</div>

  return (
    <>
      <BoardHeader />

      <h2>{board.title}</h2>
      <GroupList groups={board.groups} />
    </>
  )
}

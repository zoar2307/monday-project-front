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
  const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

  useEffect(() => {
    console.log(filterBy);
  }, [filterBy])


  useEffect(() => {
    if (boardId) loadBoard(filterBy)
  }, [boardId])

  async function loadBoard(filterBy) {
    try {
      await loadBoards(filterBy)
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
        <BoardDetailsHeader board={board} filterBy={filterBy} />
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

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { loadBoard, resetFilterBy } from "../store/actions/board.actions"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"
import { useSelector } from "react-redux"
import { boardService } from "../services/board/board.service.local"
import { TaskConversation } from "../cmps/TaskConversation"

export function BoardDetails() {
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
    boardId ? (
      <section className="board-details">
        <BoardDetailsHeader board={board} />
        <GroupList board={board} />
        <TaskConversation />
      </section>
    ) : (
      <div>Board not found.</div>
    )
  )
}

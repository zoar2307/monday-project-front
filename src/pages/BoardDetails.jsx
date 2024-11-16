import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { loadBoard, resetFilterBy, updateGroups } from "../store/actions/board.actions"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"
import { useSelector } from "react-redux"
import { boardService } from "../services/board/board.service.remote"
import { TaskConversation } from "../cmps/TaskConversation"
import { store } from "../store/store"
import { SOCKET_EVENT_BOARD_UPDATE, socketService } from "../services/socket.service"
import { useDispatch } from "react-redux"
import { SET_BOARD } from "../store/reducers/board.reducer"

export function BoardDetails() {
  const board = useSelector(storeState => storeState.boardModule.currBoard)
  const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
  const dispatch = useDispatch()

  const { boardId, taskId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (boardId) initBoard()
  }, [boardId, filterBy])


  useEffect(() => {
    resetFilterBy()
    socketService.on(SOCKET_EVENT_BOARD_UPDATE, updatedBoard => {
      dispatch({ type: SET_BOARD, board: updatedBoard })
    })

    return () => {
      socketService.off(SOCKET_EVENT_BOARD_UPDATE)
    }
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

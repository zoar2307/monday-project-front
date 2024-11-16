import { BrowserRouter as Router, Route, Routes, useParams, useLocation, useNavigate } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"
import { SideBar } from "../cmps/SideBar"
import { useEffect } from "react"
import { BoardDetails } from "./BoardDetails"
import { MyWork } from "../cmps/MyWork"
import { loadBoards } from "../store/actions/board.actions"
import { Kanban } from "../cmps/Kanban"
import { useSelector } from "react-redux"
import { loadUsers } from "../store/actions/user.actions"

export function BoardPage({ onSidebarToggle }) {
  const user = useSelector(storeState => storeState.userModule.user)
  const navigate = useNavigate()


  useEffect(() => {
    if (!user) navigate('/')
    loadBoards()
    loadUsers()
  }, [])

  const { boardId } = useParams()

  const location = useLocation()

  const isBoardPage = location.pathname === "/board"
  const isMyWorkPage = location.pathname === "/my-work"
  const isKanBan = location.pathname.includes("/kanban")


  return (
    <>
      <section className="board-page main-layout app">
        {/* <main className="main-content"> */}
        <SideBar onSidebarToggle={onSidebarToggle} />
        {isBoardPage && <BoardIndex />}
        {boardId && location.pathname.includes("/board") && < BoardDetails />}
        {isMyWorkPage && <MyWork />}
        {isKanBan && <Kanban />}
        {/* </main> */}
      </section>
    </>
  )
}

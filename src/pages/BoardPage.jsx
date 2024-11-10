import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"
import { SideBar } from "../cmps/SideBar"
import { useEffect } from "react"
import { BoardDetails } from "./BoardDetails"

export function BoardPage() {

  const { boardId } = useParams()
  console.log(boardId)

  useEffect(() => {
    console.log(boardId)
  }, [])

  return (
    <>
      <section className="board-page main-layout app">
        {/* <main className="main-content"> */}
        <SideBar />
        {boardId ? <BoardDetails /> : <BoardIndex />}
        {/* </main> */}
      </section>
    </>
  )
}

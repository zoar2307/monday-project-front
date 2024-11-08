import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"
import { BoardFooter } from "../cmps/BoardFooter"
import { SideBar } from "../cmps/SideBar"


export function BoardPage() {
  return (
    <>
      <section className="board-page main-layout app">
        <BoardHeader />
        <main className="main-content">
          <SideBar />
          <BoardIndex />
        </main>
        <BoardFooter />
      </section>
    </>
  )
}

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"



export function BoardPage() {
  return (
    <>
      <section className="board-page main-layout app">
        <main className="main-content">
          <BoardIndex />
        </main>
      </section>
    </>
  )
}

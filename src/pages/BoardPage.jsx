import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"
import { BoardHeader } from "../cmps/BoardHeader"
import { BoardFooter } from "../cmps/BoardFooter"



export function BoardPage() {
  return (
    <>
        <section className="main-layout app">
          <BoardHeader />
          <main>
            <BoardIndex />
          </main>
          <BoardFooter />
        </section>
    </>
  )
}

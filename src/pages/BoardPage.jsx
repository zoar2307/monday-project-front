import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"
import { BoardFooter } from "../cmps/BoardFooter"
import { SideBar } from "../cmps/SideBar"


export function BoardPage() {
  return (
    <>
      <section className="main-layout app">
        <main>
          <BoardIndex />
          <SideBar />
        </main>
        <BoardFooter />
      </section>
    </>
  )
}

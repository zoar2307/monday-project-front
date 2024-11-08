import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"
import { BoardHeader } from "../cmps/BoardHeader"
import { BoardFooter } from "../cmps/BoardFooter"
import { Provider } from "react-redux"
import { store } from "../store/store"
import { SideBar } from "../cmps/SideBar"


export function BoardPage() {
  return (
    <>
        <section className="main-layout app">
          <BoardHeader />
          <main>
            <BoardIndex />
            <SideBar />
          </main>
          <BoardFooter />
        </section>
    </>
  )
}

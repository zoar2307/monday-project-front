import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { BoardIndex } from "../cmps/BoardIndex"
import { BoardDetails } from "../pages/BoardDetails"
import { GroupList } from "../cmps/GroupList"
import { BoardHeader } from "../cmps/BoardHeader"
import { BoardFooter } from "../cmps/BoardFooter"
import { SideBar } from "../cmps/SideBar"


export function BoardPage() {
  return (
    <>
      {/* <Provider store={store}> */}
      <section className="main-layout app">
        <BoardHeader />
        <main>
          <BoardIndex />
          <Routes>
            <Route element={<BoardDetails />} path="/board/:boardId" />
            <Route element={<GroupList />} path="/board/:boardId" />
          </Routes>
          <SideBar />
        </main>
        <BoardFooter />
      </section>
      {/* </Provider> */}
    </>
  )
}

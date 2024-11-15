import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { AppFooter } from "./cmps/AppFooter.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { Signup } from "./pages/Signup.jsx"
import { BoardPage } from "./pages/BoardPage.jsx"
import { store } from "./store/store.js"
import { Provider } from "react-redux"
import { DynamicHeader } from "./cmps/DynamicHeader.jsx"
import { BackDrop } from "./cmps/BackDrop.jsx"
import { AddBoardModal } from "./cmps/AddBoardModal.jsx"
import { useState } from "react"


function App() {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false)

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <DynamicHeader isSidebarClosed={isSidebarClosed} />
          <main className="main-layout">
            <AddBoardModal />
            <BackDrop />
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<Signup />} path="/auth/signup" />
              <Route element={<BoardPage onSidebarToggle={setIsSidebarClosed} />} path="/board" />
              <Route element={<BoardPage onSidebarToggle={setIsSidebarClosed} />} path="/kanban/:boardId" />
              <Route element={<BoardPage onSidebarToggle={setIsSidebarClosed} />} path="/board/:boardId" />
              <Route element={<BoardPage onSidebarToggle={setIsSidebarClosed} />} path="/board/:boardId/:groupId/:taskId" />
              <Route element={<BoardPage onSidebarToggle={setIsSidebarClosed} />} path="/my-work" />

            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { AppFooter } from "./cmps/AppFooter.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { Signup } from "./pages/Signup.jsx"
import { BoardPage } from "./pages/BoardPage.jsx"
import { BoardDetails } from "./pages/BoardDetails.jsx"
import { store } from "./store/store.js"
import { Provider } from "react-redux"
import { DynamicHeader } from "./cmps/DynamicHeader.jsx"
import { MyWork } from "./cmps/MyWork.jsx"
import { SideBar } from "./cmps/SideBar.jsx"
import { BackDrop } from "./cmps/BackDrop.jsx"
import { AddBoardModal } from "./cmps/AddBoardModal.jsx"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <DynamicHeader />
          <main className="main-layout">
            <AddBoardModal />
            <BackDrop />
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<Signup />} path="/auth/signup" />
              <Route element={<BoardPage />} path="/board/" />
              <Route element={<BoardPage />} path="/board/:boardId" />
              <Route element={<BoardPage />} path="/my-work" />
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}

export default App

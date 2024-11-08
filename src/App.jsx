import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { AppFooter } from "./cmps/AppFooter.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { Signup } from "./pages/Signup.jsx"
import { BoardPage } from "./pages/BoardPage.jsx"
import { BoardDetails } from "./pages/BoardDetails.jsx"
import { store } from "./store/store.js"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <main className="main-layout">
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<Signup />} path="/auth/signup" />
              <Route element={<BoardPage />} path="/board-page/*" />
              <Route element={<BoardDetails />} path="/board/:boardId" />
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}

export default App

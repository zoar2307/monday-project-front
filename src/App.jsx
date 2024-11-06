
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Signup } from './pages/Signup.jsx'

function App() {

  return (
    <Router>
      <section className="app">
        {/* <AppHeader /> */}
        <main className='main-layout'>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<AboutUs />} path="/about" />
            <Route element={<Signup />} path="/auth/signup" />
          </Routes>
        </main>
        {/* <AppFooter /> */}
      </section>
    </Router>
  )
}

export default App

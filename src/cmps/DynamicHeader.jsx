import { useLocation } from "react-router-dom"
import { BoardHeader } from "./BoardHeader"
import { AppHeader } from "./AppHeader"

export function DynamicHeader({ isSidebarClosed }) {
  const location = useLocation()

  const isHomePage = location.pathname === "/"
  const isSignUp = location.pathname === "/auth/signup"


  if (isSignUp) return
  return isHomePage ? <AppHeader /> : <BoardHeader isSidebarClosed={isSidebarClosed} />
}

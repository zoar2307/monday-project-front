// DynamicHeader.js
import { useLocation } from "react-router-dom"
import { BoardHeader } from "./BoardHeader"
import { AppHeader } from "./AppHeader"

export function DynamicHeader() {
  const location = useLocation()

  const isHomePage = location.pathname === "/"

  return isHomePage ? <AppHeader /> : <BoardHeader />
}

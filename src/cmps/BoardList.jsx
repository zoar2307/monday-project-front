import { useSelector } from "react-redux"
import { BoardPreview } from "../cmps/BoardPreview"

export function BoardList({ boards }) {
  const user = useSelector(storeState => storeState.userModule.user)

  return (
    <>
      {boards.map((board, idx) => {
        const isInclude = board.members.some(member => member._id === user._id)
        if (isInclude) {
          if (idx < 4) return (
            <div className="board-list" key={board._id}>
              <BoardPreview board={board} />
            </div>
          )
        }

      }
      )}
    </>
  )
}

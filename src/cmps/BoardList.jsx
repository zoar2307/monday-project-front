import { BoardPreview } from "../cmps/BoardPreview"

export function BoardList({ boards }) {
  return (
    <>
      {boards.map((board, idx) => {
        if (idx < 4) return (
          <div className="board-list" key={board._id}>
            <BoardPreview board={board} />
          </div>
        )

      }

      )}
    </>
  )
}

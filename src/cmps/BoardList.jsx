import { BoardPreview } from "../cmps/BoardPreview"

export function BoardList({ boards }) {
  return (
    <>
      {boards.map((board) => (
        <div className="board-list" key={board._id}>
          <BoardPreview board={board} />
        </div>
      ))}
    </>
  )
}

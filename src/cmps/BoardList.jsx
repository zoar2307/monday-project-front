import { BoardPreview } from '../cmps/BoardPreview'

export function BoardList({ boards }) {

    return (
        <>
            {boards.map(board =>
                <div className='board-list'>
                    <BoardPreview board={board} />
                </div>)}
        </>
    )
}



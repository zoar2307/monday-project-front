import { useState } from 'react'
import { BoardList } from './BoardList'

import { boardService } from '../services/board/board.service.local'


export function BoardIndex() {

    const [boards, setBoards] = useState(null)

    const board = boardService.query()

    console.log(board);



    return (
        <>
            <BoardList />
        </>
    )
}



import { useEffect, useState } from 'react'
import { BoardList } from './BoardList'

import { boardService } from '../services/board/board.service.local'
import { useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'


export function BoardIndex() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    useEffect(() => {
        loadBoards(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load boards!', err)
            })
        console.log(boards)
    }, [filterBy])


    return (

        <section className='board-index'>
            <header className='flex'>
                <div className='header-container flex'>
                    <div className='titles-container flex flex-column'>
                        <div className='welcome-message '>good afternoon Avi!</div>
                        <div className='header-title'>Quickly access your recent boards, Inbox and workspaces</div>
                    </div>
                    <div className='header-img flex'>
                        <img src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg" alt="" />
                    </div>
                </div>
                <div className='buttons-container'>

                </div>
            </header>
            <section className='board-body flex'>
                <section className='main-panel-container'>
                    <header className='category-header'>
                        <div className='arrow'>

                        </div>
                        <h3>Recently visited</h3>
                    </header>
                    <div className='category-content'>
                        <BoardList
                            boards={boards}
                        />
                    </div>

                </section>
                <div className='right-panel-container'>

                </div>

            </section>
        </section>
    )
}



import { useEffect, useState } from 'react'
import { BoardList } from './BoardList'

import { boardService } from '../services/board/board.service.remote'
import { useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { BoardIndexHeader } from './BoardIndexHeader'
import { RightPanel } from './RightPanel'


export function BoardIndex() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    useEffect(() => {
        loadBoards(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load boards!', err)
            })
    }, [filterBy])

    function onCloseCategory() {

    }

    return (
        <section className='board-index'>
            <BoardIndexHeader />
            <section className='boards-body flex'>
                <section className='main-panel-container'>
                    <header className='category-header'>
                        <div className='arrow'>
                            <button onClick={onCloseCategory}>
                                <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true" className="icon_1360dfb99d collapsible-icon" data-testid="icon"><path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <h4>My boards</h4>
                    </header>
                    <div className='category-container'>
                        <div className='category-content'>
                            <BoardList
                                boards={boards}
                            />
                        </div>
                    </div>
                </section>
                <RightPanel />
            </section>
        </section>
    )
}



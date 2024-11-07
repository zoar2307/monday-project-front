import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AppHeader } from '../cmps/AppHeader'
import { AppFooter } from '../cmps/AppFooter'
import { BoardIndex } from '../pages/BoardIndex'
import { BoardDetails } from '../pages/BoardDetails'
import { GroupList } from '../cmps/GroupList'

export function BoardPage() {

    return (
        <>
            {/* <Provider store={store}> */}
            <section className="main-layout app">
                <AppHeader />
                <main>
                    <BoardIndex />
                    <Routes>
                        <Route element={<BoardDetails />} path="/board/:boardId" />
                        <Route element={<GroupList />} path="/board/:boardId" />
                    </Routes>
                    {/* <SideBar /> */}
                </main>
                <AppFooter />
            </section>
            {/* // </Provider> */}
        </>
    )
}


import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { loadBoards, removeBoard, setBackdrop, setIsAddBoardModal } from "../store/actions/board.actions";


export function SideBar() {

    const navigate = useNavigate()

    const homeRef = useRef()
    const myWorkRef = useRef()
    const sideBarRef = useRef()
    const favoritesRef = useRef()
    const filterIconRef = useRef()
    const modalRef = useRef()

    const [sidebarWidth, setSideBarWidth] = useState(255)
    const [sideBarIsClose, setSideBarIsClose] = useState('')
    const [filterByToEdit, setFilterByToEdit] = useState('')
    const [sidebarBounds, setSidebarBounds] = useState({})
    const [favoritesIsOpen, setFavoriteIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalBoardId, setModalBoardId] = useState(null)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

    const { pathname } = useLocation()

    let boards = useSelector(storeState => storeState.boardModule.boards)
    const [filteredBoards, setFilteredBoards] = useState(boards)

    useEffect(() => {
        removeNavigateActive()
    }, [pathname])

    useEffect(() => {
        setSidebarBounds(sideBarRef.current.getBoundingClientRect())
        setFilteredBoards(boards.filter((board) => board.isStarred))
    }, [boards])

    useEffect(() => {
        if (!sideBarIsClose) {
            sideBarRef.current.style.width = sidebarWidth + 'px'
        }
    }, [sidebarWidth])

    useEffect(() => {
        if (filterByToEdit.name) filterIconRef.current.style.display = 'inherit'
        if (!filterByToEdit.name) filterIconRef.current.style.display = ''

        if (filterByToEdit.title) {
            const regex = new RegExp(filterByToEdit.title, "i")
            setFilteredBoards(boards.filter((board) => regex.test(board.title)))
        }
    }, [filterByToEdit])

    function onActiveFavorites() {
        favoritesRef.current.classList.toggle('active')
        setFavoriteIsOpen(prev => !prev)
        if (favoritesRef.current.classList.contains('active')) {
            setFilteredBoards(boards.filter((board) => board.isStarred))
        } else {
            setFilteredBoards([])
        }

    }

    function onOpenBoards() {
        if (!favoritesIsOpen) return
        favoritesRef.current.classList.remove('active')
        setFavoriteIsOpen(false)
    }

    function onNav(nav) {
        if (nav === 'home') {
            homeRef.current.classList.add('active')
            myWorkRef.current.classList.remove('active')
        } else {
            homeRef.current.classList.remove('active')
            myWorkRef.current.classList.add('active')
        }
    }

    function onBoardClick(id) {
        navigate('/board/' + id)
    }

    function removeNavigateActive() {
        if (pathname !== '/board') homeRef.current.classList.remove('active')
        if (pathname !== '/my-work') myWorkRef.current.classList.remove('active')
    }

    function onCloseNav() {
        if (sideBarIsClose) {
            sideBarRef.current.classList.remove('close')
            sideBarRef.current.style.width = sidebarWidth + 'px'
            setSideBarIsClose('')
        } else {
            sideBarRef.current.classList.add('close')
            sideBarRef.current.style.width = 30 + 'px'
            setSideBarIsClose('close')
        }
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onCleanSearch() {
        setFilterByToEdit({ name: '' })
    }

    const handleMouseDown = (e) => {
        if (sidebarBounds.width + 5 - e.clientX <= 15 && sidebarBounds.width + 5 - e.clientX > 2) {
            window.addEventListener("mousemove", handleDrag)
            window.addEventListener("mouseup", () => {
                window.removeEventListener("mousemove", handleDrag)
                setSidebarBounds(sideBarRef.current.getBoundingClientRect())
                sideBarRef.current.classList.remove('resize')
                document.body.style.cursor = 'default'

            })
        }
    }

    const handleDrag = (e) => {
        sideBarRef.current.classList.add('resize')
        document.body.style.cursor = 'col-resize'
        if (e.clientX >= 200 && e.clientX <= 570) {
            setSideBarWidth(e.clientX)
            setSidebarBounds(sideBarRef.current.getBoundingClientRect())
        }
    }

    function onAddBoard() {
        setBackdrop(true)
        setIsAddBoardModal(true)
    }

    function BoardOptionsModal({ onClose, boardId, onAddToFavorites }) {
        return (
            <div className="modal-overlay" onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}>
                <div
                    ref={modalRef}
                    className="modal-content"
                    style={{ top: modalPosition.top, left: modalPosition.left }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={() => { console.log('Rename clicked for:', boardId); onRename(boardId); }}>Rename</button>
                    <button onClick={() => onDelete(boardId)}>Delete</button>
                    <button onClick={() => { console.log('Add to Favorites clicked for:', boardId); onAddToFavorites(boardId); }}>Add to Favorites</button>
                </div>
            </div>
        )
    }

    // Updated onDelete function to receive boardId
    async function onDelete(boardId) {
        console.log('Deleting board...', boardId)
        try {
            if (boardId) {
                // Remove board immediately
                await removeBoard(boardId)
                console.log('Board removed successfully.')

                // Optional: Reload board list after deletion
                await loadBoards()
                closeModal()
                navigate('/board')
            }
        } catch (err) {
            console.error("Error deleting board:", err)
        }
    }

    // Updated onRename function to receive boardId
    async function onRename(boardId) {
        console.log('Renaming board...', boardId)
        const newTitle = prompt("Enter the new board name:")
        if (newTitle) {
            try {
                await updateBoard(boardId, { title: newTitle })
                await loadBoards()
                closeModal()
            } catch (err) {
                console.error("Error renaming board:", err)
            }
        }
    }

    // Function to open the modal
    const openModal = (boardId, event) => {
        setModalBoardId(boardId)
        const { top, left, height } = event.currentTarget.getBoundingClientRect()
        setModalPosition({
            top: top + height + window.scrollY,
            left: left + window.scrollX
        })
        setIsModalOpen(true)
    }

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false)
        setModalBoardId(null)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log('Click target:', event);
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal()
            }
        }

        if (isModalOpen) {
            window.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            window.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isModalOpen])

    const hiddenClass = favoritesIsOpen ? 'hidden' : ''

    return (
        <section
            onMouseDown={handleMouseDown}
            ref={sideBarRef}
            className={`sidebar `}>
            <div className="navigation">
                <div className="nav">
                    <NavLink onClick={() => onNav('home')} ref={homeRef} to='/board'>
                        <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" tabIndex="-1" className="icon_e7210c37bd" data-testid="icon"><path d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        Home
                    </NavLink>
                    <div className="left-arrow">
                        <button onClick={onCloseNav}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="14" height="14" role="button" ndndex="0" aria-hidden="false" className="icon_e7210c37bd GD1dz clickable_d5a9dfa7fb noFocusStyle_26dd7872ca" data-testid="icon"><path d="M5.46967 10.5303L6 10L5.46967 9.46967C5.17678 9.76256 5.17678 10.2374 5.46967 10.5303ZM7.06066 10L13.5303 3.53033C13.8232 3.23744 13.8232 2.76256 13.5303 2.46967C13.2374 2.17678 12.7626 2.17678 12.4697 2.46967L5.46967 9.46967L6 10L5.46967 10.5303L12.4697 17.5303C12.7626 17.8232 13.2374 17.8232 13.5303 17.5303C13.8232 17.2374 13.8232 16.7626 13.5303 16.4697L7.06066 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                </div>
                <div className="nav">
                    <NavLink ref={myWorkRef} to='/my-work' >
                        <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" tabIndex="-1" className="icon_e7210c37bd" data-testid="icon"><path d="M5.99986 1.82129C6.41407 1.82129 6.74986 2.15708 6.74986 2.57129V4.10701H13.2499V2.57129C13.2499 2.15708 13.5856 1.82129 13.9999 1.82129C14.4141 1.82129 14.7499 2.15708 14.7499 2.57129V4.107H16.2856C16.7876 4.107 17.269 4.30643 17.624 4.66141C17.979 5.01639 18.1784 5.49784 18.1784 5.99986V16.2856C18.1784 16.7876 17.979 17.269 17.624 17.624C17.269 17.979 16.7876 18.1784 16.2856 18.1784H3.71415C3.21213 18.1784 2.73067 17.979 2.37569 17.624C2.02071 17.269 1.82129 16.7876 1.82129 16.2856V5.99986C1.82129 5.49784 2.02071 5.01639 2.37569 4.66141C2.73067 4.30643 3.21213 4.107 3.71415 4.107C3.763 4.107 3.81077 4.11168 3.85702 4.1206C3.90326 4.11168 3.95102 4.10701 3.99986 4.10701H5.24986V2.57129C5.24986 2.15708 5.58565 1.82129 5.99986 1.82129ZM5.24986 7.14272V5.60701H3.99986C3.95101 5.60701 3.90324 5.60234 3.85699 5.59342C3.81075 5.60233 3.76299 5.607 3.71415 5.607C3.60995 5.607 3.51003 5.64839 3.43635 5.72207C3.36268 5.79574 3.32129 5.89567 3.32129 5.99986V16.2856C3.32129 16.3898 3.36268 16.4897 3.43635 16.5634C3.51003 16.637 3.60995 16.6784 3.71415 16.6784H16.2856C16.3898 16.6784 16.4897 16.637 16.5634 16.5634C16.637 16.4897 16.6784 16.3898 16.6784 16.2856V5.99986C16.6784 5.89567 16.637 5.79574 16.5634 5.72207C16.4897 5.64839 16.3898 5.607 16.2856 5.607H14.7499V7.14272C14.7499 7.55693 14.4141 7.89272 13.9999 7.89272C13.5856 7.89272 13.2499 7.55693 13.2499 7.14272V5.60701H6.74986V7.14272C6.74986 7.55693 6.41407 7.89272 5.99986 7.89272C5.58565 7.89272 5.24986 7.55693 5.24986 7.14272ZM13.4214 9.92231C13.6942 9.61058 13.6626 9.13676 13.3509 8.864C13.0392 8.59124 12.5653 8.62283 12.2926 8.93455L8.75058 12.9825L7.02129 11.6856C6.68992 11.437 6.21982 11.5042 5.97129 11.8356C5.72276 12.1669 5.78992 12.637 6.12129 12.8856L8.407 14.5999C8.72086 14.8353 9.16309 14.789 9.42144 14.4937L13.4214 9.92231Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        My work
                    </NavLink>
                </div>
            </div>

            <div className="divider"></div>

            <div ref={favoritesRef} className="favorites-container ">
                <div onClick={onActiveFavorites} className="content">
                    < svg className="star" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.38651 0.919639L8.72889 1.24523L9.38698 0.920593L11.129 4.45187L15.0309 5.02032C15.2789 5.05775 15.5116 5.16372 15.7026 5.32629C15.8937 5.48886 16.0355 5.70156 16.1121 5.94041C16.1888 6.17927 16.1972 6.43478 16.1364 6.67816C16.0757 6.92112 15.9484 7.14233 15.769 7.31695L15.768 7.31784L12.9482 10.0673L13.6135 13.9517L13.6138 13.9535C13.6571 14.2021 13.6297 14.4578 13.5347 14.6916C13.4394 14.9259 13.2801 15.1287 13.0749 15.2767C12.8698 15.4246 12.6271 15.5118 12.3747 15.5283C12.1238 15.5446 11.8735 15.4904 11.6519 15.3718L8.17876 13.5456L4.69674 15.3773C4.47515 15.4959 4.22475 15.5502 3.97387 15.5338C3.72146 15.5174 3.47877 15.4302 3.27362 15.2823C3.06847 15.1343 2.90914 14.9315 2.81388 14.6972C2.71885 14.4634 2.69143 14.2076 2.73473 13.959L2.73504 13.9573L3.4004 10.0728L0.58498 7.32119L0.58397 7.32021C0.404543 7.1456 0.277339 6.92443 0.216658 6.68151C0.155863 6.43814 0.164258 6.18262 0.240897 5.94377C0.317535 5.70491 0.45937 5.49221 0.650413 5.32964C0.841455 5.16707 1.07411 5.0611 1.32215 5.02367L1.32538 5.02319L5.22851 4.45192L6.97099 0.919639C7.08244 0.694536 7.25457 0.505061 7.46798 0.37259C7.68139 0.240118 7.92757 0.169922 8.17875 0.169922C8.42993 0.169922 8.67611 0.240118 8.88952 0.37259C9.10292 0.505061 9.27506 0.694536 9.38651 0.919639Z" /></svg>
                    <span>Favorites</span>

                    <div className="tools">
                        <div className="dots">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" role="img" aria-hidden="true"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" /></svg>
                            </button>
                        </div>

                        <div className="arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" className="icon_e7210c37bd bar6H noFocusStyle_26dd7872ca" data-testid="icon"><path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                        </div>
                    </div>
                </div>

                <div className="favorite-boards">
                    {filteredBoards.map(board => {
                        return <div onClick={() => onBoardClick(board._id)} key={board._id} className={pathname === `/board/${board._id}` ? 'board active' : 'board'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="19" height="19" aria-hidden="true" data-testid="icon"><path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                            <p>{board.title}</p>
                            <div className="dots">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" role="img" aria-hidden="true"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" /></svg>
                                </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div className="divider"></div>

            <div className={`workspaces-display ${hiddenClass}`}>

                <div onClick={onOpenBoards} className="workspace-name">
                    <h2 className="letter">S</h2>
                    <h2 className="title">Sprint 4 - monday</h2>
                    <div>
                        <div className="arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" className="icon_e7210c37bd bar6H noFocusStyle_26dd7872ca" data-testid="icon"><path d="M10.5303 12.5303L10 12L9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303ZM10 10.9393L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L9.46967 12.5303L10 12L10.5303 12.5303L14.5303 8.53033C14.8232 8.23744 14.8232 7.76256 14.5303 7.46967C14.2374 7.17678 13.7626 7.17678 13.4697 7.46967L10 10.9393Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                        </div>
                    </div>
                    <div className="dots">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" role="img" aria-hidden="true"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" /></svg>
                        </button>
                    </div>

                </div>

            </div>

            <div className={`search-workspace ${hiddenClass}`}>
                <div className="search-bar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-testid="icon" ><path d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                    <input type="text" name="title" placeholder="Search" onChange={handleChange} value={filterByToEdit.name} />
                    {filterByToEdit.title && <svg className="clear" onClick={onCleanSearch} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" role="button" tabIndex="0" aria-hidden="false" data-testid="icon"><path d="M6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L8.62562 9.68628L5.47045 12.8415C5.17756 13.1343 5.17756 13.6092 5.47045 13.9021C5.76334 14.195 6.23822 14.195 6.53111 13.9021L9.68628 10.7469L12.8415 13.9021C13.1343 14.195 13.6092 14.195 13.9021 13.9021C14.195 13.6092 14.195 13.1343 13.9021 12.8415L10.7469 9.68628L13.9029 6.53033C14.1958 6.23744 14.1958 5.76256 13.9029 5.46967C13.61 5.17678 13.1351 5.17678 12.8422 5.46967L9.68628 8.62562L6.53033 5.46967Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>}
                    <svg ref={filterIconRef} className="filter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" role="img" aria-hidden="true"><path d="M17.8571 2.87669C18.107 3.41157 18.0246 4.04275 17.6457 4.49555L12.4892 10.6589V15.3856C12.4892 16.0185 12.097 16.5852 11.5048 16.8082L9.56669 17.5381C9.09976 17.7139 8.57627 17.6494 8.16598 17.3655C7.75569 17.0816 7.51084 16.6144 7.51084 16.1155V10.6589L2.35425 4.49555C1.97542 4.04275 1.89302 3.41157 2.14291 2.87669C2.39279 2.34182 2.92977 2 3.52013 2H16.4799C17.0702 2 17.6072 2.34182 17.8571 2.87669ZM16.4799 3.52012H3.52013L8.91611 9.96964C8.99036 10.0584 9.03096 10.1698 9.03096 10.2848V16.1155L10.969 15.3856V10.2848C10.969 10.1698 11.0096 10.0584 11.0839 9.96964L16.4799 3.52012Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>

                </div>
                <button className="plus" onClick={onAddBoard}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="icon_e7210c37bd noFocusStyle_26dd7872ca" data-testid="icon"><g id="Icon / Basic / Add"><path id="Union" d="M10 2.25C10.4142 2.25 10.75 2.58579 10.75 3V9.25H17C17.4142 9.25 17.75 9.58579 17.75 10C17.75 10.4142 17.4142 10.75 17 10.75H10.75V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17V10.75H3C2.58579 10.75 2.25 10.4142 2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H9.25V3C9.25 2.58579 9.58579 2.25 10 2.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></g></svg>
                </button>
            </div>

            {boards && <div className={`boards ${hiddenClass}`}>
                {filterByToEdit.title ?
                    filteredBoards.map(board => {
                        return <div onClick={() => onBoardClick(board._id)} key={board._id} className={`board-wrapper ${pathname === `/board/${board._id}` ? 'board active' : 'board'}`} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="19" height="19" aria-hidden="true" data-testid="icon"><path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                            <p>{board.title}</p>
                            <div className="dots" onClick={(e) => { e.stopPropagation(); openModal(board._id, e) }}>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" role="img" aria-hidden="true"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" /></svg>
                                </button>
                            </div>
                        </div>
                    })
                    :
                    boards.map(board => {
                        return <div onClick={() => onBoardClick(board._id)} key={board._id} className={`board-wrapper ${pathname === `/board/${board._id}` ? 'board active' : 'board'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="19" height="19" aria-hidden="true" data-testid="icon"><path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
                            <p>{board.title}</p>
                            <div className="dots" onClick={(e) => { e.stopPropagation(); openModal(board._id, e) }}>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" role="img" aria-hidden="true"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" /></svg>
                                </button>
                            </div>
                        </div>
                    })
                }

            </div>
            }
            {isModalOpen && (
                <BoardOptionsModal
                    onClose={closeModal}
                    boardId={modalBoardId} // Pass boardId to the modal
                    onAddToFavorites={() => console.log("Add to Favorites", modalBoardId)}
                />
            )}

        </section>
    )
}
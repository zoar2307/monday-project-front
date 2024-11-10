import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import { UPDATE_BOARD } from "../store/reducers/board.reducer";
import { saveBoard } from "../store/actions/board.actions";



export function BoardPreview({ board }) {
    const [isStarred, setIsStarred] = useState(board.isStarred)
    const dispatch = useDispatch()
    const goldColor = 'rgb(255, 203, 0)'
    const defaultColor = 'rgb(103, 104, 121)'

    useEffect(() => {
        setIsStarred(board.isStarred);
    }, [board.isStarred]);



    function handleClick(event) {
        event.preventDefault()
        try {
            const updatedBoard = { ...board, isStarred: !isStarred };
            saveBoard(updatedBoard)
            dispatch({ type: UPDATE_BOARD, board: updatedBoard })
            setIsStarred(isStarred => !isStarred)
        } catch (error) {
            console.log('Had issues in board edit', err)
        }
    }


    return (

        <section className="board-preview">
            <NavLink to={`/board/${board._id}`}>
                <article className="project-card flex flex-column">
                    <div className="img-card flex">
                        <img src="https://cdn.monday.com/images/quick_search_recent_board.svg" alt="" />
                    </div>
                    <span className="name-card">
                        <div className="title-card">
                            <svg className="icon-title" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" aria-hidden="true" class="icon_1360dfb99d" data-testid="icon"><path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            <span>{board.title}</span>
                        </div>
                        <div className="star-icon" onClick={handleClick}>
                            <svg
                                viewBox="0 0 20 20"
                                fill={isStarred ? goldColor : defaultColor} // Fill yellow if clicked, otherwise no fill
                                width="20"
                                height="20"
                                aria-hidden="true"
                                className="icon_1360dfb99d star-component-button-icon noFocusStyle_faf4efa4b1"

                            >
                                <path
                                    d="M10 3.90449L8.30061 7.34943C8.20168 7.5491 8.05582 7.72182 7.87554 7.85278C7.69525 7.98374 7.4859 8.06904 7.26543 8.10138L3.46267 8.65796L6.21005 11.3431C6.21018 11.3432 6.20992 11.343 6.21005 11.3431C6.37003 11.499 6.48998 11.6919 6.55878 11.9044C6.6275 12.1167 6.64348 12.3425 6.60534 12.5624C6.60528 12.5628 6.60521 12.5632 6.60514 12.5636L5.95599 16.3534L9.3594 14.563C9.5569 14.4592 9.77687 14.4048 10 14.4048C10.2231 14.4048 10.4429 14.4591 10.6404 14.5629L14.0349 16.3477L13.3857 12.5579C13.3856 12.5574 13.3856 12.5569 13.3855 12.5565C13.3474 12.3367 13.3634 12.1109 13.4321 11.8987C13.5009 11.6862 13.6204 11.4936 13.7804 11.3378C13.7805 11.3376 13.7803 11.3379 13.7804 11.3378L16.5322 8.65463L12.7353 8.10149C12.5148 8.06915 12.3048 7.98374 12.1245 7.85278C11.9442 7.72182 11.7983 7.54911 11.6994 7.34943L10 3.90449ZM10.5623 3.34904L11.2344 3.01626C11.1205 2.78619 10.9446 2.59254 10.7265 2.45714C10.5083 2.32175 10.2567 2.25 10 2.25C9.74328 2.25 9.49166 2.32175 9.27355 2.45714C9.05543 2.59254 8.87949 2.78619 8.76558 3.01626L6.98466 6.6265L2.99539 7.21037L2.99209 7.21086C2.73857 7.24912 2.50078 7.35743 2.30552 7.52359C2.11027 7.68974 1.9653 7.90714 1.88697 8.15127C1.80864 8.39539 1.80006 8.65655 1.8622 8.90529C1.92422 9.15357 2.05423 9.37963 2.23762 9.55808C2.23796 9.55842 2.2383 9.55875 2.23865 9.55909L5.11621 12.3715L4.43615 16.3417C4.43605 16.3422 4.43594 16.3428 4.43584 16.3434C4.39159 16.5975 4.41961 16.8589 4.51674 17.0979C4.6141 17.3374 4.77694 17.5446 4.98662 17.6958C5.1963 17.8471 5.44434 17.9362 5.70233 17.953C5.95874 17.9697 6.21467 17.9142 6.44115 17.793L10 15.9209L13.5498 17.7874C13.7763 17.9085 14.0322 17.964 14.2885 17.9473C14.5465 17.9305 14.7946 17.8414 15.0042 17.6901C15.2139 17.5389 15.3768 17.3317 15.4741 17.0922C15.5712 16.8532 15.5993 16.5918 15.555 16.3378C15.5549 16.3372 15.5548 16.3365 15.5547 16.3359L14.8747 12.3658L17.7568 9.55566C17.7571 9.55536 17.7574 9.55505 17.7577 9.55475C17.9412 9.37628 18.0712 9.15018 18.1332 8.90186C18.1954 8.65312 18.1868 8.39196 18.1085 8.14784C18.0301 7.90371 17.8852 7.68632 17.6899 7.52016C17.4946 7.354 17.2569 7.24569 17.0033 7.20743L13.0153 6.62645L11.2349 3.01724L10.5623 3.34904Z"
                                    fill="isStarred"
                                    fillRule={isStarred ? goldColor : 'evenodd'}
                                    clipRule={isStarred ? goldColor : 'evenodd'}
                                ></path>
                            </svg>
                        </div>
                    </span>
                    <div className="path-card"></div>
                </article>
            </NavLink>
        </section>

    )
}


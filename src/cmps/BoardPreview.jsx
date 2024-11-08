import { NavLink } from "react-router-dom"

export function BoardPreview({ board }) {

    return (
        <>

            <NavLink to={`/board/${board._id}`}>
                <article className="project-card flex flex-column">
                    <div className="img-card">
                        <img src="https://cdn.monday.com/images/quick_search_recent_board.svg" alt="" />
                    </div>
                    <span className="name-card">{board.title}</span>
                    <div className="path-card"></div>
                </article>
            </NavLink>
        </>
    )
}


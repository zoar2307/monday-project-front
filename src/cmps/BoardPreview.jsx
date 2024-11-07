import { NavLink } from "react-router-dom"

export function BoardPreview() {

    return (
        <>
            <NavLink to="/board/:boardId?">
                <button className="btn-content">
                    Get Project <i class="fa-solid fa-arrow-right"></i>{" "}
                </button>
            </NavLink>
        </>
    )
}


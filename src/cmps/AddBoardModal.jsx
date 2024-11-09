import { useState } from "react"

export function AddBoardModal({ setModal }) {

    const [newBoard, setNewBoard] = useState({ title: 'New Board' })

    function onSubmit() {

        setModal(false)
    }

    return (
        <section className="add-board-modal">
            <form onSubmit={onSubmit}>
                <button>x</button>
                <h2>Create board</h2>
                <label htmlFor="title">
                    New Board
                </label>
                <input type="text" value={newBoard.title} />
                <button type="button">Cancel</button>
                <button>Create</button>
            </form>
        </section>
    )
}
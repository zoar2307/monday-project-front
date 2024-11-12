import { useState } from "react"
import { useNavigate } from "react-router-dom" // Import useNavigate from react-router-dom
import { addGroup, saveBoard, setBackdrop, setIsAddBoardModal } from "../store/actions/board.actions"
import { useSelector } from "react-redux"

export function AddBoardModal() {
    const isAddBoardModal = useSelector((state) => state.boardModule.isAddBoardModal)
    const board = useSelector(storeState => storeState.boardModule.currBoard)

    const navigate = useNavigate() // Initialize the navigate function

    const [newBoard, setNewBoard] = useState({ title: 'New Board' })

    async function onSubmit(event) {
        event.preventDefault() // Prevent the form from refreshing the page

        try {
            const savedBoard = await saveBoard(newBoard) // Save the board and get the response
            await addGroup(board._id)

            if (savedBoard && savedBoard._id) {
                navigate(`/board/${savedBoard._id}`) // Navigate to the new board's page using its ID
            }

            onClose()
        } catch (err) {
            console.log(err)
        }
    }

    function onClose() {
        setBackdrop(false)
        setIsAddBoardModal(false)
        setNewBoard({ title: 'New Board' })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setNewBoard(prevFilter => ({ ...prevFilter, title: value }))
    }

    if (!isAddBoardModal) return null

    return (
        <section className="add-board-modal">
            <form onSubmit={onSubmit}>
                <button className="close-x" type="button" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h2>Create board</h2>
                <div className="form-line">
                    <label htmlFor="title">
                        Board name
                    </label>
                    <input type="text" value={newBoard.title} onChange={handleChange} />
                </div>
                <div className="button-container">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit">Create Board</button>
                </div>
            </form>
        </section>
    )
}

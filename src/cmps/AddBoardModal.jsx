import { useState } from "react"
import { saveBoard, setBackdrop, setIsAddBoardModal } from "../store/actions/board.actions"
import { useSelector } from "react-redux"

export function AddBoardModal() {
    const isAddBoardModal = useSelector((state) => state.boardModule.isAddBoardModal)

    const [newBoard, setNewBoard] = useState({ title: 'New Board' })

    function onSubmit() {
        try {
            saveBoard(newBoard)
            onClose()
        }
        catch (err) {
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
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setNewBoard(prevFilter => ({ ...prevFilter, title: value }))
    }


    if (!isAddBoardModal) return ''

    return (
        <section className="add-board-modal">
            <form onSubmit={onSubmit}>
                <button className="close-x" type="button" onClick={onClose}><i class="fa-solid fa-xmark"></i></button>
                <h2>Create board</h2>
                <div className="form-line">
                    <label htmlFor="title">
                        Board name
                    </label>
                    <input type="text" value={newBoard.title} onChange={handleChange} />
                </div>
                <div className="button-container">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button>Create Board</button>
                </div>
            </form>
        </section>
    )
}
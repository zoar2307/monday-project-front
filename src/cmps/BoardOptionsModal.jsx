import { useRef } from "react"

export function BoardOptionsModal({ onClose, boardId, onAddToFavorites, modalPosition, onDelete, isStarred, onRename }) {
    const modalRef = useRef(null)

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div
                ref={modalRef}
                className="modal-content"
                style={{
                    top: modalPosition.top,
                    left: modalPosition.left,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={() => { onRename(boardId); onClose() }}><i class="fa-solid fa-pencil"></i>Rename</button>
                <button onClick={() => onDelete(boardId)}><i class="fa-regular fa-trash-can"></i>Delete</button>
                <button onClick={() => onAddToFavorites(boardId)}>
                <i class="fa-regular fa-star"></i>
                    {isStarred ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    )
}

import { useRef } from "react";

export function BoardOptionsModal({ onClose, boardId, onAddToFavorites, modalPosition, onDelete, isStarred }) {
    const modalRef = useRef(null);  // Define the ref here

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();  // Close only if clicked outside modal content
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
        >
            <div
                ref={modalRef}  // Attach the ref here
                className="modal-content"
                style={{
                    position: 'absolute',
                    top: modalPosition.top,
                    left: modalPosition.left,
                    zIndex: 1001,  // Ensure modal is above other elements
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    pointerEvents: 'auto',  // Ensure modal content can capture clicks
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={() => { console.log('Rename clicked for:', boardId); onRename(boardId); }}>Rename</button>
                <button onClick={() => onDelete(boardId)}>Delete</button>
                <button onClick={() => onAddToFavorites(boardId)}>
                    {isStarred ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
}

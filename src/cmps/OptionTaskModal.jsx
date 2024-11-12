export function OptionTaskModal({ onClose }) {
    return (
        <div className="option-task-modal-overlay" onClick={onClose}>
            <div className="option-task-modal-content" onClick={(e) => e.stopPropagation()}>
                <p>Options for the task:</p>
                <button onClick={() => console.log('Option 1 clicked')}>Option 1</button>
                <button onClick={() => console.log('Option 2 clicked')}>Option 2</button>
                <button onClick={() => console.log('Option 3 clicked')}>Option 3</button>
            </div>
        </div>
    )
}
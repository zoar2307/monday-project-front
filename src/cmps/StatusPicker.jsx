// StatusPicker.js
import React from 'react';

export function StatusPicker({ info, onUpdate }) {
    const handleChange = (e) => {
        const newStatus = e.target.value;
        onUpdate({ status: newStatus });  // Pass the updated data back to the parent component
    };

    return (
        <div className="task-content flex flex-row align-center justify-between">
            <select value={info.status} onChange={handleChange}>
                <option value="Working on it">Working on it</option>
                <option value="Stuck">Stuck</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );
}

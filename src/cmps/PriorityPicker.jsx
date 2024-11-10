// PriorityPicker.js
import React from 'react';

export function PriorityPicker({ info, onUpdate }) {
    const handleChange = (e) => {
        const newPriority = e.target.value;
        onUpdate({ priority: newPriority });  // Pass the updated priority
    };

    return (
        <div>
            <label>Priority:</label>
            <select value={info.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>
    );
}
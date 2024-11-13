// DatePicker.js
import React from 'react';

export function DatePicker({ info, onUpdate }) {
    const handleChange = (e) => {
        const newDate = e.target.value
        onUpdate({ dueDate: newDate })  // Pass the updated due date
    }

    return (
        <div>
            <label>Due Date:</label>
            <input
                type="date"
                value={info.dueDate}
                onChange={handleChange}
            />
        </div>
    )
}
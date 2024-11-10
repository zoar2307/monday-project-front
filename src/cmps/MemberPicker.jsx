// MemberPicker.js
import React from 'react';

export function MemberPicker({ info, onUpdate }) {
    const handleChange = (e) => {
        const newMember = e.target.value;
        onUpdate({ assignedTo: newMember });  // Pass the updated member data
    };

    return (

        <div>
            <label>Assign Member:</label>
            <select value={info.assignedTo} onChange={handleChange}>
                <option value="Unassigned">Unassigned</option>
                <option value="User 1">User 1</option>
                <option value="User 2">User 2</option>
                {/* Add more members */}
            </select>
        </div>

    );
}
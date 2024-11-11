import React from 'react'

export function PriorityPicker({ info, onUpdate, labels }) {
  const handleChange = (e) => {
    const newPriority = e.target.value
    onUpdate({ priority: newPriority })
  }
  const getLabelColor = (type, value) => {
    const label = labels.find((label) => label.type === type && label.title === value)
    return label ? label.color : "#ddd"
  }
  return (
    <div className="priority-picker">
      <select
        value={info.priority}
        onChange={handleChange}
        style={{
          backgroundColor: getLabelColor("priority", info.priority),
          color: "#fff",
          border: "none",
          padding: "9px",
          width : "100%",
          appearance: "none", 
          textAlign : "center"
        }}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  )
}

import React from 'react'

export function StatusPicker({ info, onUpdate , labels }) {
  const handleChange = (e) => {
    const newStatus = e.target.value
    onUpdate({ status: newStatus })
  }
  const getLabelColor = (type, value) => {
    const label = labels.find((label) => label.type === type && label.title === value)
    return label ? label.color : "#ddd"
  }

  return (
    <div className="status-picker">
      <select
        value={info.status}
        onChange={handleChange}
        style={{
          backgroundColor: getLabelColor("status", info.status),
          color: "#fff",
          border: "none",
          padding: "9px",
          width : "100%",
          appearance: "none", 
          textAlign : "center"
        }}
      >
        <option value="Working on it">Working on it</option>
        <option value="Stuck">Stuck</option>
        <option value="Done">Done</option>
      </select>
    </div>
  )
}

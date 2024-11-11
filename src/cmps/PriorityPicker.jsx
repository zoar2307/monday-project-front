import React, { useState } from 'react'
import { PickerModal } from './DynamicCmp'

export function PriorityPicker({ info, onUpdate, labels }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const priorityLabels = labels.filter((label) => label.type === "priority")

  const handleSelect = (priority) => {
    onUpdate({ priority: priority.title })
    setModalOpen(false)
  }

  // Function to get the label color based on the priority
  const getLabelColor = (type, value) => {
    const label = labels.find((label) => label.type === type && label.title === value)
    return label ? label.color : "#ddd"
  }

  return (
    <div>
      {/* Display the selected priority with background color */}
      <div
        onClick={() => setModalOpen(true)}
        className="picker-display"
        style={{
          backgroundColor: getLabelColor("priority", info.priority),
          color: "#fff",
          border: "none",
          padding: "9px",
          width: "100%",
          appearance: "none",
          textAlign: "center",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {info.priority}
      </div>

      {/* Modal for selecting priority */}
      {isModalOpen && (
        <PickerModal
          options={priorityLabels}
          onSelect={handleSelect}
          closeModal={() => setModalOpen(false)}
          modalType="priority"
        />
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { PickerModal } from './DynamicCmp'

export function StatusPicker({ info, onUpdate, labels }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const statusLabels = labels.filter((label) => label.type === "status")

  const handleSelect = (status) => {
    onUpdate({ status: status.title })
    setModalOpen(false)
  }

  // Function to get the label color based on the status
  const getLabelColor = (type, value) => {
    const label = labels.find((label) => label.type === type && label.title === value)
    return label ? label.color : "#ddd"
  }

  return (
    <div>
      {/* Display the selected status with background color */}
      <div
        onClick={() => setModalOpen(true)}
        className="status label table"
        style={{
          backgroundColor: getLabelColor("status", info.status),
          color: "#fff",
          border: "none",
          appearance: "none",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        {info.status}
      </div>

      {/* Modal for selecting status */}
      {isModalOpen && (
        <PickerModal
          options={statusLabels}
          onSelect={handleSelect}
          closeModal={() => setModalOpen(false)}
          modalType="status"
        />
      )}
    </div>
  )
}

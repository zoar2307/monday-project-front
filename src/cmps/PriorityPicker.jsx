import React, { useState } from 'react'
import { PickerModal } from './PickerModal'

export function PriorityPicker({ info, onUpdate, labels }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const priorityLabels = labels.filter((label) => label.type === "priority")

  const handleSelect = (priority) => {
    onUpdate({ priority: priority.title })
    setModalOpen(false)
  }

  const getLabelColor = (type, value) => {
    const label = labels.find((label) => label.type === type && label.title === value)
    return label ? label.color : "#ddd"
  }

  return (
    <div className='label-container'>
      <div
        onClick={() => setModalOpen(true)}
        className="priority label not-header"
        style={{
          backgroundColor: getLabelColor("priority", info.priority),
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

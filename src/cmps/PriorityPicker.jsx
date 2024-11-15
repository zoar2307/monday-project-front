import React, { useRef, useState } from 'react'
import { PickerModal } from './PickerModal'
import { loadBoards } from '../store/actions/board.actions'

export function PriorityPicker({ info, onUpdate, labels }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const priorityLabels = labels.filter((label) => label.type === "priority")
  const labelRef = useRef()

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
        ref={labelRef}
        onClick={() => setModalOpen(prev => !prev)}
        className="priority label not-header table"
        style={{
          backgroundColor: getLabelColor("priority", info.priority),
        }}
      >
        {info.priority}
      </div>

      {/* Modal for selecting priority */}
      {isModalOpen && (
        <PickerModal
          labelRef={labelRef}
          options={priorityLabels}
          onSelect={handleSelect}
          closeModal={() => setModalOpen(false)}
          modalType="priority"
        />
      )}
    </div>
  )
}

import React, { useRef, useState } from 'react'
import { PickerModal } from './PickerModal'
import { loadBoards } from '../store/actions/board.actions'
export function StatusPicker({ info, onUpdate, labels }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const statusLabels = labels.filter((label) => label.type === "status")
  const labelRef = useRef()

  const handleSelect = (status) => {
    onUpdate({ status: status.title })
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
        className="status label not-header table"
        style={{
          backgroundColor: getLabelColor("status", info.status),
        }}
      >
        {info.status}
      </div>

      {isModalOpen && (
        <PickerModal
          labelRef={labelRef}
          options={statusLabels}
          onSelect={handleSelect}
          closeModal={() => setModalOpen(false)}
          modalType="status"
        />
      )}
    </div>
  )
}

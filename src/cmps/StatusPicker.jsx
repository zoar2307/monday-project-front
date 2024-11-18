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
        className={`status label not-header table ${info.status === 'Done' ? "done" : ''}`}
        style={{
          backgroundColor: getLabelColor("status", info.status),
        }}
      >
        {info.status === 'Done' && <div className='animation c1'></div>}
        {info.status === 'Done' && <div className='animation c2'></div>}
        {info.status === 'Done' && <div className='animation c3'></div>}
        {info.status === 'Done' && <div className='animation c4'></div>}
        {info.status === 'Done' && <div className='animation c5'></div>}
        {info.status === 'Done' && <div className='animation c6'></div>}
        {info.status === 'Done' && <div className='animation c7'></div>}
        {info.status === 'Done' && <div className='animation c8'></div>}
        {info.status === 'Done' && <div className='animation c9'></div>}
        {info.status === 'Done' && <div className='animation c10'></div>}
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

import React, { useEffect, useRef } from 'react'

export function PickerModal({ options, onSelect, closeModal, modalType, assignedIds = [] }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeModal])

  return (
    <div className="picker-modal-overlay" onClick={closeModal}>
      <div
        className="picker-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="picker-options">
          {options.map((option) => {
            const isAssigned = assignedIds.includes(option._id)

            return (
              <li
                key={option._id || option.title} 
                onClick={() => onSelect(option)} 
                style={{
                  backgroundColor: modalType !== 'member' ? option.color : 'transparent',
                }}
              >
                {modalType === 'member' && option.imgUrl && (
                  <img
                    src={option.imgUrl}
                    alt={option.fullname}
                    
                  />
                )}
                {option.fullname || option.title}
                
                {isAssigned && (
                  <span>✔️</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

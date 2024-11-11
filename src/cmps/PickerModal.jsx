import React, { useEffect, useRef } from 'react'

export function PickerModal({ options, onSelect, closeModal, modalType }) {
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
          {options.map((option) => (
            <li
              key={option.title || option._id}
              onClick={() => onSelect(option)}
              style={{
                backgroundColor: modalType !== 'member' ? option.color : 'transparent',
              }}
            >
              {modalType === 'member' && option.imgUrl && (
                <img
                  src={option.imgUrl}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                />
              )}
              {option.fullname || option.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

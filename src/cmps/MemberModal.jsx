import React, { useEffect, useRef } from 'react'

export function MemberModal({ options,
  onSelect,
  closeModal,
  modalType,
  assignedMembers = [] }) {
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
    <div className="members-modal-overlay-members" onClick={closeModal}>
      <div className='white-block'></div>
      <div
        className="members-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >

        <div className='assigned-members'>
          {assignedMembers.map(member => {
            return (
              <div className='member'>
                <div className='member-img'>
                  <img src={member.imgUrl} alt="" />
                </div>
                <div className='member-name'>
                  <span>{member.fullname}</span>
                </div>
                <div
                  onClick={() => onSelect(member)}
                  className='close'><i class="fa-solid fa-xmark"></i></div>
              </div>
            )
          })}

        </div>
        {/* <input type="text" /> */}
        <hr />

        <div className='suggested-title'>
          <span>Suggested people</span>
        </div>

        <ul className="members-options">
          {options.map((option, idx) => {
            const isInclude = assignedMembers.some(member => member._id === option._id)
            if (!isInclude) return (
              <div key={option._id}
                onClick={() => onSelect(option, true)} className='suggested-member'>
                <div className='member-img'>
                  <img src={option.imgUrl} alt="" />
                </div>
                <div className='member-name'>
                  <span>{option.fullname}</span>
                </div>
              </div>
              // <li
              //   key={option._id || option.title}
              //   onClick={() => onSelect(option)}
              //   style={{
              //     backgroundColor: modalType !== 'member' ? option.color : 'transparent',
              //   }}
              // >
              //   {modalType === 'member' && option.imgUrl && (
              //     <img
              //       src={option.imgUrl}
              //       alt={option.fullname}

              //     />
              //   )}
              //   {option.fullname || option.title}

              //   {isAssigned && (
              //     <span>✔️</span>
              //   )}
              // </li>
            )

          })}
        </ul>
      </div>
    </div>
  )
}

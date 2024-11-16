import React, { useEffect, useRef, useState } from 'react'

export function MemberModal({ options,
  onSelect,
  closeModal,
  modalType,
  assignedMembers = [],
  memberRef }) {
  const modalRef = useRef(null)
  const [filterByToEdit, setFilterByToEdit] = useState({ name: '' })
  const [availableMembers, setAvailableMembers] = useState(options)

  useEffect(() => {
    setAvailableMembers(options)
  }, [options])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    switch (type) {
      case 'number':
      case 'range':
        value = +value
        break;

      case 'checkbox':
        value = target.checked
        break
    }
    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  function onCleanSearch() {
    setFilterByToEdit({ name: '' })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)
        && memberRef.current && !memberRef.current.contains(event.target)
      ) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeModal])


  useEffect(() => {
    if (filterByToEdit.name) {
      const regex = new RegExp(filterByToEdit.name, "i")
      setAvailableMembers(options.filter((option) => regex.test(option.fullname)))
    } else {
      setAvailableMembers(options)
    }
  }, [filterByToEdit])


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
              <div key={member._id} className='member'>
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
        <div className='input-container'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="icon_da9e87501e noFocusStyle_757c94136d" data-testid="icon"><path d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
          <input type="text" name='name' onChange={handleChange} value={filterByToEdit.name} placeholder='Search names' />
        </div>


        {!filterByToEdit.name && <div className='suggested-title'>
          <span>Suggested people</span>
        </div>
        }
        <ul className="members-options">
          {availableMembers.map((option, idx) => {
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

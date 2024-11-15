import React, { useRef, useState } from 'react'
import { MemberModal } from './MemberModal'
import userEmpty from '../assets/img/user-empty.svg'

export function MemberPicker({ info, onUpdate, members }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const memberRef = useRef()
  // Ensure assignedTo is an array
  const assignedToArray = Array.isArray(info.assignedTo)
    ? info.assignedTo
    : info.assignedTo ? [info.assignedTo] : []
  // Get assigned member objects from IDs
  const assignedMembers = assignedToArray
    .map((assignedMember) => members.find((member) => member._id === assignedMember._id))
    .filter(Boolean)

  const handleSelect = async (member, close = false) => {
    let updatedAssignedTo
    // const updatedAssignedTo = assignedToArray.includes(member._id)
    //   ? assignedToArray.filter((id) => id !== member._id)
    //   : [...assignedToArray, member]
    const isExisting = assignedToArray.find(assignedMember => assignedMember._id === member._id)
    if (isExisting) updatedAssignedTo = assignedToArray.filter((assignedMember) => assignedMember._id !== member._id)
    else updatedAssignedTo = [...assignedToArray, member]

    onUpdate({ assignedTo: updatedAssignedTo })

    if (close) setIsModalOpen(false)
  }
  const closeModal = () => setIsModalOpen(false)

  let membersClass


  return (
    <div className="label-container">
      <div
        ref={memberRef}
        onClick={() => setIsModalOpen(prev => !prev)}
        className={`members label not-header `}

      >
        {assignedMembers.length > 0 ? (
          assignedMembers.map((member, idx) => {
            // <img
            //   key={member._id}
            //   src={member.imgUrl}
            //   alt={member.fullname}
            //   title={member.fullname}
            // />
            if (idx < 4) {
              return (<img
                key={member._id}
                src={member.imgUrl}
                alt={member.fullname}
                title={member.fullname}
              />)
            }
          })
        ) : (
          <img
            src={userEmpty}
            alt="Unassigned"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        )}
        {assignedMembers.length > 4 && <div className="plus-member">+{assignedMembers.length - 4}</div>}
      </div>

      {isModalOpen && (
        <MemberModal
          memberRef={memberRef}
          options={members}
          onSelect={handleSelect}
          closeModal={closeModal}
          modalType="member"
          assignedMembers={assignedToArray}
        />
      )}
    </div>
  )
}










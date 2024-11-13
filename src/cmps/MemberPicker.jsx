import React, { useState } from 'react'
import { MemberModal } from './MemberModal'
import userEmpty from '../assets/img/user-empty.svg'

export function MemberPicker({ info, onUpdate, members }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    console.log(assignedToArray)
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
        onClick={() => setIsModalOpen(true)}
        className={`members label not-header `}

      >
        {assignedMembers.length > 0 ? (
          assignedMembers.map((member) => (
            <img
              key={member._id}
              src={member.imgUrl}
              alt={member.fullname}
              title={member.fullname}
              style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '4px' }}
            />
          ))
        ) : (
          <img
            src={userEmpty}
            alt="Unassigned"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        )}
      </div>
      {isModalOpen && (
        <MemberModal
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










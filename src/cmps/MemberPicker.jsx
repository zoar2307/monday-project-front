import React, { useState } from 'react'
import { PickerModal } from './PickerModal'
import userEmpty from '../assets/img/user-empty.svg'

export function MemberPicker({ info, onUpdate, members }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Ensure assignedTo is an array
  const assignedToArray = Array.isArray(info.assignedTo)
    ? info.assignedTo
    : info.assignedTo ? [info.assignedTo] : []

  // Get assigned member objects from IDs
  const assignedMembers = assignedToArray
    .map((memberId) => members.find((member) => member._id === memberId))
    .filter(Boolean)

  const handleSelect = async (member) => {
    const updatedAssignedTo = assignedToArray.includes(member._id)
      ? assignedToArray.filter((id) => id !== member._id)
      : [...assignedToArray, member._id]

    onUpdate({ assignedTo: updatedAssignedTo })

    setIsModalOpen(false)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="label-container">
      <div
        onClick={() => setIsModalOpen(true)}
        className="members label not-header"
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        {assignedMembers.length > 0 ? (
          assignedMembers.map((member) => (
            <img
              key={member._id}
              src={member.imgUrl}
              alt={member.fullname}
              title={member.fullname}
              style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '4px' }}
            />
          ))
        ) : (
          <img
            src={userEmpty}
            alt="Unassigned"
            style={{ width: '24px', height: '24px', borderRadius: '50%' }}
          />
        )}
      </div>

      {isModalOpen && (
        <PickerModal
          options={members}
          onSelect={handleSelect}
          closeModal={closeModal}
          modalType="member"
          assignedIds={assignedToArray}
        />
      )}
    </div>
  )
}

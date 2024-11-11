import React, { useState } from 'react'
import { PickerModal } from './PickerModal'

export function MemberPicker({ info, onUpdate, members }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const assignedToArray = Array.isArray(info.assignedTo) ? info.assignedTo : info.assignedTo ? [info.assignedTo] : []

  const assignedMembers = assignedToArray
    .map(memberId => members.find(member => member._id === memberId))
    .filter(Boolean)

  const handleSelect = (member) => {
    const updatedAssignedTo = assignedToArray.includes(member._id)
      ? assignedToArray.filter(id => id !== member._id)
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
              title={member.fullname}
            />
          ))
        ) : (
          'Unassigned'
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

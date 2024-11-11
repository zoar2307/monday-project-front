import React from 'react'

export function MemberPicker({ info, onUpdate, members }) {
  const handleChange = (e) => {
    const selectedMemberId = e.target.value
    onUpdate({ assignedTo: selectedMemberId })
  }

  return (
    <div className="members label">
      <select
        value={info.assignedTo?._id || "Unassigned"}
        onChange={handleChange}
        style={{
          border: "none",
          appearance: "none",
        }}
      >
        <option value="Unassigned">Unassigned</option>
        {members.map((member) => (
          <option key={member._id} value={member._id}>
            {member.fullname}
          </option>
        ))}
      </select>
    </div>
  )
}

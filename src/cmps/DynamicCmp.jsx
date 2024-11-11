// DynamicCmp.js
import React from 'react'
import { StatusPicker } from './StatusPicker.jsx'
import { MemberPicker } from './MemberPicker.jsx'
import { PriorityPicker } from './PriorityPicker.jsx';
export function DynamicCmp({ cmp, info, onUpdate , labels , members}) {
    console.log(cmp);

    switch (cmp) {
        case 'StatusPicker':
            return <StatusPicker info={info} onUpdate={onUpdate} labels={labels} />
        case 'MemberPicker':

            return <MemberPicker info={info} onUpdate={onUpdate} members={members} />
        case 'PriorityPicker':

            return <PriorityPicker info={info} onUpdate={onUpdate} labels={labels} />
        default:

            return <p>UNKNOWN {cmp}</p>
    }
}


export function PickerModal({ options, onSelect, closeModal, modalType }) {
  return (
      <div className="picker-modal" onClick={(e) => e.stopPropagation()}>
        <ul className="picker-options">
          {options.map((option) => (
            <li
              key={option.title || option._id}
              onClick={() => onSelect(option)}
              style={{
                position:"relative",
                top:"0",
                backgroundColor: modalType !== "member" ? option.color : "transparent",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {modalType === "member" && option.imgUrl && (
                <img
                  src={option.imgUrl}
                  alt={option.fullname}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                />
              )}
              {option.fullname || option.title}
            </li>
          ))}
        </ul>
      </div>
  )
}


// DynamicCmp.js
import React from 'react'
import { StatusPicker } from './StatusPicker.jsx'
import { MemberPicker } from './MemberPicker.jsx'
import { PriorityPicker } from './PriorityPicker.jsx'
import { DatePickerModal } from './DatePicker.jsx'



export function DynamicCmp({ cmp, info, onUpdate, labels, members }) {

  switch (cmp) {

    case 'StatusPicker':
      return <StatusPicker info={info} onUpdate={onUpdate} labels={labels} />

    case 'MemberPicker':
      return <MemberPicker info={info} onUpdate={onUpdate} members={members} />

    case 'PriorityPicker':
      return <PriorityPicker info={info} onUpdate={onUpdate} labels={labels} />

    case 'DatePicker':
      return <DatePickerModal info={info} onUpdate={onUpdate} />
    default:


      return <p>UNKNOWN {cmp}</p>
  }
}



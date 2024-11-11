// DynamicCmp.js
import React from 'react'
import { StatusPicker } from './StatusPicker.jsx'
import { MemberPicker } from './MemberPicker.jsx'
import { PriorityPicker} from './PriorityPicker.jsx'


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



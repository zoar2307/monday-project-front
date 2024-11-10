// DynamicCmp.js
import React from 'react'
import { StatusPicker } from './StatusPicker.jsx'
import { MemberPicker } from './MemberPicker.jsx'
import { PriorityPicker } from './PriorityPicker.jsx'

export function DynamicCmp({ cmp, info, onUpdate }) {
    console.log(cmp);

    switch (cmp) {
        case 'StatusPicker':
            return <StatusPicker info={info} onUpdate={onUpdate} />
        case 'MemberPicker':

            return <MemberPicker info={info} onUpdate={onUpdate} />
        case 'PriorityPicker':

            return <PriorityPicker info={info} onUpdate={onUpdate} />
        default:

            return <p>UNKNOWN {cmp}</p>
    }
}

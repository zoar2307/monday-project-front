// TaskPreview.js
import React from 'react'
import { DynamicCmp } from './DynamicCmp'

export function TaskPreview({ key, task, labels, members }) {


    const cmpsOrder = ['StatusPicker', 'MemberPicker', 'PriorityPicker']
    // 'DatePicker' Add

    return (
        <>
            <td><input type="checkbox" /></td>
            <td className='task-title'>
                <span >{task.title}</span>
                <i className="fa-solid fa-comment-medical"></i>
            </td>

            {cmpsOrder.map((cmp, idx) => {
                return (
                    <td>
                        <DynamicCmp
                            cmp={cmp}
                            key={idx}
                            info={task}
                            labels = {labels}
                            members = {members}
                            onUpdate={data => {
                                console.log('Updating: ', cmp, 'with data:', data)
                                // make a copy, update the task, create an action
                                // Call action: updateTask(task, action)
                            }}
                        />
                    </td>
                )
            })}
            <td></td>

        </>


    )
}

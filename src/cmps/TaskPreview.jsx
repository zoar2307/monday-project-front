// TaskPreview.js
import React from 'react'
import { DynamicCmp } from './DynamicCmp'

export function TaskPreview({ task, labels, members }) {



    // Define the order of components to display for each task
    const cmpsOrder = ['StatusPicker', 'MemberPicker', 'DatePicker', 'PriorityPicker']

    return (
        <>
            <td><input type="checkbox" /></td>
            <td>
                <span>{task.title}</span>
                <i className="fa-solid fa-comment-medical"></i>
            </td>

            {cmpsOrder.map((cmp, idx) => {
                return (
                    <td>
                        <DynamicCmp
                            cmp={cmp}
                            key={idx}
                            info={task}
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

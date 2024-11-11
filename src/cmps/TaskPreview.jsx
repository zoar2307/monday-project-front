// TaskPreview.js
import React, { useState } from 'react'
import { DynamicCmp } from './DynamicCmp'
import { Draggable } from 'react-beautiful-dnd'
import { updateTask } from '../store/actions/task.actions'
// import { updateTask } from '../store/actions/task.actions'

export function TaskPreview({ boardId, groupId, task, labels, members, idx }) {


    const cmpsOrder = ['StatusPicker', 'MemberPicker', 'PriorityPicker']
    // 'DatePicker' Add

    return (
        <Draggable
            draggableId={task.id}
            index={idx}
            key={task.id}
        >
            {(provided, snapshot) => (
                <tr key={task.id}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <td><input type="checkbox" /></td>
                    <td className='task-title'>
                        <span {...provided.dragHandleProps}>{task.title}</span>
                        <i className="fa-solid fa-comment-medical"></i>
                    </td>

                    {cmpsOrder.map((cmp, idx) => {
                        return (
                            <td>
                                <DynamicCmp
                                    cmp={cmp}
                                    key={idx}
                                    info={task}
                                    labels={labels}
                                    members={members}
                                    onUpdate={data => {
                                        console.log('Updating: ', cmp, 'with data:', data)
                                        updateTask(boardId, groupId, task.id, data)

                                        // make a copy, update the task, create an action
                                        // Call action: updateTask(task, action)
                                    }}
                                />
                            </td>
                        )
                    })}
                    <td></td>

                </tr>
            )
            }
        </Draggable >

    )
}

// TaskPreview.js
import React, { useState } from 'react'
import { DynamicCmp } from './DynamicCmp'
import { Draggable } from 'react-beautiful-dnd'

export function TaskPreview({ task, labels, members, idx }) {
    const [isDragOn, setIsDragOn] = useState(false)

    const dragClass = isDragOn ? 'drag' : ''
    const cmpsOrder = ['StatusPicker', 'MemberPicker', 'PriorityPicker']
    // 'DatePicker' Add

    return (
        <Draggable
            draggableId={task.id}
            index={idx}
            key={task.id}
        >
            {(provided, snapshot) => (

                <div key={task.id}

                    className={`task-row ${dragClass}`}

                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >

                    <div className='check-label'><input type="checkbox" /></div>
                    <div className='task-title body'>
                        <div className='task-title-txt'>
                            <span {...provided.dragHandleProps}>{task.title}</span>
                        </div>
                        <div className='task-title-chat'>
                            <i className="fa-solid fa-comment-medical"></i>
                        </div>
                        {setIsDragOn(snapshot.isDragging)}
                    </div>

                    {cmpsOrder.map((cmp, idx) => {
                        return (
                            <div key={idx}
                                className='task-label'>
                                <DynamicCmp
                                    cmp={cmp}
                                    info={task}
                                    labels={labels}
                                    members={members}
                                    onUpdate={data => {
                                        console.log('Updating: ', cmp, 'with data:', data)
                                        // make a copy, update the task, create an action
                                        // Call action: updateTask(task, action)
                                    }}
                                />
                            </div>
                        )
                    })}

                </div>
            )
            }
        </Draggable >

    )
}

// TaskPreview.js
import React, { useState } from 'react'
import { DynamicCmp } from './DynamicCmp'
import { Draggable } from 'react-beautiful-dnd'
import { updateTask } from '../store/actions/task.actions'
import { updateGroup } from '../store/actions/group.actions'
import { loadBoard } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'

export function TaskPreview({ idx, task, group }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const { _id: boardId, labels, members } = board
    const { id: groupId } = group
    const [isDragOn, setIsDragOn] = useState(false)

    const dragClass = isDragOn ? 'drag' : ''
    const cmpsOrder = ['StatusPicker', 'MemberPicker', 'PriorityPicker']
    const [isEditTaskTitle, setIsEditTaskTitle] = useState(false)
    const [updateSelectedTask, setUpdateSelectedTask] = useState(task)
    // 'DatePicker' Add

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setUpdateSelectedTask(prevFilter => ({ ...prevFilter, title: value }))
    }

    async function saveTitle() {
        try {
            setIsEditTaskTitle(false)
            const newTasks = group.tasks.filter(groupTask => groupTask.id !== task.id)
            const updatedGroup = {
                ...group,
                tasks: [...newTasks, updateSelectedTask]
            }

            await updateGroup(boardId, updatedGroup)
            await loadBoard(boardId)
        } catch (err) {
            console.log(err)
        }
    }

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
                    <button
                        onClick={() => onRemoveGroup(group.id)}
                        className="delete-group-btn"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                    <div className='check-label'><input type="checkbox" /></div>
                    <div className='task-title body'>

                        <div className='task-title-txt'>

                            {isEditTaskTitle ?
                                <input
                                    type="text"
                                    value={updateSelectedTask.title}
                                    onChange={handleChange}
                                    onBlur={saveTitle}
                                    className="task-title-input"
                                />
                                :
                                <span
                                    className="task-title-input"
                                    onClick={() => setIsEditTaskTitle(true)}
                                >{updateSelectedTask.title}</span>
                            }
                            <div className='handle' {...provided.dragHandleProps}></div>
                        </div>
                        <div className='task-title-chat'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" aria-hidden="true" data-testid="icon"><path d="M10.4339 1.94996C11.5976 1.94797 12.7458 2.21616 13.7882 2.7334C14.8309 3.25083 15.7393 4.00335 16.4416 4.93167C17.144 5.85999 17.6211 6.93874 17.8355 8.08291C18.0498 9.22707 17.9956 10.4054 17.6769 11.525C17.3583 12.6446 16.7839 13.6749 15.9992 14.5347C15.2145 15.3945 14.2408 16.0604 13.1549 16.4797C12.069 16.8991 10.9005 17.0605 9.7416 16.9513C8.72154 16.8552 7.7334 16.5518 6.83723 16.0612L4.29494 17.2723C3.23222 17.7785 2.12271 16.6692 2.62876 15.6064L3.83948 13.0636C3.26488 12.0144 2.94833 10.8411 2.91898 9.64114C2.88622 8.30169 3.21251 6.97789 3.86399 5.8071C4.51547 4.63631 5.4684 3.66119 6.62389 2.98294C7.77902 2.30491 9.09451 1.94825 10.4339 1.94996ZM10.4339 1.94996C10.4343 1.94996 10.4348 1.94996 10.4352 1.94996L10.4341 2.69996L10.4327 1.94996C10.4331 1.94996 10.4335 1.94996 10.4339 1.94996ZM13.1214 4.07707C12.2868 3.66289 11.3673 3.44821 10.4355 3.44996L10.433 3.44996C9.36086 3.44842 8.30784 3.73382 7.38321 4.27655C6.45858 4.81929 5.69605 5.59958 5.17473 6.53645C4.65341 7.47332 4.39232 8.53263 4.41853 9.60446C4.44475 10.6763 4.75732 11.7216 5.32382 12.6318C5.45888 12.8489 5.47411 13.1197 5.36422 13.3505L4.28601 15.615L6.55002 14.5365C6.78078 14.4266 7.05164 14.4418 7.26869 14.5768C8.05992 15.0689 8.95463 15.3706 9.88231 15.458C10.81 15.5454 11.7453 15.4161 12.6145 15.0805C13.4838 14.7448 14.2631 14.2118 14.8913 13.5236C15.5194 12.8353 15.9791 12.0106 16.2342 11.1144C16.4893 10.2182 16.5327 9.27499 16.3611 8.35913C16.1895 7.44328 15.8076 6.57978 15.2454 5.8367C14.6832 5.09362 13.9561 4.49125 13.1214 4.07707Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /><path d="M11.25 6.5C11.25 6.08579 10.9142 5.75 10.5 5.75C10.0858 5.75 9.75 6.08579 9.75 6.5V8.75H7.5C7.08579 8.75 6.75 9.08579 6.75 9.5C6.75 9.91421 7.08579 10.25 7.5 10.25H9.75V12.5C9.75 12.9142 10.0858 13.25 10.5 13.25C10.9142 13.25 11.25 12.9142 11.25 12.5V10.25H13.5C13.9142 10.25 14.25 9.91421 14.25 9.5C14.25 9.08579 13.9142 8.75 13.5 8.75H11.25V6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
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
                                    onUpdate={(data) => {
                                        console.log('Updating: ', cmp, 'with data:', data)
                                        updateTask(boardId, groupId, task.id, data)

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

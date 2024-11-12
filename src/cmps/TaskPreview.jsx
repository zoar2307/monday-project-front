// TaskPreview.js
import React, { useRef, useState } from 'react'
import { DynamicCmp } from './DynamicCmp'
import { Draggable } from 'react-beautiful-dnd'
import { loadBoard, updateGroup, updateTask } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { OptionTaskModal } from './OptionTaskModal'



export function TaskPreview({ idx, task, group, board }) {
    const { labels, members } = board
    const { id: groupId } = group

    const [isDragOn, setIsDragOn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false) // State for modal visibility

    const inputRef = useRef()
    const dragClass = isDragOn ? 'drag' : ''
    const cmpsOrder = ['StatusPicker', 'MemberPicker', 'PriorityPicker']
    const [isEditTaskTitle, setIsEditTaskTitle] = useState(false)
    const [updateSelectedTask, setUpdateSelectedTask] = useState(task)


    const toggleModal = () => setIsModalOpen(!isModalOpen)

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setUpdateSelectedTask(prevFilter => ({ ...prevFilter, title: value }))
    }

    async function saveTitle(ev) {
        ev.preventDefault()
        try {
            setIsEditTaskTitle(false)
            const newTasks = group.tasks.map(groupTask => {
                if (groupTask.id === updateSelectedTask.id) return updateSelectedTask
                else return groupTask
            })
            const updatedGroup = {
                ...group,
                tasks: [...newTasks]
            }

            await updateGroup(updatedGroup)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Draggable draggableId={task.id} index={idx} key={task.id}>
            {(provided, snapshot) => (
                <div
                    className={`task-row ${dragClass}`}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <button
                        onClick={() => console.log('Delete group')}
                        className="delete-group-btn"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>

                    {/* Dots button to open modal */}
                    <button className="dots-button" onClick={toggleModal}>
                        •••
                    </button>

                    <div className='check-label'><input type="checkbox" /></div>
                    <div className='task-title body'>
                        <div className='task-title-txt'>

                            {isEditTaskTitle ?
                                <form onSubmit={saveTitle}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={updateSelectedTask.title}
                                        onChange={handleChange}
                                        onBlur={saveTitle}
                                        className="task-title-input"
                                        autoFocus
                                    />
                                </form>
                                :
                                <span
                                    className="task-title-input"
                                    onClick={() => {
                                        setIsEditTaskTitle(true)
                                        inputRef.current.focus()
                                    }}
                                >{updateSelectedTask.title}</span>
                            }
                            <div className='handle' {...provided.dragHandleProps}></div>
                        </div>
                    </div>

                    {setIsDragOn(snapshot.isDragging)}

                    {cmpsOrder.map((cmp, idx) => (
                        <div key={idx} className='task-label'>
                            <DynamicCmp
                                cmp={cmp}
                                info={task}
                                labels={labels}
                                members={members}
                                onUpdate={(data) => {
                                    console.log('Updating: ', cmp, 'with data:', data)
                                    updateTask(groupId, task.id, data)
                                }}
                            />
                        </div>
                    ))}

                    {/* Render OptionsModal when isModalOpen is true */}
                    {isModalOpen && <OptionTaskModal onClose={toggleModal} />}
                </div>
            )}
        </Draggable>
    )
}

import React, { useState } from 'react'
import { TaskPreview } from './TaskPreview'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { addLabel, addTask, removeLabel, updateLabels } from '../store/actions/board.actions'
import { LabelModal } from './LabelModal'
import { makeId } from '../services/util.service'

export function TaskList({ group }) {
  const board = useSelector(storeState => storeState.boardModule.currBoard)
  const { id: groupId, tasks } = group
  const [isDragOn, setIsDragOn] = useState(false)
  const [labelModal, setLabelModal] = useState({ type: 'add', isDisplay: false })
  const [newTask, setNewTask] = useState({ title: '' })

  console.log(labelModal)

  async function onSubmitTask(ev) {
    ev.preventDefault()
    if (newTask.title.length === 0) return
    try {
      await addTask(groupId, newTask)
      setNewTask({ title: '' })
    } catch (err) {
      console.log(err)
    }
  }

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
    setNewTask(prevFilter => ({ ...prevFilter, title: value }))
  }

  async function onDotsClick(labelId) {
    try {
      await removeLabel(labelId)
    } catch (err) {
      console.log(err)
    }
  }


  const dragClass = isDragOn ? 'drag' : ''

  return (
    <>
      <div className="task-list ">
        <div className='group-header-container'>


          <div className='group-header ' >
            <div className='check-label'
              style={{
                borderLeft: `5px solid ${group.color}`
              }}><input type="checkbox" /></div >
            <div className='task-title header'>Task</div>
            <Droppable
              droppableId={groupId + 'label'}
              direction='horizontal'
              type="labels"
            >
              {(provided, snapshot) => (
                <div
                  className={`labels`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >

                  {board.cmpsLabels.map((label, idx) => {
                    return (
                      <Draggable draggableId={label.id + groupId} index={idx} key={label.id + groupId}>
                        {(provided, snapshot) => (
                          <div key={label.id + groupId} className={`label header ${label.class} ${dragClass}`}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                          >
                            {label.title}
                            <button onClick={() => onDotsClick(label.id)} className='dots'>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" role="img" aria-hidden="true"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" /></svg>
                            </button>
                          </div>

                        )}
                      </Draggable>
                    )

                  })}
                  {provided.placeholder}

                </div>
              )}
            </Droppable>

            < div onClick={() => setLabelModal({ type: 'add', isDisplay: true })} className='add-label' >
              <svg className={`${labelModal.type === 'add' && labelModal.isDisplay && 'opened-modal'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" data-testid="icon"><g id="Icon / Basic / Add"><path id="Union" d="M10 2.25C10.4142 2.25 10.75 2.58579 10.75 3V9.25H17C17.4142 9.25 17.75 9.58579 17.75 10C17.75 10.4142 17.4142 10.75 17 10.75H10.75V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17V10.75H3C2.58579 10.75 2.25 10.4142 2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H9.25V3C9.25 2.58579 9.58579 2.25 10 2.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></g></svg>
              {labelModal.type === 'add' && labelModal.isDisplay && <LabelModal type={'add'} setLabelModal={setLabelModal} />}
            </div>
          </div  >

        </div >
        <Droppable
          droppableId={groupId}
          direction='vertical'
          type="task"
        >
          {(provided, snapshot) => (
            <div
              className='group-body'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, idx) => {


                return <TaskPreview key={task.id} task={task} idx={idx} group={group} board={board} />

              })}
              {provided.placeholder}
              <div className='add-task task-row '>
                <div className='check-label '
                  style={{
                    borderLeft: `5px solid ${group.color}`
                  }}
                ><input type="checkbox" disabled /></div >
                <div className='task-title '>
                  <form onSubmit={onSubmitTask} className='task-title'>
                    <input className='add-task-input' type="text" placeholder='+ Add task' onBlur={onSubmitTask} onChange={handleChange} value={newTask.title} />
                  </form>
                </div>
              </div>



            </div>
          )}
        </Droppable>
      </div >
    </>
  )
}
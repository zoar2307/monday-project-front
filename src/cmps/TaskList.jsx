import React, { useEffect, useState } from 'react'
import { TaskPreview } from './TaskPreview'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { addTaskToGroup } from '../store/actions/group.actions'
import { addTask } from '../store/actions/task.actions'

export function TaskList({ group, tasks, labels, members, boardId, groupId }) {
  const boards = useSelector((state) => state.boardModule.boards)
  const [boardArr, setBoardArr] = useState(boards.filter(board => board._id === boardId))
  const [newTask, setNewTask] = useState({ title: '' })

  useEffect(() => {
    setBoardArr(boards.filter(board => board._id === boardId))
  }, [boards])

  function onSubmitTask(ev) {
    ev.preventDefault()
    if (newTask.title.length === 0) return
    addTask(boardId, groupId, newTask)
    setNewTask({ title: '' })
  }

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
    setNewTask(prevFilter => ({ ...prevFilter, title: value }))
  }


  return (
    <>
      <div className="task-list "
        style={{
          borderColor: group.color
        }}
      >
        <div className='group-header-container'>

          {boardArr.map((board, idx) => (
            <div className='group-header ' key={idx}>
              <div className='check-label'><input type="checkbox" /></div >
              <div className='task-title header'>Task</div>
              {board.cmpsOrder?.includes('StatusPicker') && <div className='status label header'>Status</div>}
              {board.cmpsOrder?.includes('MemberPicker') && <div className='members label header'>Person</div>}
              {/* {board.cmpsOrder?.includes('DatePicker') && <div className='label date'>Date</div>} ADD LATER*/}
              {board.cmpsOrder?.includes('PriorityPicker') && <div className='label priority'>Priority</div>}
              <div className='add-label'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="icon_e7210c37bd noFocusStyle_26dd7872ca" data-testid="icon"><g id="Icon / Basic / Add"><path id="Union" d="M10 2.25C10.4142 2.25 10.75 2.58579 10.75 3V9.25H17C17.4142 9.25 17.75 9.58579 17.75 10C17.75 10.4142 17.4142 10.75 17 10.75H10.75V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17V10.75H3C2.58579 10.75 2.25 10.4142 2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H9.25V3C9.25 2.58579 9.58579 2.25 10 2.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></g></svg></div>
            </div  >
          ))}
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
                // <Draggable
                //   draggableId={task.id}
                //   index={idx}
                //   key={task.id}
                // >


                return <TaskPreview group={group} groupId={groupId} boardId={boardId} key={task.id} task={task} labels={labels} members={members} idx={idx} />

                // </tr>
                //     )}
                // </Draggable>
              })}
              {provided.placeholder}
              <div className='add-task task-row '>
                <div className='check-label '><input type="checkbox" disabled /></div >
                <div className='task-title '>
                  <form onSubmit={onSubmitTask}>
                    <input type="text" placeholder='+ Add task' onBlur={onSubmitTask} onChange={handleChange} value={newTask.title} />
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
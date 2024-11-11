import React, { useEffect, useState } from 'react';
import { TaskPreview } from './TaskPreview';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { addTaskToGroup } from '../store/actions/group.actions';
import { addTask } from '../store/actions/task.actions';

export function TaskList({ group, tasks, labels, members, boardId, groupId }) {
  const boards = useSelector((state) => state.boardModule.boards)
  const [boardArr, setBoardArr] = useState(boards.filter(board => board._id === boardId))
  const [newTask, setNewTask] = useState({ title: '' })

  useEffect(() => {
    console.log(newTask)
  }, [newTask])

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
      <div className="task-list"
        style={{
          borderColor: group.color
        }}
      >
        <div className='group-header-container'>

          {boardArr.map((board, idx) => (
            <div className='group-header ' key={idx}>
              <div className='check-label'><input type="checkbox" /></div >
              <div className='task-title header'>Task</div>
              {board.cmpsOrder?.includes('StatusPicker') && <div className='label status'>Status</div>}
              {board.cmpsOrder?.includes('MemberPicker') && <div className='label members'>Person</div>}
              {/* {board.cmpsOrder?.includes('DatePicker') && <div className='label date'>Date</div>} ADD LATER*/}
              {board.cmpsOrder?.includes('PriorityPicker') && <div className='label priority'>Priority</div>}
              <div className='add-label'>+</div>
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


                return <TaskPreview key={task.id} task={task} labels={labels} members={members} idx={idx} />

                // </tr>
                //     )}
                // </Draggable>
              })}
              {provided.placeholder}
              <div className='add-task task-row '>
                <div className='check-label '><input type="checkbox" disabled /></div >
                <div className='task-title '>
                  <form onSubmit={onSubmitTask}>
                    <input type="text" placeholder='+ Add item' onBlur={onSubmitTask} onChange={handleChange} value={newTask.title} />
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

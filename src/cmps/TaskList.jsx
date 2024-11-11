// TaskList.js
import React, { useEffect, useState } from 'react';
import { TaskPreview } from './TaskPreview';
import { store } from '../store/store';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export function TaskList({ tasks, labels, members, boardId, groupId }) {
  const { boards } = store.getState().boardModule
  const boardArr = boards.filter(board => board._id === boardId)

  const [isTaskDragging, setIsTaskDragging] = useState(false)

  useEffect(() => {
    console.log(isTaskDragging)
  }, [isTaskDragging])

  const dargClass = isTaskDragging ? 'drag' : ''

  return (
    <>
      <table className="task-list">
        <thead>

          {boardArr.map((board, idx) => (
            <tr key={idx}>
              <th><input type="checkbox" /></th>
              <th>Task</th>
              {board.cmpsOrder.includes('StatusPicker') && <th>Status</th>}
              {board.cmpsOrder.includes('MemberPicker') && <th>Person</th>}
              {board.cmpsOrder.includes('DatePicker') && <th>Date</th>}
              {board.cmpsOrder.includes('PriorityPicker') && <th>Priority</th>}
              <th>+</th>
            </tr>
          ))}
        </thead>
        <Droppable
          droppableId={groupId}
          direction='vertical'
          type="task"
        >
          {(provided) => (
            <tbody
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, idx) => (
                <Draggable
                  draggableId={task.id}
                  index={idx}
                  key={task.id}
                >
                  {(provided, snapshot) => (
                    <tr key={task.id}
                      className={dargClass}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}>

                      <TaskPreview key={task.id} task={task} labels={labels} members={members} />

                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </>
  );
}

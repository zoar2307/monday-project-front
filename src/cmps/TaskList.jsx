import React, { useEffect, useState } from 'react';
import { TaskPreview } from './TaskPreview';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { loadTasks } from '../store/actions/task.actions';

export function TaskList({ tasks, labels, members, boardId, groupId }) {
  const boards = useSelector((state) => state.boardModule.boards)
  // const tasks = useSelector((state) => state.taskModule.tasks)
  const [boardArr, setBoardArr] = useState(boards.filter(board => board._id === boardId))

  useEffect(() => {

    try {
      loadTasks(boardId, groupId)
      setBoardArr(boards.filter(board => board._id === boardId))
    } catch (error) {

    }

  }, [boards])

  return (
    <>
      <table className="task-list">
        <thead>

          {boardArr.map((board, idx) => (
            <tr key={idx}>
              <th><input type="checkbox" /></th>
              <th>Task</th>
              {board.cmpsOrder?.includes('StatusPicker') && <th>Status</th>}
              {board.cmpsOrder?.includes('MemberPicker') && <th>Person</th>}
              {/* {board.cmpsOrder?.includes('DatePicker') && <th>Date</th>} ADD LATER*/}
              {board.cmpsOrder?.includes('PriorityPicker') && <th>Priority</th>}
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
                // <Draggable
                //   draggableId={task.id}
                //   index={idx}
                //   key={task.id}
                // >


                <TaskPreview boardId={boardId} groupId={groupId} key={task.id} task={task} labels={labels} members={members} idx={idx} />

                // </tr>
                //     )}
                // </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table >
    </>
  )
}

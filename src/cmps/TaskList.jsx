// TaskList.js
import React from 'react';
import { TaskPreview } from './TaskPreview';
import { store } from '../store/store';

export function TaskList({ tasks, labels, members, boardId, groupId }) {
  const { boards } = store.getState().boardModule
  const boardArr = boards.filter(board => board._id === boardId)

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
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>

              <TaskPreview key={task.id} task={task} labels={labels} members={members} />

            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

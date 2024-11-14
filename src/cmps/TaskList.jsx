import React, { useEffect, useRef, useState } from 'react'
import { TaskPreview } from './TaskPreview'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { addTask, removeLabel } from '../store/actions/board.actions'
import { LabelModal } from './LabelModal'

export function TaskList({ group }) {
  const board = useSelector(storeState => storeState.boardModule.currBoard)
  const { id: groupId, tasks } = group



  return (
    <>
      <div className="task-list ">

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




            </div>
          )}
        </Droppable>
      </div >
    </>
  )
}
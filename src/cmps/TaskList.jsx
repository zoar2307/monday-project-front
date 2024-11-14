import React, { useEffect, useRef, useState } from 'react'
import { TaskPreview } from './TaskPreview'
import { useSelector } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'

export function TaskList({ group }) {
  const board = useSelector(storeState => storeState.boardModule.currBoard)
  const { id: groupId, tasks } = group

  const [isDragOver, setIsDragOver] = useState(false)

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
              className={`group-body ${isDragOver && 'drag-over'}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                '--background': group.color
              }}
            >
              {tasks.map((task, idx) => {


                return <TaskPreview key={task.id} task={task} idx={idx} group={group} board={board} />

              })}
              {setIsDragOver(snapshot.isDraggingOver)}
              {provided.placeholder}




            </div>
          )}
        </Droppable>
      </div >
    </>
  )
}
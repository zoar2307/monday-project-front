import { useEffect } from "react"
import { useSelector } from "react-redux"
import { GroupPreview } from "../cmps/GroupPreview"
import {
  addGroup,
  removeGroup,
  loadGroups,
} from "../store/actions/group.actions"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { SET_GROUPS } from "../store/reducers/group.reducer"

export function GroupList({ boardId, members, labels }) {
  const groups = useSelector((state) => state.groupModule.groups)

  const dispatch = useDispatch()

  useEffect(() => {
    loadGroups(boardId)
  }, [boardId])

  const handleAddGroup = () => addGroup(boardId)
  const handleRemoveGroup = (groupId) => removeGroup(boardId, groupId)

  if (!groups || !groups.length) return null

  function handleDragEnd(result) {
    const { destination, source, draggableId, type } = result
    console.log('end')
    console.log(`result:`, result)
    // user drop outside
    if (!destination) return

    // // user drop in the same pos
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'column') {
      const newGroupOrder = Array.from(groups)
      newGroupOrder.splice(source.index, 1)
      const movedGroup = groups.filter(group => group.id === draggableId)[0]
      newGroupOrder.splice(destination.index, 0, movedGroup)
      console.log(newGroupOrder)

      dispatch({ type: SET_GROUPS, groups: newGroupOrder })
      return
    }

    // const start = state.columns[source.droppableId]
    // const finish = state.columns[destination.droppableId]

    // // start column and finish column are the same
    // if (start === finish) {
    //   const newTaskIds = Array.from(start.taskIds)

    //   newTaskIds.splice(source.index, 1)
    //   newTaskIds.splice(destination.index, 0, draggableId)

    //   const newColumn = {
    //     ...start,
    //     taskIds: newTaskIds
    //   }

    //   const newState = {
    //     ...state,
    //     columns: {
    //       ...state.columns,
    //       [newColumn.id]: newColumn
    //     },

    //   }

    //   setState(newState)
    //   return
    // }

    // // Moving from one list to another
    // const startTaskIds = Array.from(start.taskIds)
    // startTaskIds.splice(source.index, 1)
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds
    // }

    // const finishTaskIds = Array.from(finish.taskIds)
    // finishTaskIds.splice(destination.index, 0, draggableId)
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds
    // }

    // const newState = {
    //   ...state,
    //   columns: {
    //     ...state.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   }
    // }
    // setState(newState)

  }

  return (
    <>
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <div className="group-list">
          <Droppable droppableId={boardId} direction="vertical" type="column" >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {groups.map((group, index) => (
                  <div key={group.id} className="group-list-item">
                    <GroupPreview
                      group={group}
                      members={members}
                      boardId={boardId}
                      labels={labels}
                      index={index}
                      onRemoveGroup={() => handleRemoveGroup(group.id)}
                    />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
            {/* {groups.map((group) => (
              <div key={group.id} className="group-list-item">
                <GroupPreview
                  group={group}
                  members={members}
                  boardId={boardId}
                  labels={labels}
                  onRemoveGroup={() => handleRemoveGroup(group.id)}
                />
              </div>
            ))} */}
          </Droppable>
          <button onClick={handleAddGroup} className="add-group-btn">
            Add Group
          </button>
        </div>
      </DragDropContext>
    </>
  )
}

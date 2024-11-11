import { useEffect } from "react"
import { useSelector } from "react-redux"
import { GroupPreview } from "../cmps/GroupPreview"
import {
  addGroup,
  removeGroup,
  loadGroups,
  updateGroup,
} from "../store/actions/group.actions"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { SET_GROUPS, UPDATE_GROUP } from "../store/reducers/group.reducer"
import { saveBoard } from "../store/actions/board.actions"
import { store } from "../store/store"

export function GroupList({ boardId, members, labels }) {
  const groups = useSelector((state) => state.groupModule.groups)
  const { boards } = store.getState().boardModule


  const dispatch = useDispatch()

  useEffect(() => {
    loadGroups(boardId)
  }, [boardId])

  const handleAddGroup = () => addGroup(boardId)
  const handleRemoveGroup = (groupId) => removeGroup(boardId, groupId)

  if (!groups || !groups.length) return null

  function handleDragEnd(result) {
    const { destination, source, draggableId, type } = result
    const board = boards.filter(board => board._id === boardId)[0]
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'column') {
      const newGroupOrder = Array.from(groups)
      newGroupOrder.splice(source.index, 1)
      const movedGroup = groups.filter(group => group.id === draggableId)[0]
      newGroupOrder.splice(destination.index, 0, movedGroup)

      const newBoard = {
        ...board,
        groups: newGroupOrder
      }
      saveBoard(newBoard)
      dispatch({ type: SET_GROUPS, groups: newGroupOrder })
      return
    }

    const start = groups.filter(group => group.id === source.droppableId)[0]
    const finish = groups.filter(group => group.id === destination.droppableId)[0]

    // // start column and finish column are the same
    if (start === finish) {

      const newTasks = Array.from(start.tasks)

      const draggedTask = newTasks.filter(task => task.id === draggableId)[0]

      newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, draggedTask)

      const newGroup = {
        ...start,
        tasks: newTasks
      }

      dispatch({ type: UPDATE_GROUP, group: newGroup })
      updateGroup(boardId, newGroup)
      return
    }

    // // Moving from one list to another
    const startTasks = Array.from(start.tasks)
    const draggedTask = startTasks.filter(task => task.id === draggableId)[0]
    startTasks.splice(source.index, 1)

    const newStart = {
      ...start,
      tasks: startTasks
    }
    dispatch({ type: UPDATE_GROUP, group: newStart })

    const finishTasks = Array.from(finish.tasks)
    finishTasks.splice(destination.index, 0, draggedTask)

    const newFinish = {
      ...finish,
      tasks: finishTasks
    }

    dispatch({ type: UPDATE_GROUP, group: newFinish })
    updateGroup(boardId, newStart)
    updateGroup(boardId, newFinish)
  }

  return (
    <>
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <div className="group-list">
          <Droppable droppableId={boardId} direction="vertical" type="column" >
            {(provided) => (
              <div className="fff"
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

          </Droppable>
          <button onClick={handleAddGroup} className="add-group-btn flex align-center">
            <i className="fa-solid fa-plus"></i>
            Add new group
          </button>
        </div>
      </DragDropContext>
    </>
  )
}

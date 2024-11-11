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
import { loadBoard, saveBoard } from "../store/actions/board.actions"
import { store } from "../store/store"

export function GroupList() {
  const board = useSelector(storeState => storeState.boardModule.currBoard)
  const { groups, _id: boardId } = board

  const dispatch = useDispatch()

  useEffect(() => {
    loadGroups(boardId)
  }, [boardId])

  const handleAddGroup = async () => {
    try {
      await addGroup(boardId)
      await loadBoard(boardId)
    } catch (err) {
      console.log(err)
    }
  }
  const handleRemoveGroup = (groupId) => removeGroup(boardId, groupId)

  if (!groups || !groups.length) return null

  async function handleDragEnd(result) {
    const { destination, source, draggableId, type } = result
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
      try {
        // dispatch({ type: SET_GROUPS, groups: newGroupOrder })
        await saveBoard(newBoard)
        await loadBoard(boardId)
      } catch (err) {
        console.log(err)
      }

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


      try {
        await updateGroup(boardId, newGroup)
        dispatch({ type: UPDATE_GROUP, group: newGroup })
        await loadBoard(boardId)

      } catch (err) {
        console.log(err)
      }



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
    // dispatch({ type: UPDATE_GROUP, group: newStart })

    const finishTasks = Array.from(finish.tasks)
    finishTasks.splice(destination.index, 0, draggedTask)

    const newFinish = {
      ...finish,
      tasks: finishTasks
    }

    // dispatch({ type: UPDATE_GROUP, group: newFinish })
    try {
      await updateGroup(boardId, newStart)
      await updateGroup(boardId, newFinish)
      await loadBoard(boardId)

    } catch (err) {
      console.log(err)
    }
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

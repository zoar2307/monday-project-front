import { GroupPreview } from "../cmps/GroupPreview"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { addGroup, loadBoard, removeGroup, saveBoard, updateGroup, updateGroups, updateLabels } from "../store/actions/board.actions"
import { useEffect } from "react"
import { logout } from "../store/actions/user.actions"
import { SOCKET_EVENT_BOARD_UPDATE, socketService } from "../services/socket.service"
import { useDispatch } from "react-redux"
import { SET_BOARD } from "../store/reducers/board.reducer"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function GroupList({ board }) {
  const { _id: boardId, groups } = board
  const dispatch = useDispatch()

  const handleAddGroup = async () => {
    try {
      await addGroup(boardId)
      showSuccessMsg('Group added successfully')
    } catch (err) {
      // console.log(err)
      showErrorMsg('Can\'t add group try again later')
    }
  }
  const handleRemoveGroup = (groupId) => removeGroup(boardId, groupId)

  if (!groups || !groups.length) return null

  async function handleDragEnd(result) {
    const { destination, source, draggableId, type } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'labels') {
      const newLabelsOrder = [...board.cmpsLabels]
      newLabelsOrder.splice(source.index, 1)
      const movedLabel = board.cmpsLabels.find(label => draggableId.includes(label.id))
      newLabelsOrder.splice(destination.index, 0, movedLabel)


      try {
        await updateLabels(newLabelsOrder)
        showSuccessMsg('Label updated successfully')
      } catch (err) {
        // console.log(err)
        showErrorMsg('Failed update label , try again')
      }

      return
    }

    if (type === 'groups') {

      const newGroupOrder = [...groups]
      newGroupOrder.splice(source.index, 1)
      const movedGroup = groups.find(group => group.id === draggableId)
      newGroupOrder.splice(destination.index, 0, movedGroup)

      try {
        await updateGroups(newGroupOrder)
        showSuccessMsg('Group updated successfully')

      } catch (err) {
        // console.log(err)
        showErrorMsg('Failed update group , try again')

      }

      return
    }

    const start = groups.find(group => group.id === source.droppableId)
    const finish = groups.find(group => group.id === destination.droppableId)

    // // start column and finish column are the same
    if (start === finish) {

      const newTasks = [...start.tasks]

      const draggedTask = newTasks.find(task => task.id === draggableId)

      newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, draggedTask)

      const newGroup = {
        ...start,
        tasks: newTasks
      }

      try {
        await updateGroup(newGroup)
        showSuccessMsg('Group updated successfully')

      } catch (err) {
        // console.log(err)
        showErrorMsg('Failed update group , try again')

      }
      return
    }

    // // Moving from one list to another
    const startTasks = [...start.tasks]
    const draggedTask = startTasks.find(task => task.id === draggableId)
    startTasks.splice(source.index, 1)

    const newStart = {
      ...start,
      tasks: startTasks
    }

    const finishTasks = [...finish.tasks]
    finishTasks.splice(destination.index, 0, draggedTask)

    const newFinish = {
      ...finish,
      tasks: finishTasks
    }

    try {
      updateGroup(newFinish)
      updateGroup(newStart)
      showSuccessMsg('Groups updated successfully')

    } catch (err) {
      // console.log(err)
      showErrorMsg('Failed update groups , try again')

    }
  }

  return (
    <>
      <DragDropContext
        onDragEnd={handleDragEnd}
      >

        <div className="group-list">
          <Droppable droppableId={boardId} direction="vertical" type="groups" >
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
                      groupsLength={groups.length}
                    />
                  </div>
                ))}
                {groups.length === 0 &&
                  < div className="not-found">
                    <img class="search-empty-state-component__image" src="https://cdn.monday.com/images/search_empty_state.svg"></img>
                    <h2>No results found</h2>
                  </div>
                }
                {provided.placeholder}
              </div>
            )}

          </Droppable>

          <div className="btn-container">

            <button onClick={handleAddGroup} className="add-group-btn flex align-center">
              <i className="fa-solid fa-plus"></i>
              Add new group
            </button>
          </div>
        </div >
      </DragDropContext >
    </>
  )
}

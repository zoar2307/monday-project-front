import { GroupPreview } from "../cmps/GroupPreview"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { addGroup, loadBoard, removeGroup, saveBoard, updateGroup, updateGroups, updateLabels } from "../store/actions/board.actions"

export function GroupList({ board }) {
  const { _id: boardId, groups } = board

  const handleAddGroup = async () => {
    try {
      await addGroup(boardId)
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

    if (type === 'labels') {
      console.log(source)
      console.log(destination)
      const newLabelsOrder = [...board.cmpsLabels]
      console.log(newLabelsOrder)
      newLabelsOrder.splice(source.index, 1)
      const movedLabel = board.cmpsLabels.find(label => draggableId.includes(label.id))
      newLabelsOrder.splice(destination.index, 0, movedLabel)


      try {
        await updateLabels(newLabelsOrder)
      } catch (err) {
        console.log(err)
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
      } catch (err) {
        console.log(err)
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
      } catch (err) {
        console.log(err)
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
        </div>
      </DragDropContext>
    </>
  )
}

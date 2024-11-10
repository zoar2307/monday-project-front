import { useState } from "react"
import { TaskList } from "../cmps/TaskList"
import { updateGroup, addTaskToGroup } from "../store/actions/group.actions"
import { Draggable } from "react-beautiful-dnd"

export function GroupPreview({
  group,
  members,
  labels,
  boardId,
  onRemoveGroup,
  index
}) {
  const [groupTitle, setGroupTitle] = useState(group.title)
  const [tasks, setTasks] = useState(group.tasks)

  const priorities = labels.filter((label) =>
    ["High", "Medium", "Low"].includes(label.title)
  )

  const handleTitleChange = (e) => setGroupTitle(e.target.value)

  const saveTitle = () => {
    const updatedGroup = { ...group, title: groupTitle }
    updateGroup(boardId, updatedGroup)
  }

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask])
    addTaskToGroup(boardId, group.id, newTask)
  }

  return (
    <>
      <Draggable
        draggableId={group.id}
        index={index}
      >
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="group-preview">
              <header
                className="flex align-center"
                {...provided.dragHandleProps}
              >
                <p style={{ color: group.color }}>
                  <i className="fa-solid fa-chevron-down"></i>
                </p>
                <input
                  type="text"
                  value={groupTitle}
                  onChange={handleTitleChange}
                  onBlur={saveTitle}
                  style={{ color: group.color }}
                  className="group-title-input"
                />
                <button
                  onClick={() => onRemoveGroup(group.id)}
                  className="delete-group-btn"
                >
                  Delete Group
                </button>
              </header>
              <main className="flex">
                <div
                  className="side-group-color"
                  style={{ backgroundColor: group.color }}
                ></div>
                <TaskList
                  tasks={tasks}
                  members={members}
                  labels={labels}
                  boardId={boardId}
                  groupId={group.id}
                  priorities={priorities}
                  onAddTask={handleAddTask}
                />
              </main>
            </div>
          </div>
        )}

      </Draggable>
    </>
  )
}

import { useState } from "react"
import { TaskList } from "../cmps/TaskList"
import { updateGroup, addTaskToGroup } from "../store/actions/group.actions"

export function GroupPreview({
  group,
  members,
  labels,
  boardId,
  onRemoveGroup,
}) {
  const [groupTitle, setGroupTitle] = useState(group.title)
  const [tasks, setTasks] = useState(group.tasks)

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
    <div className="group-preview">
      <header className="flex align-center">
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
          onAddTask={handleAddTask}
        />
      </main>
    </div>
  )
}

import { useEffect, useState } from "react"
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
  const [isEditGroupTitle, setIsEditGroupTitle] = useState(false)

  useEffect(() => {
    setTasks(group.tasks)
  }, [group])

  const handleTitleChange = (e) => setGroupTitle(e.target.value)

  const saveTitle = () => {
    const updatedGroup = { ...group, title: groupTitle }
    updateGroup(boardId, updatedGroup)
    setIsEditGroupTitle(false)
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
        key={group.id}
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
                <button
                  onClick={() => onRemoveGroup(group.id)}
                  className="delete-group-btn"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
                <p style={{
                  color: group.color,

                }}>
                  <i className="fa-solid fa-chevron-down"></i>
                </p>

                {isEditGroupTitle ?
                  <input
                    type="text"
                    value={groupTitle}
                    onChange={handleTitleChange}
                    onBlur={saveTitle}
                    style={{
                      color: group.color,
                      width: '500px',
                      maxWidth: '500px',
                    }}
                    className="group-title"
                  />

                  :
                  <h4
                    className="group-title"
                    onClick={() => setIsEditGroupTitle(true)}
                    style={{ color: group.color, borderColor: group.color }}
                  >{groupTitle}</h4>
                }


                {tasks.length === 1 && <span className="tasks-count">{tasks.length} Task</span>}
                {tasks.length > 1 && <span className="tasks-count">{tasks.length} Tasks</span>}
                {tasks.length === 0 && <span className="tasks-count">No tasks</span>}

              </header>
              <main className="flex">
                {/* <div
                  className="side-group-color"
                  }
                ></div> */}
                <TaskList
                  tasks={tasks}
                  members={members}
                  labels={labels}
                  boardId={boardId}
                  groupId={group.id}
                  onAddTask={handleAddTask}
                  group={group}
                />
              </main>
            </div>
          </div>
        )}

      </Draggable >
    </>
  )
}

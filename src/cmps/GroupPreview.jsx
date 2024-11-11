import { useState } from "react"
import { TaskList } from "../cmps/TaskList"
import { updateGroup } from "../store/actions/group.actions"
import { Draggable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { loadBoard } from "../store/actions/board.actions"

export function GroupPreview({
  group,
  onRemoveGroup,
  index
}) {
  const board = useSelector(storeState => storeState.boardModule.currBoard)
  const { _id: boardId } = board
  const { title, tasks } = group


  const [groupTitle, setGroupTitle] = useState(title)
  const [isEditGroupTitle, setIsEditGroupTitle] = useState(false)

  const handleTitleChange = (e) => setGroupTitle(e.target.value)

  const saveTitle = async () => {
    try {
      const updatedGroup = { ...group, title: groupTitle }
      await updateGroup(boardId, updatedGroup)
      await loadBoard(boardId)
      setIsEditGroupTitle(false)
    } catch (err) {
      console.log(err)
    }
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
                <p
                  style={{
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

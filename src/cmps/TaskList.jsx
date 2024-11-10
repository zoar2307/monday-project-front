import { useState, useEffect, useRef } from "react"
import { makeId } from "../services/util.service"
import { updateTaskStatus, addTask, updateTaskPriority, updateTaskMember } from "../store/actions/task.actions"

export function TaskList({ tasks, labels, members, boardId, groupId }) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [selectedTask, setSelectedTask] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [localTasks, setLocalTasks] = useState(tasks)
  const modalRef = useRef(null)

  const statusLabels = labels.filter((label) => label.type === "status")
  const priorityLabels = labels.filter((label) => label.type === "priority")

  const getLabelColor = (type, value) => {
    const label = labels.find((label) => label.type === type && label.title === value)
    return label ? label.color : "#ddd"
  }

  const getImgById = (id) => members.find((member) => member._id === id)?.imgUrl

  const handleNewTaskBlur = async () => {
    const newTask = {
      id: makeId(),
      title: newTaskTitle,
      assignedTo: null,
      status: "No Status",
      priority: "Low",
    }
    setLocalTasks([...localTasks, newTask])
    await addTask(boardId, groupId, newTask)
    setNewTaskTitle("")
  }

  const openModal = (task, type, event) => {
    setSelectedTask(task)
    setModalType(type)
    const targetRect = event.target.getBoundingClientRect()
    setModalPosition({
      top: targetRect.bottom + window.scrollY,
      left: targetRect.left + targetRect.width / 2 + window.scrollX,
    })
  }

  const handleModalChange = (value) => {
    if (!selectedTask) return
    let updatedTasks

    switch (modalType) {
      case "status":
        updatedTasks = localTasks.map((task) =>
          task.id === selectedTask.id ? { ...task, status: value } : task
        )
        setLocalTasks(updatedTasks)
        updateTaskStatus(boardId, groupId, selectedTask.id, value)
        break
      case "priority":
        updatedTasks = localTasks.map((task) =>
          task.id === selectedTask.id ? { ...task, priority: value } : task
        )
        setLocalTasks(updatedTasks)
        updateTaskPriority(boardId, groupId, selectedTask.id, value)
        break
      case "member":
        updatedTasks = localTasks.map((task) =>
          task.id === selectedTask.id ? { ...task, assignedTo: value } : task
        )
        setLocalTasks(updatedTasks)
        updateTaskMember(boardId, groupId, selectedTask.id, value)
        break
      default:
        return
    }
    closeModal()
  }

  const closeModal = () => {
    setSelectedTask(null)
    setModalType(null)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }
    if (modalType) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [modalType])


  const renderTaskLabel = (labelType, value, onClick) => (
    <div
      className="task-label"
      style={{ backgroundColor: getLabelColor(labelType, value) }}
      onClick={onClick}
    >
      {value}
    </div>
  )


  return (
    <>
      <table className="task-list">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Task</th>
            <th>Person</th>
            <th>Status</th>
            <th>Priority</th>
            <th>+</th>
          </tr>
        </thead>
        <tbody>
          {localTasks.map((task) => (
            <tr key={task.id}>
              <td><input type="checkbox" /></td>
              <td className="task-item">
                <div className="task-content flex align-center justify-between">
                  <span>{task.title}</span>
                  <i className="fa-solid fa-comment-medical"></i>
                </div>
              </td>
              <td onClick={(e) => openModal(task, "member", e)}>
                <div className="task-person">
                  {task.assignedTo?._id ? (
                    <img src={getImgById(task.assignedTo._id)} alt="Assigned" />
                  ) : (
                    <span>Unassigned</span>
                  )}
                </div>
              </td>
              <td onClick={(e) => openModal(task, "status", e)}>
                {renderTaskLabel("status", task.status)}
              </td>
              <td onClick={(e) => openModal(task, "priority", e)}>
                {renderTaskLabel("priority", task.priority)}
              </td>
              <td></td>
            </tr>
          ))}
          <tr>
            <td><input className="checkbox-last" type="checkbox" /></td>
            <td colSpan="6">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onBlur={handleNewTaskBlur}
                placeholder="+ Add task"
                className="new-task-input"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {modalType && (
        <div
          ref={modalRef}
          className={`task-modal ${modalType === "member" ? "member-modal" : ""}`}
          style={{
            top: modalPosition.top,
            left: modalPosition.left,
          }}
        >
          <ul>
            {(modalType === "status" ? statusLabels : modalType === "priority" ? priorityLabels : members).map((item) => (
              <li
                key={item.title || item._id}
                onClick={() => handleModalChange(item.title || item)}
                style={{
                  backgroundColor:
                    modalType === "member"
                      ? "transparent"
                      : getLabelColor(modalType, item.title),
                }}
              >
                {modalType === "member" && item.imgUrl ? (
                  <div className="member-option">
                    <img src={item.imgUrl} alt={item.fullname} className="member-option" />
                  </div>
                ) : (
                  item.title
                )}
              </li>
            ))}
          </ul>
        </div>

      )}
    </>
  )
}

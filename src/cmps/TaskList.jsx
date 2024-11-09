import { useState } from "react"
import { makeId } from "../services/util.service"

export function TaskList({ tasks, labels, members, onAddTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const getStatusColor = (status) => {
    const label = labels.find((label) => label.title === status)
    return label ? label.color : "#ddd"
  }

  const getAssignedMemberImage = (assignedToId) => {
    const member = members.find((member) => member._id === assignedToId)
    return member?.imgUrl
  }

  const handleNewTaskBlur = () => {
    const newTask = {
      id: makeId(),
      title: newTaskTitle,
      assignedTo: null,
      status: "No Status",
    }
    onAddTask(newTask)
    setNewTaskTitle("")
  }

  return (
    <table className="task-list">
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Item</th>
          <th>Person</th>
          <th>Status</th>
          <th>+</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td className="task-item">
              <div className="task-content flex align-center justify-between">
                <span>{task.title}</span>
                <i className="fa-solid fa-comment-medical"></i>
              </div>
            </td>
            <td>
              <div className="task-person">
                {task.assignedTo?._id ? (
                  <img
                    src={getAssignedMemberImage(task.assignedTo._id)}
                    alt={task.assignedTo.fullname || "User Image"}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>Unassigned</span>
                )}
              </div>
            </td>
            <td>
              <div
                className="task-status"
                style={{
                  backgroundColor: getStatusColor(task.status),
                  color: "#fff",
                  padding: "5px",
                  width: "100%",
                  borderRadius: "4px",
                }}
              >
                {task.status || "No Status"}
              </div>
            </td>
            <td></td>
          </tr>
        ))}
        <tr>
          <td colSpan="5">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onBlur={handleNewTaskBlur}
              placeholder="Add a new task..."
              className="new-task-input"
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

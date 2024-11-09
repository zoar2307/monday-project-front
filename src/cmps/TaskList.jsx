import { TaskPreview } from "../cmps/TaskPreview";

export function TaskList({ tasks, labels, groupColor }) {
  const getStatusColor = (status) => {
    const label = labels.find((label) => label.title === status);
    return label ? label.color : "#ddd";
  };

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
                {task.assignedTo?.fullname || "Unassigned"}
              </div>
            </td>
            <td>
              <div
                className="task-status"
                style={{
                  backgroundColor: getStatusColor(task.status),
                  color: "#fff",
                  padding: "5px",
                  width : "100%",
                  borderRadius: "4px",
                }}
              >
                {task.status || "No Status"}
              </div>
            </td>
            <td>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import { TaskPreview } from "../cmps/TaskPreview"

export function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <TaskPreview task={task} />
        </div>
      ))}
    </div>
  )
}

import { TaskList } from "../cmps/TaskList"

export function GroupPreview({ group }) {
  return (
    <div className="group-preview">
      <h3>{group.title}</h3>
      <TaskList tasks={group.tasks} />
    </div>
  )
}

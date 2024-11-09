import { TaskList } from "../cmps/TaskList"

export function GroupPreview({ group }) {
  return (
    <div className="group-preview">
      <h4>{group.title}</h4>
      <TaskList tasks={group.tasks} />
    </div>
  )
}

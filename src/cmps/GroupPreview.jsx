import { TaskList } from "../cmps/TaskList"

export function GroupPreview({ group , labels}) {
  console.log('labels :', labels)
  return (
    <div className="group-preview">
    <header className="flex align-center">
      <p style={{ color: group.color }}><i className="fa-solid fa-chevron-down"></i></p>
      <h2 style={{ color: group.color }}>{group.title}</h2>
    </header>
    <main className="flex">
      <div className="side-group-color" style={{ backgroundColor: group.color }}></div>
      <TaskList tasks={group.tasks} groupColor = {group.color}  labels={labels} />
    </main>
    </div>
  )
}

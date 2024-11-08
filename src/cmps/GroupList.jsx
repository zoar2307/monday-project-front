import { GroupPreview } from "../cmps/GroupPreview"

export function GroupList({ groups }) {
  return (
    <>
      {groups.map((group) => (
        <div key={group.id} className="group-list">
          <GroupPreview group={group} />
        </div>
      ))}
    </>
  )
}

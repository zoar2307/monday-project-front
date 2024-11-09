import { GroupPreview } from "../cmps/GroupPreview";

export function GroupList({ groups , members , labels }) {
  console.log('labels :', labels)

  if (!groups || !groups.length) return null; // Render nothing if groups is undefined or empty


  return (
    <>
      {groups.map((group) => (
        <div key={group.id} className="group-list">
          <GroupPreview group={group} members ={members} labels={labels} />
        </div>
      ))}
    </>
  );
}

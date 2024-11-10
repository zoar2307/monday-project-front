import { useEffect } from "react"
import { useSelector } from "react-redux"
import { GroupPreview } from "../cmps/GroupPreview"
import {
  addGroup,
  removeGroup,
  loadGroups,
} from "../store/actions/group.actions"

export function GroupList({ boardId, members, labels }) {
  const groups = useSelector((state) => state.groupModule.groups)

  useEffect(() => {
    loadGroups(boardId) 
  }, [boardId])

  const handleAddGroup = () => addGroup(boardId)
  const handleRemoveGroup = (groupId) => removeGroup(boardId, groupId)

  if (!groups || !groups.length) return null

  return (
    <div className="group-list">
      {groups.map((group) => (
        <div key={group.id} className="group-list-item">
          <GroupPreview
            group={group}
            members={members}
            boardId={boardId}
            labels={labels}
            onRemoveGroup={() => handleRemoveGroup(group.id)}
          />
        </div>
      ))}
      <button onClick={handleAddGroup} className="add-group-btn">
        Add Group
      </button>
    </div>
  )
}

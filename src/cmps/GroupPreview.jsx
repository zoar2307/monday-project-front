import { useState } from "react";
import { useDispatch } from "react-redux";
import { TaskList } from "../cmps/TaskList";
import { updateGroupTitle } from "../store/actions/group.actions";

export function GroupPreview({ group, members, labels, boardId }) {
    const [groupTitle, setGroupTitle] = useState(group.title);
    const [isChanged, setIsChanged] = useState(false);

    const handleTitleChange = (e) => {
        setGroupTitle(e.target.value);
        setIsChanged(true);
    };

    const saveTitle = () => {
        // Directly call updateGroupTitle, which internally dispatches the action
        updateGroupTitle(boardId, group.id, groupTitle);
        setIsChanged(false);
    };

    return (
        <div className="group-preview">
            <header className="flex align-center">
                <p style={{ color: group.color }}>
                    <i className="fa-solid fa-chevron-down"></i>
                </p>
                <input
                    type="text"
                    value={groupTitle}
                    onChange={handleTitleChange}
                    style={{ color: group.color }}
                    className="group-title-input"
                />
                {isChanged && (
                    <button onClick={saveTitle} className="save-btn">
                        Save
                    </button>
                )}
            </header>
            <main className="flex">
                <div
                    className="side-group-color"
                    style={{ backgroundColor: group.color }}
                ></div>
                <TaskList tasks={group.tasks} members={members} labels={labels} />
            </main>
        </div>
    );
}

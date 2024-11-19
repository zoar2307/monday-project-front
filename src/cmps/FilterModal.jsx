import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { resetFilterBy, setFilterBy } from "../store/actions/board.actions"


export function FilterModal({ setLabelModal, labelModal, modalBtnRef }) {
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    let allTasks = board.groups.map(group => {
        if (group) return group.tasks.map(task => task)
    })

    allTasks = allTasks.reduce((acc, tasks) => {

        acc.push(...tasks)
        return acc
    }, [])
    const modalRef = useRef()

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target) && modalBtnRef.current && !modalBtnRef.current.contains(event.target)) {
            setLabelModal(false)
        }

    }


    useEffect(() => {
        if (labelModal) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [labelModal])


    function onSelectFilter(type, id) {
        if (type === 'members') {
            if (filterByToEdit.person.includes(id)) {
                setFilterByToEdit(prev => ({ ...prev, person: prev.person.filter(memberId => memberId !== id) }))
            }
            else {
                setFilterByToEdit(prev => ({ ...prev, person: [...prev.person, id] }))
            }
        }

        if (type === 'groups') {
            if (filterByToEdit.group.includes(id)) {
                setFilterByToEdit(prev => ({ ...prev, group: prev.group.filter(groupId => groupId !== id) }))
            }
            else {
                setFilterByToEdit(prev => ({ ...prev, group: [...prev.group, id] }))
            }
        }

        if (type === 'tasks') {
            if (filterByToEdit.task.includes(id)) {
                setFilterByToEdit(prev => ({ ...prev, task: prev.task.filter(taskId => taskId !== id) }))
            }
            else {
                setFilterByToEdit(prev => ({ ...prev, task: [...prev.task, id] }))
            }
        }

        if (type === 'status') {
            if (filterByToEdit.status.includes(id)) {
                setFilterByToEdit(prev => ({ ...prev, status: prev.status.filter(statusId => statusId !== id) }))
            }
            else {
                setFilterByToEdit(prev => ({ ...prev, status: [...prev.status, id] }))
            }
        }
        if (type === 'priority') {
            if (filterByToEdit.priority.includes(id)) {
                setFilterByToEdit(prev => ({ ...prev, priority: prev.priority.filter(priorityId => priorityId !== id) }))
            }
            else {
                setFilterByToEdit(prev => ({ ...prev, priority: [...prev.priority, id] }))
            }
        }
    }

    function onClearFilter() {
        resetFilterBy()
        setFilterByToEdit({ ...filterBy, person: [], group: [], task: [], status: [], priority: [] })
    }


    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    return (
        <section ref={modalRef} className="filter-modal">
            <div className="filter-header">
                <div className="title">Quick filters</div>
                <div className="clear">
                    <button onClick={onClearFilter}>
                        Clear all
                    </button>
                </div>
            </div>
            <div className="filters-container">
                <div className="filter-container">
                    <div className="filter-title">Person</div>
                    <div className="options"
                    >
                        {board.members.map(member => {
                            return (
                                <div
                                    onClick={() => onSelectFilter('members', member._id)}
                                    className={`option ${filterByToEdit.person.includes(member._id) && 'selected'}`}
                                >
                                    <img src={member.imgUrl} alt="" />
                                    <div className="">
                                        <p>{member.fullname}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>


                {/* <div className="filter-container">
                    <div className="filter-title">Group</div>
                    <div className="options">
                        {board.groups.map(group => {
                            return (
                                <div
                                    onClick={() => onSelectFilter('groups', group.id)}
                                    className={`option ${filterByToEdit.group.includes(group.id) && 'selected'}`}
                                >
                                    <p>{group.title}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>


                {allTasks && <div className="filter-container">
                    <div className="filter-title">Name</div>
                    <div className="options">
                        {allTasks.map(task => {
                            return (
                                <div
                                    onClick={() => onSelectFilter('tasks', task.id)}
                                    className={`option ${filterByToEdit.task.includes(task.id) && 'selected'}`}
                                >
                                    <p>{task.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>} */}


                <div className="filter-container">
                    <div className="filter-title">Status</div>
                    <div className="options">
                        {board.labels.map(label => {
                            if (label.type === 'status') return (
                                <div
                                    onClick={() => onSelectFilter('status', label.title)}
                                    className={`option ${filterByToEdit.status.includes(label.title) && 'selected'}`}
                                >
                                    <p>{label.title}</p>
                                </div>
                            )

                        })}

                    </div>
                </div>


                <div className="filter-container">
                    <div className="filter-title">Priority</div>
                    <div className="options">
                        {board.labels.map(label => {
                            if (label.type === 'priority') return (
                                <div
                                    onClick={() => onSelectFilter('priority', label.title)}
                                    className={`option ${filterByToEdit.priority.includes(label.title) && 'selected'}`}
                                >
                                    <p>{label.title}</p>
                                </div>
                            )

                        })}
                    </div>
                </div>

            </div>
        </section>
    )
}
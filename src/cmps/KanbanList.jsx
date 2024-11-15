import { useState } from "react"
import { updateGroup, updateLabels, updateLabelsKanban, updateTaskStatus } from "../store/actions/board.actions"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

export function KanbanList({ board }) {
    const { groups } = board
    let allTasks = groups.map(group => {
        return group.tasks.map(task => task)
    })

    allTasks = allTasks.reduce((acc, tasks) => {
        acc.push(...tasks)
        return acc
    }, [])



    async function handleDragEnd(result) {
        const { destination, source, draggableId, type } = result
        if (!destination) return

        if (destination.droppableId === source.droppableId && destination.index === source.index) return


        if (type === 'groups') {

            const newLabelsOrder = [...board.labels]
            newLabelsOrder.splice(source.index, 1)
            const movedGroup = board.labels.find(label => label.id === draggableId)
            newLabelsOrder.splice(destination.index, 0, movedGroup)
            try {
                await updateLabelsKanban(newLabelsOrder)
            } catch (err) {
                console.log(err)
            }


        }
        if (type === 'tasks') {
            const group = board.groups.find(group => group.tasks.find(task => task.id === draggableId.slice(0, -6)))
            const status = board.labels.find(label => label.id === destination.droppableId.slice(0, -4))
            try {
                updateTaskStatus(group.id, draggableId.slice(0, -6), status.title)

            } catch (err) {
                console.log(err)
            }
            return
        }



    }

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     switch (type) {
    //         case 'number':
    //         case 'range':
    //             value = +value
    //             break
    //         case 'checkbox':
    //             value = target.checked
    //             break
    //     }
    //     setUpdateSelectedTask(prevFilter => ({ ...prevFilter, title: value }))
    // }
    // const [updateSelectedTask, setUpdateSelectedTask] = useState(task)
    // const [isEditTaskTitle, setIsEditTaskTitle] = useState(false)

    // async function saveTitle(ev) {
    //     ev.preventDefault()
    //     try {
    //         setIsEditTaskTitle(false)
    //         const newTasks = group.tasks.map(groupTask => {
    //             if (groupTask.id === updateSelectedTask.id) return updateSelectedTask
    //             else return groupTask
    //         })
    //         const updatedGroup = {
    //             ...group,
    //             tasks: [...newTasks]
    //         }

    //         await updateGroup(updatedGroup)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <Droppable droppableId={board._id + 'kanban'} direction="horizontal" type="groups" >
                {(provided) => (
                    <section
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="kanban-list">
                        {board.labels.map((label, index) => {
                            if (label.type === 'status') return (
                                <Draggable draggableId={label.id} index={index} key={label.id}>
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps} ref={provided.innerRef}
                                            key={label.id} className="kanban-group"
                                        >
                                            <div
                                                style={{
                                                    '--bgc': label.color
                                                }}
                                                {...provided.dragHandleProps}
                                                className="label-title"
                                            > {label.title}

                                            </div>
                                            <Droppable droppableId={label.id + 'list'} direction="vertical" type="tasks" >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        className="task-list">
                                                        {allTasks.map((task, index) => {
                                                            if (task.status === label.title) return (
                                                                <Draggable draggableId={task.id + 'kanban'} index={index} key={task.id + 'kanban'}>
                                                                    {(provided) => (
                                                                        <div
                                                                            {...provided.draggableProps} ref={provided.innerRef}
                                                                            {...provided.dragHandleProps}
                                                                            key={task.id} className="task">
                                                                            <div className="task-title">{task.title}</div>
                                                                            <div
                                                                                style={{
                                                                                    '--bgc': label.color
                                                                                }}
                                                                                className="label-title-task">
                                                                                {label.title}
                                                                            </div>
                                                                            <div className="member">

                                                                                {task.assignedTo && task.assignedTo.map((member, idx) => {
                                                                                    if (idx < 1) return (
                                                                                        <img key={member._id} className="member-img" src={member.imgUrl} alt="" />

                                                                                    )
                                                                                })}
                                                                                {task.assignedTo && task.assignedTo.length > 1 && <div className="plus-member">+{task.assignedTo.length - 1}</div>}

                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable >
                                                            )


                                                        })}
                                                        {provided.placeholder}

                                                    </div>

                                                )
                                                }

                                            </Droppable>
                                        </div>
                                    )}
                                </Draggable >
                            )



                        })}
                        {provided.placeholder}

                    </section >
                )
                }

            </Droppable>

        </DragDropContext >
    )
}
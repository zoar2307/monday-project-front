import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { SET_CONVERSATION_STATUS } from "../store/reducers/system.reducer"
import { useEffect, useState } from "react"
import { addTaskConversationUpdate } from "../store/actions/board.actions"

export function TaskConversation() {
    const isConversationOpen = useSelector(storeState => storeState.systemModule.isConversationOpen)
    const board = useSelector(storeState => storeState.boardModule.currBoard)

    const [selectedTask, setSelectedTask] = useState({})
    const [isWriting, setIsWriting] = useState(false)
    const [newUpdate, setNewUpdate] = useState({ txt: '' })
    const [isActivityLogView, setIsActivityLogView] = useState(false)
    const [activityLog, setActivityLog] = useState([])

    const { boardId, taskId, groupId } = useParams()
    const { groups } = board

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function toggleTextArea(action) {
        if (newUpdate.txt) {
            return setIsWriting(true)
        }
        if (action === 'close') setIsWriting(false)
        else setIsWriting(true)
    }

    useEffect(() => {
        const group = groups.find(group => group.id === groupId)
        const task = group?.tasks.find(task => task.id === taskId)

        if (task) {
            const sortedLog = task.activityLog
                ? [...task.activityLog].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                : []
            setSelectedTask(task)
            setActivityLog(sortedLog)
        } else {
            setSelectedTask({})
            setActivityLog([])
        }
    }, [taskId, groupId, groups, board])



    const logTaskChange = (label, prevValue, newValue) => {
        const group = groups.find(group => group.id === groupId)
        const task = group?.tasks.find(task => task.id === taskId)
        if (!task) return

        const newLog = {
            id: `${label}-${Date.now()}`,
            member: { imgUrl: '/path/to/user.jpg', fullname: 'Current User' },
            taskTitle: task.title,
            label,
            prevValue,
            newValue,
            timestamp: new Date(),
        }

        const updatedActivityLog = task.activityLog || []

        const isDuplicate = updatedActivityLog.some(
            log =>
                log.label === label &&
                log.prevValue === prevValue &&
                log.newValue === newValue &&
                log.timestamp.toString() === newLog.timestamp.toString()
        )

        if (!isDuplicate) {
            updatedActivityLog.push(newLog)
            task.activityLog = updatedActivityLog

            const sortedLog = [...updatedActivityLog].sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            )
            setActivityLog(sortedLog)
        }
    }

    const getLabelStyle = (title) => {
        const labels = board.labels || []
        const label = labels.find(label => label.title === title)
        if (!label) {
            return {
                backgroundColor: 'transparent',
                color: 'black',
            }
        }
        return {
            backgroundColor: label.color,
            color: 'white',
        }
    }


    useEffect(() => {
        const group = groups.find(group => group.id === groupId)
        const task = group?.tasks.find(task => task.id === taskId)

        if (!task) return

        if (task.title !== task.previousTitle) {
            logTaskChange("Title", task.previousTitle || "None", task.title)
            task.previousTitle = task.title
        }

        if (task.status !== task.previousStatus) {
            logTaskChange("Status", task.previousStatus || "None", task.status)
            task.previousStatus = task.status
        }

        if (task.priority !== task.previousPriority) {
            logTaskChange("Priority", task.previousPriority || "None", task.priority)
            task.previousPriority = task.priority
        }

        if (task.date !== task.previousDate) {
            const formatDate = (date) => {
                const d = new Date(date)
                const day = d.getDate().toString().padStart(2, '0')
                const month = (d.getMonth() + 1).toString().padStart(2, '0')
                const year = d.getFullYear().toString().slice(-2)
                return `${day}/${month}/${year}`
            }

            const prevDate = task.previousDate ? formatDate(task.previousDate) : "None"
            const newDate = task.date ? formatDate(task.date) : "None"
            logTaskChange("Date", prevDate, newDate)
            task.previousDate = task.date
        }

    }, [groups, taskId, groupId])




    function onCloseConversation() {
        navigate(`/board/${boardId}`)
        dispatch({ type: SET_CONVERSATION_STATUS, status: false })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setNewUpdate(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    async function onSubmitUpdate(ev) {
        ev.preventDefault()
        if (!newUpdate.txt) return
        try {
            await addTaskConversationUpdate(groupId, selectedTask.id, newUpdate)
            setIsWriting(false)
            setNewUpdate({ txt: '' })
        } catch (err) {
            console.log(err)
        }
    }

    function formatTimeDifference(startDate, endDate) {
        // Calculate the time difference in milliseconds
        const timeDifference = endDate - startDate

        // If the time difference is less than a minute (60,000 milliseconds)
        if (timeDifference < 60000) {
            const seconds = Math.floor(timeDifference / 1000)
            return `${seconds}s`
        }

        // If the time difference is less than an hour (3,600,000 milliseconds)
        else if (timeDifference < 3600000) {
            const minutes = Math.floor(timeDifference / 60000)
            return `${minutes}m`
        }

        // If the time difference is less than a day (86,400,000 milliseconds)
        else if (timeDifference < 86400000) {
            const hours = Math.floor(timeDifference / 3600000)
            return `${hours}h`
        }

        // If the time difference is over a day
        else {
            const days = Math.floor(timeDifference / 86400000)
            return `${days}d`
        }
    }



    const conversationClass = isConversationOpen ? 'open' : ''

    return (
        <section className={`task-conversation ${conversationClass}`}>
            {/* <div className="drag-container"></div> */}
            <div className="content">
                <div className="header">
                    <div className="title">
                        <div onClick={onCloseConversation} className="close-btn">
                            <i className="fa-regular fa-x"></i>
                        </div>
                        <div className="information">
                            <div className="side-panel-task-title">
                                <h2>{selectedTask.title}</h2>
                            </div>

                            <div className="task-members">
                                {selectedTask.assignedTo && selectedTask.assignedTo.map((member, idx) => {
                                    return (
                                        <img key={member._id} src={member.imgUrl} alt="" style={{

                                        }} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="tabs">
                        <div className={`updates tab ${!isActivityLogView ? 'active' : ''}`} onClick={() => setIsActivityLogView(false)}>
                            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" tabIndex="-1" className="icon_e7210c37bd"><path d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z" /></svg>
                            <div className="view-title">
                                Updates
                            </div>
                            <div className="active-line"></div>
                        </div>
                        <div className={`activity-log tab ${isActivityLogView ? 'active' : ''}`} onClick={() => setIsActivityLogView(true)}>
                            <div className="view-title">
                                Activity Log
                            </div>
                            <div className="active-line"></div>
                        </div>
                    </div>
                </div>

                <div className="body">
                    {!isActivityLogView ? (
                        <div className="updates-section">
                            <div className="input">
                                {isWriting ? (
                                    <form onSubmit={onSubmitUpdate}>
                                        <div className="edit-container">
                                            <div className="text-area-container">
                                                <textarea
                                                    onBlur={() => toggleTextArea('close')}
                                                    name="txt"
                                                    autoFocus
                                                    value={newUpdate.txt}
                                                    onChange={handleChange}
                                                    rows={5}
                                                >
                                                </textarea>
                                                <div className="update-button">
                                                    <button>Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <button
                                        className="open-textarea"
                                        onClick={() => toggleTextArea('open')}
                                    >Write an update...
                                    </button>
                                )}
                            </div>
                            <div className="chat">
                                {selectedTask.conversation && selectedTask.conversation.length > 0 ? (
                                    <div className="chat-list">
                                        {selectedTask.conversation.map(update => (
                                            <div className="chat-container" key={update.id}>
                                                <div className="chat-header">
                                                    <div className="update-data">
                                                        <div className="member-img">
                                                            <img src={update.member.imgUrl} alt="" />
                                                        </div>
                                                        <div className="member-data">
                                                            <span className="member-name">{update.member.fullname}</span>
                                                            <div className="member-status"></div>
                                                        </div>
                                                        <div className="created-at">
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" class="icon_1360dfb99d action-icon noFocusStyle_faf4efa4b1" data-testid="icon"><path d="M9.95001 1.95C7.82828 1.95 5.79345 2.79285 4.29316 4.29314C2.79287 5.79343 1.95001 7.82827 1.95001 9.95C1.95001 12.0717 2.79287 14.1066 4.29316 15.6069C5.79345 17.1071 7.82828 17.95 9.95001 17.95C12.0717 17.95 14.1066 17.1071 15.6069 15.6069C17.1072 14.1066 17.95 12.0717 17.95 9.95C17.95 7.82827 17.1072 5.79343 15.6069 4.29314C14.1066 2.79285 12.0717 1.95 9.95001 1.95ZM5.35382 5.3538C6.5728 4.13482 8.22611 3.45 9.95001 3.45C11.6739 3.45 13.3272 4.13482 14.5462 5.3538C15.7652 6.57279 16.45 8.22609 16.45 9.95C16.45 11.6739 15.7652 13.3272 14.5462 14.5462C13.3272 15.7652 11.6739 16.45 9.95001 16.45C8.22611 16.45 6.5728 15.7652 5.35382 14.5462C4.13483 13.3272 3.45001 11.6739 3.45001 9.95C3.45001 8.22609 4.13483 6.57279 5.35382 5.3538ZM11.1834 6.56667C11.1834 6.15245 10.8476 5.81667 10.4334 5.81667C10.0192 5.81667 9.68338 6.15245 9.68338 6.56667V10.4333C9.68338 10.8475 10.0192 11.1833 10.4334 11.1833H13.3334C13.7476 11.1833 14.0834 10.8475 14.0834 10.4333C14.0834 10.0191 13.7476 9.68333 13.3334 9.68333H11.1834V6.56667Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg> {formatTimeDifference(update.createdAt, new Date())}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="chat-body">
                                                    <pre className="update">{update.txt}</pre>
                                                </div>
                                                <div className="add-like">
                                                    <button><svg class="animated-like-icon" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_687:1635)"><path d="M3.90002 6.59998H1.50002C0.900024 6.59998 0.400024 6.99998 0.400024 7.59998V14.4C0.400024 15 0.900024 15.5 1.50002 15.5H3.90002C4.50002 15.5 5.00002 15 5.00002 14.4V14.2V7.19998C4.90002 6.89998 4.40002 6.59998 3.90002 6.59998Z" stroke="currentColor" /><path d="M16.4 9.49995C16.4 8.99995 16.2 8.49995 15.8 8.19995C16 7.89995 16.2 7.49995 16.1 6.99995C16 6.09995 15.2 5.39995 14.3 5.39995H11.6L11.8 4.09995C11.8 3.69995 11.8 3.39995 11.8 2.99995C11.5 1.59995 10.3 0.699951 8.9 0.699951C8.6 0.699951 8.3 0.799951 8.1 1.09995C7.8 1.39995 7.7 1.69995 7.7 1.99995V3.69995C7.7 5.39995 6.8 6.49995 6.4 6.99995C6.3 7.09995 6 7.29995 6 7.29995V14.5C6.5 15 7.3 15.3 8.1 15.3H13.4C13.9 15.3 14.4 15.1 14.7 14.8C15 14.5 15.2 14 15.2 13.6C15.2 13.4 15.2 13.3 15.1 13.1C15.7 12.8 16 12.2 16 11.6C16 11.4 16 11.1 15.9 10.9C16.2 10.5 16.4 9.99995 16.4 9.49995Z" stroke="currentColor" /></g><defs><clipPath id="clip0_687:1635"><rect width="16.6" height="16.6" fill="white" /></clipPath></defs></svg> Like</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-updates">
                                        <h2>No updates yet for this task.</h2>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="activity-log-section">
                            {activityLog.length > 0 ? (
                                <div className="activity-list-wrapper">
                                    <div className="activity-list">
                                        {activityLog.map((log) => (
                                            <div className="activity-item" key={log.id}>
                                                <span className="activity-timestamp">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" class="icon_1360dfb99d action-icon noFocusStyle_faf4efa4b1" data-testid="icon"><path d="M9.95001 1.95C7.82828 1.95 5.79345 2.79285 4.29316 4.29314C2.79287 5.79343 1.95001 7.82827 1.95001 9.95C1.95001 12.0717 2.79287 14.1066 4.29316 15.6069C5.79345 17.1071 7.82828 17.95 9.95001 17.95C12.0717 17.95 14.1066 17.1071 15.6069 15.6069C17.1072 14.1066 17.95 12.0717 17.95 9.95C17.95 7.82827 17.1072 5.79343 15.6069 4.29314C14.1066 2.79285 12.0717 1.95 9.95001 1.95ZM5.35382 5.3538C6.5728 4.13482 8.22611 3.45 9.95001 3.45C11.6739 3.45 13.3272 4.13482 14.5462 5.3538C15.7652 6.57279 16.45 8.22609 16.45 9.95C16.45 11.6739 15.7652 13.3272 14.5462 14.5462C13.3272 15.7652 11.6739 16.45 9.95001 16.45C8.22611 16.45 6.5728 15.7652 5.35382 14.5462C4.13483 13.3272 3.45001 11.6739 3.45001 9.95C3.45001 8.22609 4.13483 6.57279 5.35382 5.3538ZM11.1834 6.56667C11.1834 6.15245 10.8476 5.81667 10.4334 5.81667C10.0192 5.81667 9.68338 6.15245 9.68338 6.56667V10.4333C9.68338 10.8475 10.0192 11.1833 10.4334 11.1833H13.3334C13.7476 11.1833 14.0834 10.8475 14.0834 10.4333C14.0834 10.0191 13.7476 9.68333 13.3334 9.68333H11.1834V6.56667Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
                                                    {formatTimeDifference(new Date(log.timestamp), new Date())}
                                                </span>
                                                <img
                                                    src={log.member.imgUrl}
                                                    className="member-img"
                                                />
                                                <span className="task-name">{log.taskTitle}</span>{" "}
                                                <span className="label">{log.label}</span>
                                                <span className="task-value" style={getLabelStyle(log.prevValue)}> {log.prevValue}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" role="button" tabindex="0" aria-hidden="false" class="icon_1360dfb99d clickable_09ec11e641" data-testid="icon"><path d="M12.5303 9.46967L12 10L12.5303 10.5303C12.8232 10.2374 12.8232 9.76256 12.5303 9.46967ZM10.9393 10L7.46967 13.4697C7.17678 13.7626 7.17678 14.2374 7.46967 14.5303C7.76256 14.8232 8.23744 14.8232 8.53033 14.5303L12.5303 10.5303L12 10L12.5303 9.46967L8.53033 5.46967C8.23744 5.17678 7.76256 5.17678 7.46967 5.46967C7.17678 5.76256 7.17678 6.23744 7.46967 6.53033L10.9393 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
                                                <span className="task-value" style={getLabelStyle(log.newValue)}> {log.newValue} </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="no-activity">
                                    <h2>No activity yet for this task.</h2>
                                </div>
                            )}
                        </div>


                    )}
                </div>
            </div>
        </section>
    )

}
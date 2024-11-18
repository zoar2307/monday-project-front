import { useState, useRef, useEffect } from "react"
import { TaskList } from "../cmps/TaskList"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { addTask, updateGroup } from "../store/actions/board.actions"
import { OptionGroupModal } from "./OptionGroupModal"
import dots from '../assets/img/dots.svg'
import { useSelector } from "react-redux"
import { LabelModal } from "./LabelModal"
import { SOCKET_EVENT_BOARD_UPDATE, socketService } from "../services/socket.service"
import { SET_BOARD } from "../store/reducers/board.reducer"
import { useDispatch } from "react-redux"

export function GroupPreview({
  group,
  index,
}) {
  const board = useSelector(storeState => storeState.boardModule.currBoard)
  const { title, tasks, id: groupId } = group

  let taskStrCount = ''
  if (tasks.length === 1) taskStrCount = `${tasks.length} Task`
  if (tasks.length > 1) taskStrCount = `${tasks.length} Tasks`
  if (tasks.length === 0) taskStrCount = `No tasks`

  const [groupTitle, setGroupTitle] = useState(title)
  const [isEditGroupTitle, setIsEditGroupTitle] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const buttonRef = useRef(null)
  const modalAddBtnRef = useRef()
  const modalRemoveBtnRef = useRef()
  const [isDragOn, setIsDragOn] = useState(false)
  const [labelModal, setLabelModal] = useState({ type: 'add', isDisplay: false, gId: '', lId: '' })
  const [newTask, setNewTask] = useState({ title: '' })
  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }
  const [isHovered, setIsHovered] = useState(false)
  const [isGroupCollapsed, setIsGroupCollapsed] = useState(false)


  const cmpsOrder = board.cmpsLabels.map(label => label.type)

  async function onSubmitTask(ev) {
    ev.preventDefault()
    if (newTask.title.length === 0) return
    try {
      await addTask(groupId, newTask)
      setNewTask({ title: '' })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setGroupTitle(title)
  }, [title])

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
    setNewTask(prevFilter => ({ ...prevFilter, title: value }))
  }

  const toggleGroupCollapse = () => {
    setIsGroupCollapsed(prevState => !prevState)
  }

  const handleTitleChange = (e) => setGroupTitle(e.target.value)

  const saveTitle = async (ev) => {
    ev.preventDefault()
    try {
      const updatedGroup = { ...group, title: groupTitle }
      await updateGroup(updatedGroup, board)
      setIsEditGroupTitle(false)
    } catch (err) {
      console.log(err)
    }
  }

  function onModal(type, labelId = 0, groupId = 0) {
    if (type === 'open-add') {
      if (labelModal.type === 'add' && labelModal.isDisplay) setLabelModal({ type: 'add', isDisplay: false })
      else setLabelModal({ type: 'add', isDisplay: true })
    }
    if (type === 'open-remove') {
      if (labelModal.type === 'remove' && labelModal.isDisplay) setLabelModal({ type: 'remove', isDisplay: false })
      else setLabelModal({ type: 'remove', isDisplay: true, gId: groupId, lId: labelId })
    }

  }

  function formatDateRange(earliestDate, latestDate) {
    const sameYear = earliestDate.getFullYear() === latestDate.getFullYear()
    const sameMonth = sameYear && earliestDate.getMonth() === latestDate.getMonth()
    const sameDate = earliestDate.getTime() === latestDate.getTime()

    const formatDate = (date, includeYear = true) => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: includeYear ? '2-digit' : undefined,
      })
    }

    if (sameDate) {
      return `${formatDate(earliestDate)}`
    } else if (sameMonth) {
      return `${earliestDate.getDate()} - ${latestDate.getDate()} ${earliestDate.toLocaleDateString('en-US', { month: 'short' })} ${earliestDate.getFullYear()}`
    } else if (sameYear) {
      return `${formatDate(earliestDate, false)} - ${formatDate(latestDate)}`
    } else {
      return `${formatDate(earliestDate)} - ${formatDate(latestDate)}`
    }
  }



  function calculateDateStats(tasks) {
    const dates = tasks
      .map(task => task.date)
      .filter(date => date)
      .map(date => new Date(date))

    if (dates.length === 0) {
      return { progress: 0, dateRange: 'No Date', daysDifference: 0 }
    }

    const earliestDate = new Date(Math.min(...dates))
    const latestDate = new Date(Math.max(...dates))
    const today = new Date()

    const totalRange = Math.max(1, latestDate - earliestDate)
    const elapsedRange = Math.max(0, today - earliestDate)

    const progress = Math.min(100, Math.max(0, (elapsedRange / totalRange) * 100))
    const daysDifference = Math.ceil(totalRange / (1000 * 60 * 60 * 24))

    const dateRange = formatDateRange(earliestDate, latestDate)

    return {
      progress,
      dateRange,
      daysDifference,
    }
  }





  const dateStats = calculateDateStats(group.tasks)

  const groupProgress = group.tasks.reduce((acc, task) => {
    if (!task.status) return acc
    if (!acc[task.status]) acc[task.status] = 0
    acc[task.status]++
    acc.count++
    return acc
  }, { count: 0 })

  return (
    <>

      <Draggable draggableId={group.id} index={index} key={group.id}>
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div className="group-preview">
              <header  {...provided.dragHandleProps}>
                <div className="group-name">
                  <button
                    ref={buttonRef}
                    className={`dots-button ${isModalOpen ? 'active' : ''}`}
                    onClick={toggleModal}
                  >
                    {isModalOpen && (
                      <OptionGroupModal
                        closeModal={() => setModalOpen(false)}
                        groupId={group.id}
                      />
                    )}
                    <img src={dots} alt="dots" />
                  </button>

                  {!isGroupCollapsed && (
                    <>

                      <p
                        style={{ color: group.color }}
                        onClick={toggleGroupCollapse}
                        className="toggle-collapse"
                      >
                        <i
                          className={`fa-solid ${isGroupCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'}`}
                        ></i>
                      </p>

                      {isEditGroupTitle ? (
                        <form onSubmit={saveTitle}>
                          <input
                            type="text"
                            value={groupTitle}
                            onChange={handleTitleChange}
                            onBlur={saveTitle}
                            style={{ color: group.color, width: '500px', maxWidth: '500px' }}
                            className="group-title"
                            autoFocus
                          />
                        </form>
                      ) : (
                        <h4
                          className="group-title"
                          onClick={() => setIsEditGroupTitle(true)}
                          style={{ color: group.color, borderColor: group.color }}
                        >
                          {groupTitle}
                        </h4>
                      )}
                    </>

                  )}


                  <span className="tasks-count">{tasks.length} Task{tasks.length !== 1 && 's'}</span>
                </div>

              </header>

              <div
                className={`group-header ${isGroupCollapsed ? 'collapsed' : ''}`}
              >

                {!isGroupCollapsed && (
                  <>

                    <div className='check-label'
                      style={{ '--before-color': group.color }}
                    >
                      <input type="checkbox" /></div >
                    <div className='task-title'>Task</div>
                  </>
                )}

                {isGroupCollapsed && (
                  <div className="col-group-title" style={{ '--before-color': group.color }}>

                    <p
                      style={{ color: group.color }}
                      onClick={toggleGroupCollapse}
                      className="toggle-collapse"
                    >
                      <i
                        className={`fa-solid ${isGroupCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'}`}
                      ></i>
                    </p>

                    {isEditGroupTitle ? (
                      <form onSubmit={saveTitle}>
                        <input
                          type="text"
                          value={groupTitle}
                          onChange={handleTitleChange}
                          onBlur={saveTitle}
                          style={{ color: group.color, width: '500px', maxWidth: '500px' }}
                          className="group-title"
                          autoFocus
                        />
                      </form>
                    ) : (

                      <h4
                        className="group-title"
                        onClick={() => setIsEditGroupTitle(true)}
                        style={{ color: group.color, borderColor: group.color }}
                      >
                        {groupTitle}
                      </h4>

                    )}



                    <span className="tasks-count">{tasks.length} Task{tasks.length !== 1 && 's'}</span>
                  </div>



                )}

                

                <Droppable
                  droppableId={groupId + 'label'}
                  direction='horizontal'
                  type="labels"
                >
                  {(provided, snapshot) => (
                    <div
                      className={`labels`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        '--labels': board.cmpsLabels.length
                      }}
                    >

                      {board.cmpsLabels.map((label, idx) => {
                        return (
                          <Draggable draggableId={label.id + groupId} index={idx} key={label.id + groupId}>
                            {(provided, snapshot) => (
                              <div key={label.id + groupId} className={`label ${isGroupCollapsed ? 'collapsed' : ''} ${isDragOn && 'drag'}`}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                              >
                                {setIsDragOn(snapshot.isDragging)}
                                {label.title}
                                <div className='dots-container'>
                                  <button ref={modalRemoveBtnRef} onClick={() => onModal('open-remove', label.id, groupId)}
                                    className={`dots 
                                         ${labelModal.isDisplay
                                      && labelModal.gId === groupId
                                      && labelModal.lId === label.id
                                      && 'opened-modal'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" role="img" aria-hidden="true"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor" /></svg>
                                  </button>
                                  {labelModal.type === 'remove'
                                    && labelModal.isDisplay
                                    && labelModal.gId === groupId
                                    && labelModal.lId === label.id
                                    && < LabelModal modalRemoveBtnRef={modalRemoveBtnRef} board={board} type={'remove'} labelId={label.id} setLabelModal={setLabelModal} labelModal={labelModal} />}
                                </div>
                              </div>
                               

                            )}
                          </Draggable>
                        )

                      })}
                      {provided.placeholder}

                    </div>

                  )}
                </Droppable>
                                 <div className='add-label-container'>
                                    <button ref={modalAddBtnRef} onClick={() => onModal('open-add')} className='add-label'>
                                      <svg className={`${labelModal.type === 'add' && labelModal.isDisplay && 'opened-modal'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" data-testid="icon"><g id="Icon / Basic / Add"><path id="Union" d="M10 2.25C10.4142 2.25 10.75 2.58579 10.75 3V9.25H17C17.4142 9.25 17.75 9.58579 17.75 10C17.75 10.4142 17.4142 10.75 17 10.75H10.75V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17V10.75H3C2.58579 10.75 2.25 10.4142 2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H9.25V3C9.25 2.58579 9.58579 2.25 10 2.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></g></svg>
                                    </button>
                                    {labelModal.type === 'add' && labelModal.isDisplay && <LabelModal board={board} type={'add'} setLabelModal={setLabelModal} labelModal={labelModal} modalAddBtnRef={modalAddBtnRef} />}
                                  </div>


              </div  >


              {!isGroupCollapsed && (
                <>
                  <TaskList group={group} />
                </>

              )}


              <div className="group-footer">
                {!isGroupCollapsed && (
                  <div className='add-task '>
                    <div className='check-label '
                      style={{ '--before-color': group.color }}
                    ><input type="checkbox" disabled /></div >

                    <form onSubmit={onSubmitTask} className=''>
                      <input className='add-task-input' type="text" placeholder='+ Add task' onBlur={onSubmitTask} onChange={handleChange} value={newTask.title} />
                    </form>

                  </div>
                )}
                <div className={`stats-labels ${isGroupCollapsed ? 'collapsed' : ''}`}>
                  <>
                    <div className={`empty ${isGroupCollapsed ? 'collapsed' : ''}`}></div>
                    <div className={`empty2 ${isGroupCollapsed ? 'collapsed' : ''}`}></div>
                  </>

                  <div className={`content ${isGroupCollapsed ? 'collapsed' : ''}`}
                    style={{
                      '--labels': board.cmpsLabels.length
                    }}
                  >

                    {cmpsOrder.map((cmp, idx) => {
                      if (cmp === 'StatusPicker') return (
                        <div key={cmp} className="status-stats">
                          {board.labels.map(label => {

                            const labelStats = group.tasks.reduce((acc, task) => {
                              if (!task.status) return acc
                              if (!acc[task.status]) acc[task.status] = 0
                              acc[task.status]++
                              acc.count++
                              return acc
                            }, { count: 0 })

                            const labelWidth = 220 / labelStats.count * labelStats[label.title]
                            if (label.type === 'status' && labelStats[label.title]) return (
                              <div key={label.id}
                                style={{
                                  backgroundColor: label.color,
                                  width: labelWidth
                                }}
                                className="status" title={`${label.title} ${labelStats[label.title] || 0}/${group.tasks.length} `}></div>
                            )
                          })}
                        </div>
                      )

                      if (cmp === 'MemberPicker') return (
                        <div key={cmp}></div>
                      )

                      if (cmp === 'PriorityPicker') return (
                        <div key={cmp} className="priority-stats">
                          {board.labels.map(label => {

                            const labelStats = group.tasks.reduce((acc, task) => {
                              if (!task.priority) return acc
                              if (!acc[task.priority]) acc[task.priority] = 0
                              acc[task.priority]++
                              acc.count++
                              return acc
                            }, { count: 0 })

                            const labelWidth = 220 / labelStats.count * labelStats[label.title]
                            if (label.type === 'priority' && labelStats[label.title]) return (
                              <div key={label.id}
                                style={{
                                  backgroundColor: label.color,
                                  width: labelWidth
                                }}
                                className="priority" title={`${label.title} ${labelStats[label.title]}/${group.tasks.length} `}></div>
                            )
                          })}
                        </div>
                      )

                      if (cmp === 'FilePicker') return (
                        < div key={cmp}></div>
                      )
                      if (cmp === 'ProgressBar') return (

                        < div key={cmp} className="priority-stats"
                          style={{
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '9px',
                            gap: '5px'
                          }}
                        >
                          <div style={{
                            border: '2px solid #00854d',
                            width: '80%',
                            height: '100%',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center'
                          }}>
                            <div className="green"
                              style={{
                                background: '#00854d',
                                width: 176 / groupProgress.count * groupProgress.Done + 'px',
                                height: '100%'

                              }}></div>
                            <div className="white"
                              style={{
                                background: '#fff',
                                height: '100%',

                                width: (176 - (176 / groupProgress.count * groupProgress.Done)) + 'px'
                              }}
                            ></div>
                          </div>

                          <div
                            style={{
                              justifyContent: 'end',
                              width: '30px',
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '13px',
                              fontFamily: 'Figtree',
                              fontWeight: 200,
                              color: '#323338'
                            }}
                          >{Math.round(100 * groupProgress.Done / groupProgress.count) || 0}%</div>
                        </div>
                      )

                      if (cmp === 'DatePicker') {
                        return (
                          <div
                            key={cmp}
                            className="date-stats"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <div className="date-progress-bar">
                              <div
                                className="date-fill"
                                style={{
                                  width: `${dateStats.progress}%`,
                                }}
                              ></div>
                              <div className="date-range">
                                {dateStats.earliestFormatted && dateStats.latestFormatted ? (
                                  <>
                                    <span>{dateStats.earliestFormatted.date}</span>
                                    {dateStats.earliestFormatted.date !== dateStats.latestFormatted.date && (
                                      <>
                                        {' - '}
                                        <span>{dateStats.latestFormatted.date}</span>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <span>{dateStats.dateRange}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })}

                  </div>
                </div>

                <div className="empty-bottom"></div>

              </div>



            </div>
          </div>
        )}
      </Draggable>
    </>
  )
}

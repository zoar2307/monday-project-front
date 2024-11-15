import expand from '../assets/img/expand-icon.svg'
import trash from '../assets/img/trash-icon.svg'
import newTab from '../assets/img/open-in-new-tab-icon.svg'
import copyLink from '../assets/img/copy-link-icon.svg'
import moveTo from '../assets/img/move-to-icon.svg'
import duplicate from '../assets/img/duplicate-icon.svg'
import plus from '../assets/img/plus-modal-icon.svg'
import addSubitem from '../assets/img/add-subitem-icon.svg'
import convertSubitem from '../assets/img/convert-subitem-icon.svg'
import archive from '../assets/img/archive-icon.svg'
import { useEffect, useRef } from 'react'
import { removeTask } from '../store/actions/board.actions'

export function OptionTaskModal({ closeModal, groupId, taskId }) {
  const modalRef = useRef(null)


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeModal])

  const deleteTask = async () => {
    try {
      await removeTask(groupId, taskId)
      closeModal()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }
  return (
    <div className="option-task-modal-overlay" onClick={closeModal}>
      <div ref={modalRef} className="option-task-modal-content" onClick={(e) => e.stopPropagation()}>
        <button ><img src={expand} alt="expand" />Open item</button>
        <button ><img src={newTab} alt="newTab" />Open in new tab</button>
        <div className='divider'></div>
        <button ><img src={copyLink} alt="copyLink" />Copy item link</button>
        <button ><img src={moveTo} alt="moveTo" />Move to</button>
        <button ><img src={duplicate} alt="duplicate" />Duplicate</button>
        <button ><img src={plus} alt="plus" />Create new item below</button>
        <div className='divider'></div>
        <button ><img src={addSubitem} alt="addSubitem" />Add subitem</button>
        <button ><img src={convertSubitem} alt="expand" />Convert to subitem</button>
        <div className='divider'></div>
        <button ><img src={archive} alt="archive" />Archive</button>
        <button onClick={deleteTask}><img src={trash} alt="trash" />Delete Task</button>
      </div>
    </div>
  )
}
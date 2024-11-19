import { useEffect, useRef } from 'react'
import { removeGroup } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
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
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function OptionGroupModal({ closeModal, groupId }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const boardId = board._id
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

    const deleteGroup = async () => {
        try {
            await removeGroup(boardId, groupId)
            closeModal()
            showSuccessMsg('Group deleted successfully')
        } catch (error) {
            // console.error('Failed to delete group:', error)
            showErrorMsg('Failed to delete group')
        }
    }

    return (
        <div className="option-group-modal-overlay" onClick={closeModal}>
            <div
                ref={modalRef}
                className="option-group-modal-content"

                onClick={(e) => e.stopPropagation()}
            >
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
                <button onClick={deleteGroup}><img src={trash} alt="trash" />Delete Group</button>
            </div>
        </div>
    )
}

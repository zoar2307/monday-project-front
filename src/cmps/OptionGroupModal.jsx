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
        } catch (error) {
            console.error('Failed to delete group:', error)
        }
    }

    return (
        <div className="option-group-modal-overlay" onClick={closeModal}>
            <div
                ref={modalRef}
                className="option-group-modal-content"
               
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={() => console.log('Option 1 clicked')}><img src={expand} alt="expand" />Open item</button>
                <button onClick={() => console.log('Option 1 clicked')}><img src={newTab} alt="newTab" />Open in new tab</button>
                <div className='divider'></div>
                <button onClick={() => console.log('Option 1 clicked')}><img src={copyLink} alt="copyLink" />Copy item link</button>
                <button onClick={() => console.log('Option 1 clicked')}><img src={moveTo} alt="moveTo" />Move to</button>
                <button onClick={() => console.log('Option 1 clicked')}><img src={duplicate} alt="duplicate" />Duplicate</button>
                <button onClick={() => console.log('Option 1 clicked')}><img src={plus} alt="plus" />Create new item below</button>
                <div className='divider'></div>
                <button onClick={() => console.log('Option 1 clicked')}><img src={addSubitem} alt="addSubitem" />Add subitem</button>
                <button onClick={() => console.log('Option 1 clicked')}><img src={convertSubitem} alt="expand" />Convert to subitem</button>
                <div className='divider'></div>
                <button onClick={() => console.log('Option 2 clicked')}><img src={archive} alt="archive" />Archive</button>
                <button onClick={deleteGroup}><img src={trash} alt="trash" />Delete</button>
            </div>
        </div>
    )
}

import { useEffect, useRef, useState } from "react"
import { addLabel, removeLabel } from "../store/actions/board.actions"
import { showSuccessMsg } from "../services/event-bus.service"

export function LabelModal({ type,
    setLabelModal,
    labelModal,
    modalAddBtnRef,
    board,
    labelId,
    modalRemoveBtnRef }) {
    const modalRef = useRef()

    const handleClickOutside = (event) => {
        if (!modalAddBtnRef) {
            if (modalRef.current &&
                !modalRef.current.contains(event.target) &&
                modalRemoveBtnRef.current &&
                !modalRemoveBtnRef.current.contains(event.target)) {
                setLabelModal(prev => ({ ...prev, isDisplay: false }))
            }
        }
        if (!modalRemoveBtnRef) {
            if (modalRef.current &&
                !modalRef.current.contains(event.target) &&
                modalAddBtnRef.current &&
                !modalAddBtnRef.current.contains(event.target)
            ) {
                setLabelModal(prev => ({ ...prev, isDisplay: false }))
            }
        }
        // const bounds = document.body.getBoundingClientRect()
    }

    useEffect(() => {
        if (labelModal.isDisplay) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [labelModal.isDisplay])



    async function onAddLabel(name) {
        await addLabel(name)
        setLabelModal(prev => ({ ...prev, isDisplay: false }))
        showSuccessMsg('Label added successfully')
    }

    async function onRemoveLabel(name) {
        await removeLabel(labelId)
        setLabelModal(prev => ({ ...prev, isDisplay: false }))
        showSuccessMsg('Label removed successfully')
    }

    return (
        <section ref={modalRef} className="label-modal" style={{
            top: type === 'add' ? '-20%' : '-20%',
            right: type === 'add' ? '100%' : '',
            left: type === 'add' ? '' : '100%'
        }}>
            {type === 'add' ?
                <div className="add-label-modal">
                    {board.cmpsLabels.find(lable => lable.type === 'StatusPicker') ?
                        <div className="label-type disabled ">
                            <div className="img-container status">
                                <img src="https://cdn.monday.com/images/column-store/columns/color-column-icon.svg" alt=""></img>
                            </div>
                            <span>Status</span>
                        </div>
                        :
                        <div onClick={() => onAddLabel('Status')} className="label-type status">
                            <div className="img-container status">
                                <img src="https://cdn.monday.com/images/column-store/columns/color-column-icon.svg" alt=""></img>
                            </div>
                            <span>Status</span>
                        </div>
                    }


                    {board.cmpsLabels.find(lable => lable.type === 'MemberPicker') ?
                        <div className="label-type disabled">
                            <div className="img-container member">
                                <img src="https://cdn.monday.com/images/column-store/columns/multiple-person-column-icon.svg" alt=""></img>
                            </div>
                            <span>Person</span>

                        </div>
                        :

                        <div onClick={() => onAddLabel('Member')} className="label-type">
                            <div className="img-container member">
                                <img src="https://cdn.monday.com/images/column-store/columns/multiple-person-column-icon.svg" alt=""></img>
                            </div>
                            <span>Person</span>
                        </div>
                    }

                    {board.cmpsLabels.find(lable => lable.type === 'PriorityPicker') ?
                        <div className="label-type disabled">
                            <div className="img-container priority">
                                <img src="https://files.monday.com/euc1/photos/10162286/original/app_version_10162286_photo_2023_10_26_13_37_04.png?1731496844072" alt=""></img>
                            </div>
                            <span>Priority</span>

                        </div>
                        :
                        <div onClick={() => onAddLabel('Priority')} className="label-type">
                            <div className="img-container priority">
                                <img src="https://files.monday.com/euc1/photos/10162286/original/app_version_10162286_photo_2023_10_26_13_37_04.png?1731496844072" alt=""></img>
                            </div>

                            <span>Priority</span>
                        </div>
                    }
                    {board.cmpsLabels.find(lable => lable.type === 'DatePicker') ?
                        <div className="label-type disabled">
                            <div className="img-container date">
                                <img class="monday-column-icon-component__icon" src="https://cdn.monday.com/images/column-store/columns/date-column-icon.svg" alt=""></img>
                            </div>

                            <span>Date</span>
                        </div>
                        :
                        <div onClick={() => onAddLabel('Date')} className="label-type">
                            <div className="img-container date">
                                <img class="monday-column-icon-component__icon" src="https://cdn.monday.com/images/column-store/columns/date-column-icon.svg" alt=""></img>

                            </div>

                            <span>Date</span>
                        </div>
                    }

                    {board.cmpsLabels.find(lable => lable.type === 'ProgressBar') ?
                        <div className="label-type disabled">
                            <div className="img-container progress">
                                <img alt="" src="https://cdn.monday.com/images/column-store/columns/columns-battery-column-icon-v2a.png" class="TinyCard-module_logoImage__-7q6h tiny-card-logo-image" />                            </div>

                            <span>Progress</span>
                        </div>
                        :
                        <div onClick={() => onAddLabel('Progress')} className="label-type">
                            <div className="img-container progress">
                                <img alt="" src="https://cdn.monday.com/images/column-store/columns/columns-battery-column-icon-v2a.png" class="TinyCard-module_logoImage__-7q6h tiny-card-logo-image" />
                            </div>

                            <span>Progress</span>
                        </div>
                    }
                    {board.cmpsLabels.find(lable => lable.type === 'FilePicker') ?
                        <div className="label-type disabled">
                            <div className="img-container file">
                                <img class="monday-column-icon-component__icon" src="https://cdn.monday.com/images/column-store/columns/file-column-icon.svg" alt="" />                            </div>

                            <span>File</span>
                        </div>
                        :
                        <div onClick={() => onAddLabel('File')} className="label-type">
                            <div className="img-container file">
                                <img class="monday-column-icon-component__icon" src="https://cdn.monday.com/images/column-store/columns/file-column-icon.svg" alt="" />
                            </div>

                            <span>File</span>
                        </div>
                    }


                </div>
                :
                <div className="remove-label-modal">
                    <div onClick={onRemoveLabel} className="modal-line">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" class="icon_1360dfb99d icon_1dc60eb036 noFocusStyle_faf4efa4b1" data-testid="icon"><path d="M8.30035 1.86462C7.77994 1.86462 7.29477 2.08976 6.94732 2.46719C6.60179 2.84253 6.41724 3.33927 6.41724 3.84552V4.32642H4.901H2.63477C2.22055 4.32642 1.88477 4.6622 1.88477 5.07642C1.88477 5.49063 2.22055 5.82642 2.63477 5.82642H4.151V16.1545C4.151 16.6608 4.33556 17.1575 4.68109 17.5328C5.02853 17.9103 5.51371 18.1354 6.03411 18.1354H13.9659C14.4863 18.1354 14.9715 17.9103 15.3189 17.5328C15.6645 17.1575 15.849 16.6608 15.849 16.1545V5.82642H17.3652C17.7794 5.82642 18.1152 5.49063 18.1152 5.07642C18.1152 4.6622 17.7794 4.32642 17.3652 4.32642H15.099H13.5828V3.84552C13.5828 3.33927 13.3982 2.84253 13.0527 2.46719C12.7053 2.08976 12.2201 1.86462 11.6997 1.86462H8.30035ZM7.16447 5.82642C7.16539 5.82642 7.16631 5.82642 7.16724 5.82642H12.8328C12.8337 5.82642 12.8346 5.82642 12.8356 5.82642H14.349V16.1545C14.349 16.3012 14.2948 16.4306 14.2153 16.5169C14.1378 16.6012 14.0465 16.6354 13.9659 16.6354H6.03411C5.95348 16.6354 5.86223 16.6012 5.78468 16.5169C5.7052 16.4306 5.651 16.3012 5.651 16.1545V5.82642H7.16447ZM12.0828 4.32642V3.84552C12.0828 3.69887 12.0286 3.56943 11.9491 3.4831C11.8716 3.39886 11.7803 3.36462 11.6997 3.36462H8.30035C8.21972 3.36462 8.12847 3.39886 8.05091 3.4831C7.97144 3.56943 7.91724 3.69887 7.91724 3.84552V4.32642L12.0828 4.32642Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
                        <span>Delete</span>
                    </div>




                </div>
            }
        </section>
    )
}
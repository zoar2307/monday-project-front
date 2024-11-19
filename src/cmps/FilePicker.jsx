import React, { useState } from 'react'
import img from '../assets/img/img-icon.svg'
import trash from '../assets/img/trash-icon.svg'

import { useSelector } from 'react-redux'

export function FilePicker({ info, onUpdate }) {
    const board = useSelector(storeState => storeState.boardModule.currBoard)
    const [imageUrl, setImageUrl] = useState(info?.file?.url || null)
    const [selectedFileName, setSelectedFileName] = useState(info?.file?.name || null)
    const [isModalOpen, setModalOpen] = useState(false)

    const handleFileSelect = async (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setSelectedFileName(file.name)
            const url = await uploadImgToCloudinary(file)
            if (url) {
                setImageUrl(url)
                onUpdate({ file: { url, name: file.name } })
                showSuccessMsg('Image updated successfully')
            }
        } else {
            alert('Please select a valid image file')
            showErrorMsg('Make sure you selected a valid image')
        }
    }

    const uploadImgToCloudinary = async (file) => {
        const CLOUD_NAME = 'drj1liym1'
        const UPLOAD_PRESET = 'Sundae_upload'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', UPLOAD_PRESET)

        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            return data.secure_url
        } catch (err) {
            // console.error('Error uploading image:', err)
            showErrorMsg('Failed uploading image')
            return null
        }
    }

    const handleImageClick = () => {
        setModalOpen(true)
    }

    const handleDeleteImage = () => {
        setImageUrl(null)
        setSelectedFileName(null)
        onUpdate({ file: { url: null, name: null } })
        setModalOpen(false)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    return (
        <div className='label-container' style={{ position: 'relative' }}>
            <div className='label file not-header'>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        className='img-preview'
                        onClick={handleImageClick}
                    />
                ) : (
                    <label>
                        Select an Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                    </label>
                )}
            </div>

            {isModalOpen && (
                <div className='img-modal-overlay'>
                    <div className='img-modal-content'>
                        <header>
                            <img src={img} alt="Image Icon" />
                            <div>
                                <h1>{selectedFileName}</h1>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="20" height="20" aria-hidden="true">
                                        <path d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="gray" />
                                    </svg>
                                    {board.title}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" width="17" height="17">
                                        <path d="M13.5303 9.46967L13 10L13.5303 10.5303C13.8232 10.2374 13.8232 9.76256 13.5303 9.46967ZM11.9393 10L5.46967 16.4697C5.17678 16.7626 5.17678 17.2374 5.46967 17.5303C5.76256 17.8232 6.23744 17.8232 6.53033 17.5303L13.5303 10.5303L13 10L13.5303 9.46967L6.53033 2.46967C6.23744 2.17678 5.76256 2.17678 5.46967 2.46967C5.17678 2.76256 5.17678 3.23744 5.46967 3.53033L11.9393 10Z" fill="currentColor" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                        <path d="M16 4.5H7.5L7.5 15.5H16C16.2761 15.5 16.5 15.2761 16.5 15V5C16.5 4.72386 16.2761 4.5 16 4.5ZM4 4.5H6L6 15.5H4C3.72386 15.5 3.5 15.2761 3.5 15V5C3.5 4.72386 3.72386 4.5 4 4.5ZM4 3C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4ZM15 9V7L9 7V9H15Z" fill="currentColor" />
                                    </svg>
                                    {info.title}
                                </p>
                            </div>
                            <div className='close-btn-modal-img'>
                                <svg onClick={handleDeleteImage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="25" height="25" aria-hidden="true" class="icon_1360dfb99d icon_1dc60eb036 noFocusStyle_faf4efa4b1" data-testid="icon"><path d="M8.30035 1.86462C7.77994 1.86462 7.29477 2.08976 6.94732 2.46719C6.60179 2.84253 6.41724 3.33927 6.41724 3.84552V4.32642H4.901H2.63477C2.22055 4.32642 1.88477 4.6622 1.88477 5.07642C1.88477 5.49063 2.22055 5.82642 2.63477 5.82642H4.151V16.1545C4.151 16.6608 4.33556 17.1575 4.68109 17.5328C5.02853 17.9103 5.51371 18.1354 6.03411 18.1354H13.9659C14.4863 18.1354 14.9715 17.9103 15.3189 17.5328C15.6645 17.1575 15.849 16.6608 15.849 16.1545V5.82642H17.3652C17.7794 5.82642 18.1152 5.49063 18.1152 5.07642C18.1152 4.6622 17.7794 4.32642 17.3652 4.32642H15.099H13.5828V3.84552C13.5828 3.33927 13.3982 2.84253 13.0527 2.46719C12.7053 2.08976 12.2201 1.86462 11.6997 1.86462H8.30035ZM7.16447 5.82642C7.16539 5.82642 7.16631 5.82642 7.16724 5.82642H12.8328C12.8337 5.82642 12.8346 5.82642 12.8356 5.82642H14.349V16.1545C14.349 16.3012 14.2948 16.4306 14.2153 16.5169C14.1378 16.6012 14.0465 16.6354 13.9659 16.6354H6.03411C5.95348 16.6354 5.86223 16.6012 5.78468 16.5169C5.7052 16.4306 5.651 16.3012 5.651 16.1545V5.82642H7.16447ZM12.0828 4.32642V3.84552C12.0828 3.69887 12.0286 3.56943 11.9491 3.4831C11.8716 3.39886 11.7803 3.36462 11.6997 3.36462H8.30035C8.21972 3.36462 8.12847 3.39886 8.05091 3.4831C7.97144 3.56943 7.91724 3.69887 7.91724 3.84552V4.32642L12.0828 4.32642Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
                                <svg onClick={handleCloseModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="35" height="35" role="button" aria-hidden="false">
                                    <path d="M6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L8.62562 9.68628L5.47045 12.8415C5.17756 13.1343 5.17756 13.6092 5.47045 13.9021C5.76334 14.195 6.23822 14.195 6.53111 13.9021L9.68628 10.7469L12.8415 13.9021C13.1343 14.195 13.6092 14.195 13.9021 13.9021C14.195 13.6092 14.195 13.1343 13.9021 12.8415L10.7469 9.68628L13.9029 6.53033C14.1958 6.23744 14.1958 5.76256 13.9029 5.46967C13.61 5.17678 13.1351 5.17678 12.8422 5.46967L9.68628 8.62562L6.53033 5.46967Z" fill="currentColor" />
                                </svg>
                            </div>
                        </header>

                        <img src={imageUrl} />
                    </div>
                </div>
            )}
        </div>
    )
}

import { useNavigate } from 'react-router'
import logo from '../assets/img/logo.png'
import { loadUsers, logout, updateUser } from '../store/actions/user.actions'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

export function BoardHeader({ isSidebarClosed }) {
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.user)
  const [imageUrl, setImageUrl] = useState('')
  const [selectedFileName, setSelectedFileName] = useState('')
  const [isUserModal, setIsUserModal] = useState('')
  const userModalRef = useRef()

  const handleClickOutside = (event) => {
    if (userModalRef.current && !userModalRef.current.contains(event.target)) {
      setIsUserModal(false)
    }
  }

  useEffect(() => {
    if (isUserModal) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserModal])

  function handleLogout() {
    try {
      logout()
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFileName(file.name)
      const url = await uploadImgToCloudinary(file)
      if (url) {
        // console.log(url)
        setImageUrl(url)
        await updateUser(user, url)
        loadUsers()
      }
    } else {
      alert('Please select a valid image file')
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
      console.error('Error uploading image:', err)
      return null
    }
  }

  if (!user) return <div></div>

  return (
    <>
      <header className="board-header flex justify-between align-center" style={{
        marginLeft: isSidebarClosed ? '40px' : '0',
        transition: 'margin-left 0.7s ease', // Adding a smooth transition
      }}>
        <div className="flex align-center">
          <div className='logo-container'>
            <img src={logo} alt="Logo" />
            <h1 className="logo-home-nav">Sundae</h1>
            <h2 className="logo-home-nav2">Work management</h2>
          </div>
        </div>
        <div className="board-header-btns flex  align-center">
          {/* <div>
            <button>
              <i className="fa-regular fa-bell"></i>
            </button>
            <button>
              <i className="fa-solid fa-inbox"></i>
            </button>
            <button>
              <i className="fa-solid fa-user-plus"></i>
            </button>
            <button>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div> */}
          <div className='right-side-container'>
            <button>
              <div onClick={() => setIsUserModal(prev => !prev)} class="right-logo-container">
                <img class="right-logo" src={logo} alt="Logo" />
                <img className='user-img' src={user.imgUrl} alt="" />
              </div>
            </button>
            {isUserModal && < div ref={userModalRef} className='user-modal'>
              <label>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" role="img" tabindex="0" aria-hidden="false" aria-label="My profile" class="icon_1360dfb99d icon-service-icon noFocusStyle_faf4efa4b1" data-testid="icon"><path d="M10.2501 2.0498C9.74254 2.0498 9.2399 2.14979 8.77093 2.34404 8.30196 2.53829 7.87584 2.82302 7.51691 3.18195 7.15798 3.54088 6.87325 3.967 6.679 4.43597 6.48475 4.90494 6.38477 5.40758 6.38477 5.91519 6.38477 6.4228 6.48475 6.92544 6.679 7.39441 6.87325 7.86338 7.15798 8.28949 7.51691 8.64843 7.87584 9.00736 8.30196 9.29209 8.77093 9.48634 9.2399 9.68059 9.74254 9.78057 10.2501 9.78057 10.7578 9.78057 11.2604 9.68059 11.7294 9.48634 12.1983 9.29208 12.6245 9.00736 12.9834 8.64843 13.3423 8.28949 13.627 7.86338 13.8213 7.39441 14.0156 6.92544 14.1155 6.4228 14.1155 5.91519 14.1155 5.40758 14.0156 4.90494 13.8213 4.43597 13.627 3.967 13.3423 3.54088 12.9834 3.18195 12.6245 2.82302 12.1983 2.53829 11.7294 2.34404 11.2604 2.14979 10.7578 2.0498 10.2501 2.0498zM9.34496 3.72986C9.63194 3.61099 9.93952 3.5498 10.2501 3.5498 10.5608 3.5498 10.8684 3.61099 11.1553 3.72986 11.4423 3.84873 11.7031 4.02296 11.9227 4.24261 12.1424 4.46226 12.3166 4.72301 12.4355 5.01 12.5544 5.29698 12.6155 5.60456 12.6155 5.91519 12.6155 6.22582 12.5544 6.5334 12.4355 6.82038 12.3166 7.10736 12.1424 7.36812 11.9227 7.58777 11.7031 7.80742 11.4423 7.98165 11.1553 8.10052 10.8684 8.21939 10.5608 8.28057 10.2501 8.28057 9.93952 8.28057 9.63194 8.21939 9.34496 8.10052 9.05798 7.98165 8.79722 7.80742 8.57757 7.58777 8.35792 7.36812 8.18369 7.10736 8.06482 6.82038 7.94595 6.5334 7.88477 6.22582 7.88477 5.91519 7.88477 5.60456 7.94595 5.29698 8.06482 5.01 8.18369 4.72301 8.35792 4.46226 8.57757 4.24261 8.79722 4.02296 9.05797 3.84873 9.34496 3.72986zM9.83935 10.7312C9.8512 10.7307 9.86306 10.7305 9.87491 10.7305H10.6247C10.6384 10.7305 10.652 10.7308 10.6655 10.7314 11.7943 10.7771 12.8913 11.0775 13.8525 11.6041 14.8151 12.1314 15.6096 12.8682 16.1604 13.7443 16.7113 14.6203 17.0003 15.6068 17 16.6097V17.2981C17 17.6856 16.6456 17.9997 16.2084 17.9997H10.6251L10.6201 17.9997H4.29163C3.85443 17.9997 3.5 17.6856 3.5 17.2981V16.6097C3.4997 15.6068 3.7887 14.6203 4.33955 13.7443 4.89044 12.8682 5.68491 12.1314 6.64751 11.6041 7.6101 11.0767 8.70884 10.7762 9.83935 10.7312zM9.89335 12.1337H10.6063C11.4613 12.1703 12.2918 12.3987 13.02 12.7977 13.753 13.1992 14.358 13.7602 14.7774 14.4274 15.1946 15.0907 15.4145 15.8372 15.4167 16.5965H10.6296L10.6247 16.5965H5.08328C5.08548 15.8372 5.30542 15.0907 5.72255 14.4273 6.14204 13.7602 6.747 13.1992 7.47999 12.7977 8.20811 12.3988 9.03853 12.1703 9.89335 12.1337zM5.08326 16.6066L5.08328 16.5965C5.08327 16.5998 5.08327 16.6032 5.08326 16.6066zM15.4167 16.6066C15.4167 16.6032 15.4167 16.5999 15.4167 16.5965L15.4167 16.6066z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                Update profile image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </label>
              <button onClick={handleLogout}>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" role="img" tabindex="0" aria-hidden="false" aria-label="Log out" class="icon_1360dfb99d icon-service-icon noFocusStyle_faf4efa4b1" data-testid="icon"><path d="M3.55928 3.60927C3.62925 3.53931 3.72414 3.5 3.82309 3.5H11.6846C11.7836 3.5 11.8785 3.53931 11.9484 3.60927C12.0184 3.67924 12.0577 3.77413 12.0577 3.87308V6.68077C12.0577 7.09498 12.3935 7.43077 12.8077 7.43077C13.2219 7.43077 13.5577 7.09498 13.5577 6.68077V3.87308C13.5577 3.37631 13.3604 2.89988 13.0091 2.54861C12.6578 2.19734 12.1814 2 11.6846 2H3.82309C3.32632 2 2.84989 2.19734 2.49862 2.54861C2.14735 2.89988 1.95001 3.37631 1.95001 3.87308V16.2269C1.95001 16.7237 2.14735 17.2001 2.49862 17.5514C2.84989 17.9027 3.32632 18.1 3.82309 18.1H11.6846C12.1814 18.1 12.6578 17.9027 13.0091 17.5514C13.3604 17.2001 13.5577 16.7237 13.5577 16.2269V13.4192C13.5577 13.005 13.2219 12.6692 12.8077 12.6692C12.3935 12.6692 12.0577 13.005 12.0577 13.4192V16.2269C12.0577 16.3259 12.0184 16.4208 11.9484 16.4907C11.8785 16.5607 11.7836 16.6 11.6846 16.6H3.82309C3.72414 16.6 3.62925 16.5607 3.55928 16.4907C3.48932 16.4208 3.45001 16.3259 3.45001 16.2269V3.87308C3.45001 3.77413 3.48932 3.67924 3.55928 3.60927Z" fill="currentColor"></path><path d="M15.0842 7.83509C15.3771 7.54219 15.852 7.54219 16.1449 7.83509L17.819 9.50916C17.961 9.64563 18.0493 9.83749 18.0493 10.05C18.0493 10.2612 17.9621 10.452 17.8216 10.5883L16.1449 12.265C15.852 12.5579 15.3771 12.5579 15.0842 12.265C14.7913 11.9721 14.7913 11.4972 15.0842 11.2043L15.4886 10.8H9.43781C9.02359 10.8 8.68781 10.4642 8.68781 10.05C8.68781 9.63577 9.02359 9.29999 9.43781 9.29999H15.4885L15.0842 8.89575C14.7913 8.60285 14.7913 8.12798 15.0842 7.83509Z" fill="currentColor"></path></svg>
                Logout</button>
            </div>}

          </div>
        </div>
      </header >
    </>
  )
}
import { useEffect, useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Svg1 from '../assets/img/asset174.svg'
import { login } from "../store/actions/user.actions"

export function HomePage() {
  const navigate = useNavigate()
  const [isFirst, setIsFirst] = useState(true)
  const [images, setImages] = useState([
    "./src/assets/img/homepageimgs/IMG_0029.jpeg",
    "./src/assets/img/homepageimgs/IMG_0030.jpeg",
    "./src/assets/img/homepageimgs/Screenshot 2024-11-08 at 14.25.43.png",
    "./src/assets/img/homepageimgs/Screenshot 2024-11-08 at 14.26.46.png",
    "./src/assets/img/homepageimgs/Screenshot 2024-11-08 at 14.27.16.png",
    "./src/assets/img/homepageimgs/Screenshot 2024-11-08 at 14.27.31.png",
  ])

  const heroSrc = [
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/projects.png',
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/Task.png',
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/Marketing.png',
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/Design.png',
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/CRM.png',
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/Product.png',
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/IT.png',
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/Operations.png',
    'https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Homepage - 2024/motion tabs/roadmap.png'
  ]

  const [credentials, setCredentials] = useState({
    username: "guest",
    password: "123",
  })

  const beehiveCards = [
    {
      title: 'Projects',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.88281 1.87549H13.1328C13.1328 1.87549 14.3828 1.87549 14.3828 3.12549V11.8755C14.3828 11.8755 14.3828 13.1255 13.1328 13.1255H1.88281C1.88281 13.1255 0.632812 13.1255 0.632812 11.8755V3.12549C0.632812 3.12549 0.632812 1.87549 1.88281 1.87549Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.632812 5.61993H14.3828" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.8823 5.61993V14.3699C16.8823 14.7015 16.7507 15.0194 16.5162 15.2538C16.2818 15.4882 15.9638 15.6199 15.6323 15.6199H4.38232" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.3826 8.11621V16.8662C19.3826 17.1978 19.2509 17.5157 19.0165 17.7501C18.7821 17.9845 18.4641 18.1162 18.1326 18.1162H6.88257" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      isSelected: true
    },
    {
      title: 'Tasks',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.87871 2.92523H16.2731C16.2731 2.92523 17.2265 2.92523 17.2265 3.87865V16.273C17.2265 16.273 17.2265 17.2264 16.2731 17.2264H3.87871C3.87871 17.2264 2.92529 17.2264 2.92529 16.273V3.87865C2.92529 3.87865 2.92529 2.92523 3.87871 2.92523Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.24429 6.10449L6.41373 8.54523L5.19336 7.32487" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.5059 7.68658H14.3661" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.24429 11.5956L6.41373 14.0364L5.19336 12.816" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.5059 13.4136H14.3661" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      isSelected: false
    },
    {
      title: 'Marketing',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.87023 11.7385H4.17756C3.42936 11.7385 2.71179 11.4412 2.18273 10.9122C1.65367 10.3831 1.35645 9.6656 1.35645 8.91737C1.35645 8.16913 1.65367 7.4516 2.18273 6.92254C2.71179 6.39348 3.42936 6.09625 4.17756 6.09625H5.87023V11.7385Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.87012 11.735C9.18105 11.7353 12.418 12.7153 15.173 14.5516L16.0261 15.1204V2.70746L15.173 3.2762C12.418 5.11251 9.18105 6.09252 5.87012 6.0928V11.735Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.2825 7.78906V10.046" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.87012 11.7385C5.86964 12.4772 6.01945 13.2083 6.31045 13.8873C6.60144 14.5663 7.02753 15.179 7.56279 15.6881" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      isSelected: false
    },
    {
      title: 'Design',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.9521 16.8926H3.92617C3.68054 16.8926 3.44496 16.795 3.27127 16.6214C3.09758 16.4477 3 16.212 3 15.9664V3.92617C3 3.68054 3.09758 3.44496 3.27127 3.27127C3.44496 3.09758 3.68054 3 3.92617 3H15.9664C16.212 3 16.4477 3.09758 16.6214 3.27127C16.795 3.44496 16.8926 3.68054 16.8926 3.92617V10.9521C16.8925 11.1976 16.795 11.433 16.6215 11.6066L11.6066 16.6215C11.433 16.795 11.1976 16.8925 10.9521 16.8926Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.3362 16.8124V12.2649C11.3362 12.0193 11.4337 11.7837 11.6074 11.61C11.7811 11.4363 12.0167 11.3387 12.2624 11.3387H16.8099" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.70483 6.70087H14.1142" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.70483 9.48566H9.94644" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      isSelected: false
    },
    {
      title: 'CRM',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1518_54207)"><path d="M11.8333 12.673V15.173L14.8333 12.673H16.8333C17.0985 12.673 17.3529 12.5677 17.5404 12.3802C17.7279 12.1926 17.8333 11.9382 17.8333 11.673V3.67303C17.8333 3.40782 17.7279 3.15346 17.5404 2.96593C17.3529 2.77839 17.0985 2.67303 16.8333 2.67303H8.83325C8.56804 2.67303 8.31368 2.77839 8.12615 2.96593C7.93861 3.15346 7.83325 3.40782 7.83325 3.67303" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.98389 8.38837C2.80415 9.23838 3.86385 9.81838 5.02193 10.0512C6.18 10.284 7.38152 10.1586 8.46659 9.69171" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.49976 10.168C1.49976 11.0962 1.8685 11.9864 2.52488 12.6428C3.18126 13.2992 4.0715 13.668 4.99976 13.668C5.92802 13.668 6.81825 13.2992 7.47463 12.6428C8.13102 11.9864 8.49976 11.0962 8.49976 10.168C8.49976 9.2397 8.13102 8.34948 7.47463 7.6931C6.81825 7.03672 5.92802 6.66797 4.99976 6.66797C4.0715 6.66797 3.18126 7.03672 2.52488 7.6931C1.8685 8.34948 1.49976 9.2397 1.49976 10.168Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.1164 17.6691C9.12289 16.3927 7.68802 15.534 6.09364 15.2616C4.49926 14.9893 2.86065 15.3229 1.49976 16.1971" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.6667 9.99524H10.3334" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.9998 5.33551H12.8664V10.0022H14.9998V5.33551Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.8674 7.04608H10.7341V10.0016H12.8674V7.04608Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1518_54207"><rect width="18" height="16" fill="white" transform="translate(1 2)"/></clipPath></defs></svg>',
      isSelected: false
    },
    {
      title: 'Software',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.8139 15.8139C16.8139 16.0567 16.7175 16.2895 16.5458 16.4611C16.3742 16.6327 16.1413 16.7292 15.8986 16.7292H4.91528C4.67253 16.7292 4.43972 16.6327 4.26808 16.4611C4.09643 16.2895 4 16.0567 4 15.8139V3.91528C4 3.67253 4.09643 3.43972 4.26808 3.26808C4.43972 3.09643 4.67253 3 4.91528 3H14.0955C14.3345 3.00003 14.564 3.09354 14.735 3.26055L16.5381 5.0191C16.6255 5.10442 16.6948 5.20635 16.7422 5.3189C16.7896 5.43144 16.814 5.55233 16.8139 5.67444V15.8139Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.8066 8.04395L14.0948 10.3321L11.8066 12.6203" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.06163 8.04395L6.77344 10.3321L9.06163 12.6203" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      isSelected: false
    },
    {
      title: 'IT',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1518_54236)"><path d="M16.6401 11.9388V5.14156C16.6401 4.86422 16.53 4.59822 16.3338 4.40211C16.1377 4.206 15.8717 4.09583 15.5944 4.09583H5.13704C4.8597 4.09583 4.59371 4.206 4.3976 4.40211C4.20149 4.59822 4.09131 4.86422 4.09131 5.14156V11.9388H16.6401Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.1184 15.1721C18.1891 15.3314 18.219 15.5057 18.2052 15.6794C18.1914 15.8531 18.1345 16.0206 18.0395 16.1666C17.9446 16.3128 17.8146 16.4328 17.6615 16.5158C17.5083 16.5989 17.3369 16.6424 17.1626 16.6424H3.56809C3.39385 16.6424 3.22238 16.5989 3.06924 16.5158C2.91611 16.4328 2.78615 16.3128 2.69119 16.1666C2.59623 16.0206 2.53927 15.8531 2.52549 15.6794C2.51171 15.5057 2.54155 15.3314 2.61228 15.1721L4.09095 11.9366H16.6397L18.1184 15.1721Z" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.3208 14.5527H11.4123" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1518_54236"><rect width="16.7317" height="16.7317" fill="white" transform="translate(2 2)"/></clipPath></defs></svg>',
      isSelected: false
    },
    {
      title: 'Operations',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.4163 10.0533C13.4033 10.8686 13.0704 11.6461 12.4893 12.218C11.9082 12.7899 11.1255 13.1105 10.3102 13.1105C9.49483 13.1105 8.71221 12.7899 8.13111 12.218C7.55001 11.6461 7.21706 10.8686 7.2041 10.0533" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.6875 10.0393V11.207L16.3525 11.474C16.1985 12.1212 15.9404 12.7391 15.5885 13.3036L16.3494 14.4376L14.7003 16.0866L13.5672 15.3257C13.0025 15.6807 12.3833 15.9405 11.7344 16.0945L11.4706 17.4224H9.14618L8.88154 16.0945C8.23284 15.9403 7.61391 15.6806 7.0495 15.3257L5.91322 16.0835L4.26417 14.4344L5.02509 13.3005C4.67286 12.736 4.41455 12.1181 4.26024 11.4708L2.92529 11.2039V10.0393" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.4163 9.57697C13.4033 8.7617 13.0704 7.98421 12.4893 7.41231C11.9082 6.8404 11.1255 6.51986 10.3102 6.51986C9.49483 6.51986 8.71221 6.8404 8.13111 7.41231C7.55001 7.98421 7.21706 8.7617 7.2041 9.57697" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.6875 9.57697V8.40928L16.3525 8.14229C16.1985 7.49507 15.9404 6.87715 15.5885 6.31262L16.3494 5.1787L14.7003 3.52965L13.5672 4.29057C13.0025 3.93555 12.3833 3.67579 11.7344 3.5218L11.4706 2.19392H9.14618L8.88154 3.5218C8.23284 3.67594 7.61391 3.93563 7.0495 4.29057L5.91322 3.53279L4.26417 5.18184L5.02509 6.31577C4.67286 6.88029 4.41455 7.49821 4.26024 8.14543L2.92529 8.41242V9.57697" stroke="#676879" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      isSelected: false
    },
    {
      title: 'Product',
      svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1953_322815)"><path d="M10 15.3059H17.4286" stroke="#676879" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.3065 13.1835L17.429 15.3059L15.3065 17.4283" stroke="#676879" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.75574 4.16329C5.75574 4.58551 5.92347 4.99045 6.22202 5.289C6.52058 5.58756 6.92551 5.75529 7.34774 5.75529C7.76996 5.75529 8.17489 5.58756 8.47345 5.289C8.77201 4.99045 8.93974 4.58551 8.93974 4.16329C8.93974 3.74106 8.77201 3.33613 8.47345 3.03758C8.17489 2.73902 7.76996 2.57129 7.34774 2.57129C6.92551 2.57129 6.52058 2.73902 6.22202 3.03758C5.92347 3.33613 5.75574 3.74106 5.75574 4.16329Z" stroke="#676879" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9.4695C10 9.89173 10.1677 10.2967 10.4663 10.5952C10.7648 10.8938 11.1698 11.0615 11.592 11.0615C12.0142 11.0615 12.4192 10.8938 12.7177 10.5952C13.0163 10.2967 13.184 9.89173 13.184 9.4695C13.184 9.04728 13.0163 8.64235 12.7177 8.34379C12.4192 8.04523 12.0142 7.8775 11.592 7.8775C11.1698 7.8775 10.7648 8.04523 10.4663 8.34379C10.1677 8.64235 10 9.04728 10 9.4695Z" stroke="#676879" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.81677 15.3062C6.81677 15.7285 6.9845 16.1334 7.28306 16.4319C7.58162 16.7305 7.98655 16.8982 8.40877 16.8982C8.831 16.8982 9.23593 16.7305 9.53449 16.4319C9.83304 16.1334 10.0008 15.7285 10.0008 15.3062C10.0008 14.884 9.83304 14.4791 9.53449 14.1805C9.23593 13.882 8.831 13.7142 8.40877 13.7142C7.98655 13.7142 7.58162 13.882 7.28306 14.1805C6.9845 14.4791 6.81677 14.884 6.81677 15.3062Z" stroke="#676879" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.0004 9.46973H5.49015C3.87838 9.46973 2.57178 10.7763 2.57178 12.3881C2.57178 13.9999 3.87838 15.3065 5.49015 15.3065H6.81669" stroke="#676879" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.184 9.46953H14.7759C16.2411 9.46953 17.4289 8.28171 17.4289 6.81645C17.4289 5.35121 16.2411 4.16339 14.7759 4.16339H8.93909" stroke="#676879" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.75547 4.16339H2.57178" stroke="#676879" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1953_322815"><rect width="16" height="16" fill="white" transform="translate(2 2)"/></clipPath></defs></svg>',
      isSelected: false
    },
  ]

  const [currHeroImg, setCurrHeroImg] = useState(0)
  const [screenY, setScreenY] = useState(0)
  const timeRef = useRef()
  if (currHeroImg === beehiveCards.length) setCurrHeroImg(0)
  useEffect(() => {
    timeRef.current = setInterval(() => {
      setCurrHeroImg(prev => prev + 1)
    }, 4000);

    return () => {
      clearInterval(timeRef.current)
    }
  }, [])

  const shiftRight = () => {
    setImages((prevImages) => {
      const lastImage = prevImages.pop()
      return [lastImage, ...prevImages]
    })
  }

  const shiftLeft = () => {
    setImages((prevImages) => {
      const firstImage = prevImages.shift()
      return [...prevImages, firstImage]
    })
  }

  async function onGetStarted(ev) {
    ev.preventDefault()
    // setError("")

    // if (!credentials.username || !credentials.password) {
    //   setError("Please provide both username and password.")
    //   return
    // }

    try {
      const user = await login(credentials, navigate)
      if (user) navigate("/board")
    } catch (err) {
      console.error("Login failed:", err)
      // setError(err.message || "Login failed. Please try again.")
    }
  }



  return (
    <div className="homepage">

      <nav className="home-nav flex justify-between align-center">

        <div className="logo flex align-center">
          <img src="./src/assets/img/logo.png" alt="Logo" />
          <h1 className="logo-home-nav">Sundae</h1>
        </div>

        <div className="home-nav-right">
          <div className="navs flex align-center"  >
            {/* <NavLink to="/about">
              About us
            </NavLink> */}
            <NavLink to="auth/login">
              Log in
            </NavLink >
          </div>

          <div className="get-started-header">
            <NavLink to="/auth/signup">
              <button className="btn-nav">
                Get Started
                <span>
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      </nav >

      <div className="home-content flex flex-column align-center">
        <h1>Your go-to work platform</h1>
        <p>
          Streamline workflows and gain clear visibility across teams <br />
          to make strategic decisions with confidence
        </p>
        <NavLink to="/board">
          <button onClick={onGetStarted} className="btn-content">
            Get Started
            <span>
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        </NavLink>

        <div className="hero">
          <img src={heroSrc[currHeroImg]} alt="" />
          <div className="beehive">

            <div className="beehive-title">What can you manage with us?</div>

            {beehiveCards.map((card, idx) => {
              return (
                <div key={idx} className={`card ${idx === currHeroImg && 'selected'}`}>
                  <div
                    className="svg-container"
                    dangerouslySetInnerHTML={{ __html: card.svg }}></div>
                  {card.title}
                </div>
              )
            })}

            <div className="beehive-btn">
              <button onClick={onGetStarted} className="btn-nav ">
                Get Started
                <span>
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>



      <div className="carousel">
        <button className="carousel-btn left" onClick={shiftLeft}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="img-container">
          {images.map((src, index) => (

            <img key={index} src={src} />
          ))}
        </div>
        <button className="carousel-btn right" onClick={shiftRight}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div className="quote">
        “...it's going to do things you
        <br />didn't think were possible.”
      </div>

      <div className="video-container">
        <div className="video-content">
          <div className="cordions">
            <div className="cordion">
              <h4>Flexible to the extreme</h4>
              <p>Customize the platform to meet your most complex needs with drag-and-drop, from structuring a project to building robust workflows.</p>
              <div className="button-container">
                <button onClick={() => setIsFirst(true)} className="play-btn"><i class="fa-solid fa-play"></i></button>
              </div>
            </div>
            <div className="cordion">
              <h4>Adopted by anyone</h4>
              <p>From startups to enterprises, get up to speed with a platform that's quick to learn and easy to love.</p>
              <div className="button-container">
                <button onClick={() => setIsFirst(false)} className="play-btn"><i class="fa-solid fa-play"></i></button>
              </div>
            </div>
          </div>


        </div>


        <video
          autoPlay
          loop
          poster="./src/assets/img/logo.png"

          src={isFirst ?
            "https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/Generator_featured%20images/Homepage%20-%202024/motion-values/_Platform_values_flexability_OPT2.mp4"
            :
            "https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/Generator_featured%20images/Homepage%20-%202024/motion-values/_Platform_values_Adopted_by_anyone_2.mp4"}>
        </video>
      </div>


      <div className="about-container">
        <div className="black-bgc">
          <div className="left">
            <div className="logo">
              <img src="./src/assets/img/logo.png" alt="Logo" />
            </div>
            {/* <div className="title">The best task organizer</div> */}
          </div>
          <div className="paragraph">
            <p>sundae.com recognized as a Leader in the 2024 Magic Quadrant™ for <b>Adaptive Project Management and Reporting</b></p>
          </div>
        </div>

      </div>

      <div className="experience">
        <div className="experience-content ">
          <span> Experience the sundae.com <br />difference</span>
          <img src="https://res.cloudinary.com/drj1liym1/image/upload/v1731785982/t3syudxzyzcglq6rs9rz.png" alt="" />
          <img src="https://res.cloudinary.com/drj1liym1/image/upload/v1731773149/etgqjpbw5x9nvrsbwsle.jpg" alt="" />
          <img src="https://res.cloudinary.com/drj1liym1/image/upload/v1731712455/xnko0jgowesbjih92aza.jpg" alt="" />
        </div>
        <button onClick={onGetStarted} className="btn-nav ">
          Get Started
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </button>
      </div>

      <div className="footer">
        <div className="logo flex align-center">
          <img src="./src/assets/img/logo.png" alt="Logo" />
          <h1 className="logo-home-nav">Sundae</h1>
        </div>
      </div>


    </div >
  )
}

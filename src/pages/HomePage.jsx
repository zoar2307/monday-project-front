import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

export function HomePage() {
  const [images, setImages] = useState([
    "./src/assets/img/homepageimgs/IMG_0029.jpeg",
    "./src/assets/img/homepageimgs/IMG_0030.jpeg",
    "./src/assets/img/homepageimgs/Screenshot 2024-11-08 at 14.25.43.png",
    "./src/assets/img/homepageimgs/Screenshot 2024-11-08 at 14.26.46.png",
    "./src/assets/img/homepageimgs/Screenshot 2024-11-08 at 14.27.16.png",
    "./src/assets/img/homepageimgs/Screenshot 2024-11-08 at 14.27.31.png",
  ])

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

  return (
    <div className="homepage">
      <nav className="home-nav flex justify-between align-center">
        <div className="flex align-center">
          <img src="./src/assets/img/logo.png" alt="Logo" />
          <h1 className="logo-home-nav">Sundae</h1>
        </div>
        <div className="home-nav-right flex align-center">
          <NavLink to="/about">
            <p>About us</p>
          </NavLink>
          <p>Log in</p>
          <NavLink to="/auth/signup">
            <button className="btn-nav">
              Get Started
              <span>
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </button>
          </NavLink>
        </div>
      </nav>
      <div className="home-content flex flex-column align-center">
        <h1>Your go-to work platform</h1>
        <p>
          Streamline workflows and gain clear visibility across teams <br />
          to make strategic decisions with confidence
        </p>
        <NavLink to="/board-page">
          <button className="btn-content">
            Get Started <i className="fa-solid fa-arrow-right"></i>
          </button>
        </NavLink>
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
    </div>
  )
}

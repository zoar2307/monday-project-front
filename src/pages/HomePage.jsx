import { Link, NavLink } from "react-router-dom"

export function HomePage() {
  return (
    <div className="homepage">
      <nav className="home-nav flex justify-between align-center">
        <p>LOGO</p>
        <div className="home-nav-right flex align-center">
        <NavLink to="/about">
      <p>About us</p>
        </NavLink>
          <p>Log in</p>
          <NavLink to="/auth/signup">
            <button className="btn-nav">
              Get Started{" "}
              <span>
                <i class="fa-solid fa-arrow-right"></i>
              </span>{" "}
            </button>
          </NavLink>
        </div>
      </nav>
      <div className="home-content flex flex-column align-center">
        <h1>Your go-to work platform</h1>
        <p>
          Streamline workflows and gain clear visibility across teams <br></br>
          to make strategic decisions with confidence
        </p>
        <NavLink to="/auth/signup">
          <button className="btn-content">
            Get Started <i class="fa-solid fa-arrow-right"></i>{" "}
          </button>
        </NavLink>
      </div>
    </div>
  )
}

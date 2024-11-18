import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../store/actions/user.actions"
import { userService } from "../services/user/user.service.remote"
import logo from '../assets/img/logo.png'

export function Login() {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const fetchedUsers = await userService.getUsers()
            setUsers(fetchedUsers)
        } catch (err) {
            console.error("Failed to load users", err)
            setError("Unable to load users. Please try again later.")
        }
    }

    async function handleLogin(ev) {
        ev.preventDefault()
        setError("")

        if (!credentials.username || !credentials.password) {
            setError("Please provide both username and password.")
            return
        }

        try {
            const user = await login(credentials, navigate)
            if (user) navigate('/board')


        } catch (err) {
            console.error("Login failed:", err)
            setError(err.message || "Login failed. Please try again.")
        }
    }

    function handleChange({ target }) {
        const { name, value } = target
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <section className="login-page">
            <div className="login-header">
                <div className="logo flex align-center">
                    <img src={logo} alt="Logo" />
                    <h1 className="logo-home-nav">Sundae</h1>
                </div>
            </div>
            <div className="login-body">
                <h1>Log in to your account</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        {/* <label htmlFor="username">Username</label> */}
                        <input
                            className="btn"
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            className="btn"
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <div className="error-msg">{error}</div>}
                    <div className="login-container">

                        <button type="submit" className="login-button btn">
                            Login
                        </button>
                    </div>
                </form>
                <div className="login-footer">
                    <span>Don't have an account yet?</span> <span><a href="/auth/signup">Sign up</a></span>
                </div>
            </div>
        </section>
    )
}

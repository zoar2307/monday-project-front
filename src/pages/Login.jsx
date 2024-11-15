import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../store/actions/user.actions"
import { userService } from "../services/user/user.service.local"

export function Login() {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState({
        email: "",
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
            console.log(fetchedUsers)
            setUsers(fetchedUsers)
        } catch (err) {
            console.error("Failed to load users", err)
            setError("Unable to load users. Please try again later.")
        }
    }

    async function handleLogin(ev) {
        ev.preventDefault()
        setError("")

        if (!credentials.email || !credentials.password) {
            setError("Please provide both username and password.")
            return
        }

        try {
            const user = await login(credentials, navigate) 
            if (user) navigate("/board")
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
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <div className="error-msg">{error}</div>}
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </section>
    )
}

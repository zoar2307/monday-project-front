import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import signupImg1 from '../assets/img/welcome-to-monday.avif'
import { userService } from '../services/user/user.service.remote'
import { makeId } from '../services/util.service'
import { boardService } from '../services/board/board.service.local'
import { signup } from '../store/actions/user.actions'
export function Signup() {
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
        theme: 'light',

    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name, value } = target
        setForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    async function onSubmitSignup(ev) {
        ev.preventDefault()
        setError('')
        try {
            const userCred = {
                // email: form.email,
                username: form.username,
                password: form.password,
                fullname: form.fullname,
                theme: form.theme,
            }

            const user = await signup(userCred)
            if (user) navigate('/board')
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.')
        }
    }

    return (
        <section className="signup full">
            <div className="main-container">
                <div className="content">
                    <div className="signup-top">
                        <div className="signup-title">
                            <h1>Welcome to sundae.com</h1>
                        </div>
                        <h2>Get started - it's free. No credit card needed.</h2>
                    </div>

                    <div className="form-container">
                        <form onSubmit={onSubmitSignup}>
                            <div className="input-container">
                                <input
                                    className="btn"
                                    type="text"
                                    name="fullname"
                                    placeholder="Fullname"
                                    value={form.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    className="btn"
                                    type="username"
                                    name="username"
                                    placeholder="Username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    className="btn"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {error && <div className="error-msg">{error}</div>}
                            <div className="continue-container">

                                <button
                                    className="continue-button btn">
                                    Sign Up
                                </button>



                            </div>
                        </form>
                    </div>
                </div>
                <div className="signup-footer">
                    <span>Already have an account?</span> <span><a href="/auth/login">Log in</a></span>
                </div>
            </div >

            <div className="img-container">
                <img src={signupImg1} alt="Welcome" />
            </div>
        </section >
    )
}

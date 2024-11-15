import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import signupImg1 from '../assets/img/welcome-to-monday.avif'
import { userService } from '../services/user/user.service.local'
import { makeId } from '../services/util.service'
import { boardService } from '../services/board/board.service.local'
export function Signup() {
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
        theme: 'light',
        object: {
            project: {
                title: 'New Project',
                isStarred: false,
                archivedAt: null,
                createdBy: {
                    _id: '',
                    fullname: '',
                    imgUrl: ''
                },
                labels: [],
                members: [],
                groups: [],
                activities: [],
                cmpsLabels: [],
                updatedAt: null
            }
        }
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
                email : form.email,
                password: form.password,
                fullname: form.fullname,
                theme: form.theme,
            }

            await userService.signup(userCred)
            navigate('/board')
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
                            <h1>Welcome to monday.com</h1>
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
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
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
                                <button className="continue-button btn">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="signup-footer">
                    <span>Already have an account?</span> <span><a href="/login">Log in</a></span>
                </div>
            </div>

            <div className="img-container">
                <img src={signupImg1} alt="Welcome" />
            </div>
        </section>
    )
}

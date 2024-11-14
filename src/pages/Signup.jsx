import { Link } from 'react-router-dom'
import signupImg1 from '../assets/img/welcome-to-monday.avif'
import { useState } from 'react'

export function Signup() {

    function onSubmitEmail(ev) {
        ev.preventDefault()
    }

    return (
        <section className="signup .full">
            <div className="main-container">
                <div className="content">
                    <div className="signup-top">
                        <div className="signup-title">
                            <h1>Welcome to monday.com</h1>
                        </div>

                        <h2>Get started - it's free. No credit card needed.</h2>
                    </div>

                    <div className="form-container">
                        <div className="button-container">
                            <button className='google-button btn'>
                                <img className="google-svg" alt="Continue with Google" src="https://dapulse-res.cloudinary.com/image/upload/remote_logos/995426/google-icon.svg" />
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div className="or-container">
                            <div className="or-line"></div>
                            <div>Or</div>
                            <div className="or-line"></div>
                        </div>

                        <form onSubmit={onSubmitEmail}>
                            <div className="input-container">
                                <input className='btn' type="text" placeholder="Fullname" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                            </div>
                            <div className="input-container">
                                <input className='btn' type="text" placeholder="name@compamy.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                            </div>
                            <div className="input-container">
                                <input className='btn' type="text" placeholder="Password" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                            </div>

                            <div className="continue-container">
                                <button className='continue-button btn'>Continue</button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="signup-footer">
                    <span>Already have an account?</span> <span><Link>Log in</Link></span>
                </div>
            </div>



            <div className="img-container">
                <img src={signupImg1} alt="" />
            </div>
        </section>
    )
}
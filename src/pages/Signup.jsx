import welcomeSignUp from '../assets/img/welcome-to-monday.avif'

export function Signup() {
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
                            <button>
                                <img className="google-svg" alt="Continue with Google" src="https://dapulse-res.cloudinary.com/image/upload/remote_logos/995426/google-icon.svg" />
                                <span>Continue with Google</span>
                            </button>
                        </div>


                        <div className="or-container">
                            <div className="or-line"></div>
                            Or
                            <div className="or-line"></div>
                        </div>

                        <form >
                            <div className="input-container">
                                <input type="text" placeholder="name@compamy.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                            </div>

                            <div className="sign-up-button">
                                <button>Continue</button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="signup-footer">
                    <span>Already have an account?</span> <span>Log in</span>
                </div>
            </div>

            <div className="img-container">
                <img src={welcomeSignUp} alt="" />
            </div>
        </section>
    )
}
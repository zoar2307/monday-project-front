import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function BoardIndexHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [timeStr, setTimeStr] = useState('')

    useEffect(() => {
        const date = new Date('March 13, 15 3:20')

        if (date.getHours() < 12) setTimeStr('Good morning')
        else if (date.getHours() < 17) setTimeStr('Good afternoon')
        else if (date.getHours() > 17) setTimeStr('Good night')

    }, [])

    // if (hours < 12) setTimeStr('Good morning')

    return (
        <>
            <header className='second-header flex'>
                <div className='header-container flex'>
                    <div className='titles-container flex flex-column'>
                        <div className='welcome-message '>{timeStr} {user.fullname}!</div>
                        <div className='header-title'>Quickly access your boards</div>
                    </div>
                    <div className='header-img flex'>
                        <img src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg" alt="" />
                    </div>
                </div>
                {/* <div className='buttons-container'>
                    <div className="buttons">
                        <div className="feedback-button">
                            <span>Give feedback</span>
                        </div>

                    </div>
                </div> */}
            </header>
        </>)
}
import { useState } from "react"
import { useNavigate } from "react-router"
import { setBackdrop, setIsAddBoardModal } from "../store/actions/board.actions"
import { OpenAi } from "./OpenAi"

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    function onOpenNav() {
        setIsOpen(prev => !prev)
    }

    function onHome() {
        navigate('/board')
        setIsOpen(false)
    }

    function onAdd() {
        setBackdrop(true)
        setIsAddBoardModal(true)
        setIsOpen(false)
    }

    return (
        <section className="mobile-nav">
            <button onClick={onOpenNav} className={`more ${isOpen ? 'open' : 'close'}`}>
                <div className="l1"></div>
                <div className="l2"></div>
                <div className="l3"></div>
            </button>
            <button onClick={onHome} className={`home ${isOpen ? 'open' : 'close'}`}><svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true" tabIndex="-1" className="icon_e7210c37bd" data-testid="icon"><path d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></button>
            <button onClick={onAdd} className={`add ${isOpen ? 'open' : 'close'}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true" className="icon_e7210c37bd noFocusStyle_26dd7872ca" data-testid="icon"><g id="Icon / Basic / Add"><path id="Union" d="M10 2.25C10.4142 2.25 10.75 2.58579 10.75 3V9.25H17C17.4142 9.25 17.75 9.58579 17.75 10C17.75 10.4142 17.4142 10.75 17 10.75H10.75V17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17V10.75H3C2.58579 10.75 2.25 10.4142 2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H9.25V3C9.25 2.58579 9.58579 2.25 10 2.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></g></svg></button>
            <OpenAi isOpen={isOpen} />
        </section>
    )
}
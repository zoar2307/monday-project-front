import { useState } from "react"
import { useNavigate } from "react-router"
import { addAiBoard } from "../store/actions/board.actions"
import loader from '../assets/img/loader.gif'

export function OpenAi() {

    const [isModal, setIsModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})

    const navigate = useNavigate() // Initialize the navigate function

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setData(prevData => ({ ...prevData, [field]: value }))
    }



    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            setIsLoading(true)
            const savedBoard = await addAiBoard(data)
            if (savedBoard) {
                setIsModal(false)
                navigate(`/board/${savedBoard._id}`)
                setIsLoading(false)
                setData(prevData => ({ ...prevData, theme: '' }))
            }
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <section className="generate">
            <button onClick={() => setIsModal(true)}>Generate <i class="fa-solid fa-robot"></i></button>
            {isModal && <div onCanPlay={() => setIsModal(false)} className="backdrop"></div>}
            {isModal && <div className="gen-modal">
                <form onSubmit={onSubmit}>
                    <h2>Board Ai</h2>
                    <input onChange={handleChange} type="text" placeholder="Enter a theme" name="theme" />
                    <button><i class="fa-solid fa-wand-magic-sparkles"></i>
                    </button>
                    <button type="button" className="close" onClick={false}>x</button>
                </form>
                {isLoading && <img src={loader} alt="" />}
            </div>}
        </section>
    )
}
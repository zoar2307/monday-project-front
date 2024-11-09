import { useSelector } from "react-redux"
import { setBackdrop } from "../store/actions/board.actions"

export function BackDrop() {
    const backdrop = useSelector((state) => state.boardModule.backdrop)

    function onBackDrop() {
        setBackdrop(false)
    }

    if (!backdrop) return ''

    return (
        <section className="backdrop" onClick={onBackDrop}>

        </section>
    )
}
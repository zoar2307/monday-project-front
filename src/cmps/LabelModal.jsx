import { addLabel } from "../store/actions/board.actions"

export function LabelModal({ type, setLabelModal }) {


    async function onAddLabel(name) {
        await addLabel(name)
        setLabelModal(prev => ({ ...prev, isDisplay: false }))
    }

    console.log(type)
    return (
        <section className="label-modal">
            {type === 'add' ?
                <div className="add-label-modal">
                    <div onClick={() => onAddLabel('Status')} className="label-type">Status</div>
                    <div onClick={() => onAddLabel('Member')} className="label-type">Person</div>
                    <div onClick={() => onAddLabel('Priority')} className="label-type">Priority</div>
                    <div onClick={() => onAddLabel('Date')} className="label-type">Date</div>
                </div>
                :
                <div className="remove-label-modal">





                </div>
            }
        </section>
    )
}
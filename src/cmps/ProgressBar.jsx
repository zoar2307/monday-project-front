export function ProgressBar({ task }) {

    return (
        <section className="progress-bar label"
            style={{
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px',
                gap: '5px'
            }}
        >
            <div className="progress"
                style={{
                    backgroundColor: task.status === 'Done' ? '#00854d' : '#fff',
                    border: '2px solid #00854d',
                    width: '80%',
                    height: '100%',
                    borderRadius: '2px'
                }}>

            </div>
            <div style={{
                justifyContent: 'end',
                width: '30px',
                display: 'flex',
                alignItems: 'center'

            }}>
                <h2 style={{
                    fontSize: '13px',
                    fontFamily: 'Figtree',
                    fontWeight: 200,
                }}>{task.status === 'Done' ? 100 : 0}</h2>

                <h2 style={{
                    fontSize: '13px',
                    fontFamily: 'Figtree',
                    fontWeight: 200,

                }}>%</h2>
            </div>

        </section>
    )
}
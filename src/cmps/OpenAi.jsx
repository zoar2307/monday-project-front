import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { addAiBoard, saveBoardDemo } from "../store/actions/board.actions"
import loader from '../assets/img/loader.gif'
import { makeId } from "../services/util.service"
import { ADD_BOARD, SET_BOARD } from "../store/reducers/board.reducer"
import { useDispatch } from "react-redux"
import { boardService } from "../services/board/board.service.remote"

export function OpenAi() {

    const [isModal, setIsModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})

    const navigate = useNavigate() // Initialize the navigate function

    const timeOutRef = useRef()

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

    async function onSubmitDemo(ev) {
        ev.preventDefault()
        try {
            setIsLoading(true)

            const demoAiBoard = {
                "title": "Vacation Planner",
                "owner": {
                    "_id": "673c5da78af25152208746cb",
                    "fullname": "Avi Museri",
                    "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
                    "isAdmin": null
                },
                "isStarred": false,
                "archivedAt": null,
                "labels": [
                    {
                        "id": "l101",
                        "title": "Done",
                        "color": "#01c875",
                        "type": "status"
                    },
                    {
                        "id": "l102",
                        "title": "Stuck",
                        "color": "#e02f4b",
                        "type": "status"
                    },
                    {
                        "id": "l103",
                        "title": "Working on it",
                        "color": "#fdbb63",
                        "type": "status"
                    },
                    {
                        "id": "l104",
                        "title": "Bonus",
                        "color": "#b57ce3",
                        "type": "status"
                    },
                    {
                        "id": "l105",
                        "title": "Coming soon",
                        "color": "#7aaffd",
                        "type": "status"
                    },
                    {
                        "id": "l106",
                        "title": "High",
                        "color": "#6545a9",
                        "type": "priority"
                    },
                    {
                        "id": "l107",
                        "title": "Medium",
                        "color": "#777ae5",
                        "type": "priority"
                    },
                    {
                        "id": "l108",
                        "title": "Low",
                        "color": "#7aaffd",
                        "type": "priority"
                    },
                    {
                        "id": "l109",
                        "title": "Critical",
                        "color": "#5c5c5c",
                        "type": "priority"
                    }
                ],
                "members": [
                    {
                        "_id": "673c5da78af25152208746cb",
                        "fullname": "Avi Museri",
                        "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
                        "isAdmin": null
                    }
                ],
                "groups": [
                    {
                        "id": "g10b",
                        "title": "Preparation",
                        "color": "#ffbe00",
                        "tasks": [
                            {
                                "id": "ta1a",
                                "title": "Book Flights",
                                "assignedTo": [],
                                "status": "Working on it",
                                "priority": "High",
                                "conversation": []
                            },
                            {
                                "id": "ta1b",
                                "title": "Pack Bags",
                                "assignedTo": [],
                                "status": "Stuck",
                                "priority": "Medium",
                                "conversation": []
                            },
                            {
                                "id": "ta1c",
                                "title": "Research Destination",
                                "assignedTo": [],
                                "status": "Done",
                                "priority": "Low",
                                "conversation": []
                            }
                        ]
                    },
                    {
                        "id": "g10c",
                        "title": "On the Road",
                        "color": "#ff9000",
                        "tasks": [
                            {
                                "id": "ta2a",
                                "title": "Visit Sights",
                                "assignedTo": [],
                                "status": "Coming soon",
                                "priority": "High",
                                "conversation": []
                            },
                            {
                                "id": "ta2b",
                                "title": "Try Local Foods",
                                "assignedTo": [],
                                "status": "Working on it",
                                "priority": "Medium",
                                "conversation": []
                            },
                            {
                                "id": "ta2c",
                                "title": "Attend Local Events",
                                "assignedTo": [],
                                "status": "Bonus",
                                "priority": "Low",
                                "conversation": []
                            }
                        ]
                    },
                    {
                        "id": "g10d",
                        "title": "Post-Trip",
                        "color": "#ffa500",
                        "tasks": [
                            {
                                "id": "ta3a",
                                "title": "Share Photos",
                                "assignedTo": [],
                                "status": "Coming soon",
                                "priority": "Medium",
                                "conversation": []
                            },
                            {
                                "id": "ta3b",
                                "title": "Write Travel Blog",
                                "assignedTo": [],
                                "status": "Stuck",
                                "priority": "High",
                                "conversation": []
                            },
                            {
                                "id": "ta3c",
                                "title": "Unpack",
                                "assignedTo": [],
                                "status": "Done",
                                "priority": "Low",
                                "conversation": []
                            }
                        ]
                    }
                ],
                "activities": [],
                "cmpsLabels": [
                    {
                        "type": "MemberPicker",
                        "title": "Person",
                        "id": "edu0F",
                        "class": "members"
                    },
                    {
                        "type": "StatusPicker",
                        "title": "Status",
                        "id": "13Mkz",
                        "class": "status"
                    },
                    {
                        "type": "PriorityPicker",
                        "title": "Priority",
                        "id": "NJSgB",
                        "class": "priority"
                    },
                    {
                        "type": "DatePicker",
                        "class": "date",
                        "title": "Date",
                        "id": "sMywTO"
                    },
                    {
                        "type": "ProgressBar",
                        "class": "progress",
                        "title": "Progress",
                        "id": "7xaorb"
                    },
                    {
                        "type": "FilePicker",
                        "class": "file",
                        "title": "File",
                        "id": "D6vMaM"
                    }
                ]
            }

            const saved = await saveBoardDemo(demoAiBoard)
            if (saved) {
                timeOutRef = setTimeout(() => {
                    setIsLoading(true)
                    setIsModal(false)
                    navigate(`/board/${saved._id}`)
                }, 7000)
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
                <form onSubmit={onSubmitDemo}>
                    <h2>Board Ai</h2>
                    <input onChange={handleChange} type="text" placeholder="Enter a theme" name="theme" />
                    <button><i class="fa-solid fa-wand-magic-sparkles"></i>
                    </button>
                    <button type="button" className="close" onClick={() => setIsModal(false)}>x</button>
                </form>
                {isLoading && <img src={loader} alt="" />}
            </div>}
        </section>
    )
}
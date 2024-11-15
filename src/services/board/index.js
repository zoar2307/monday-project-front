const { DEV, VITE_LOCAL } = import.meta.env

// import { getRandomIntInclusive, makeId } from '../util.service'

import { boardService as local } from './board.service.remote'
import { boardService as remote } from './board.service.remote'

function getDefaultFilter() {
    return { title: "", status: "", priority: "", person: "" }
}


function getEmptyBoard() {
    return {
        isStarred: false,
        archivedAt: null,
        createdBy: {
            _id: "",
            fullname: "",
            imgUrl: "",
        },

        labels: [
            { id: "l101", title: "Done", color: "#01c875", type: "status" },
            { id: "l102", title: "Stuck", color: "#e02f4b", type: "status" },
            { id: "l103", title: "Working on it", color: "#fdbb63", type: "status" },
            { id: "l104", title: "Bonus", color: "#b57ce3", type: "status" },
            { id: "l105", title: "Coming soon", color: "#7aaffd", type: "status" },
            { id: "l106", title: "High", color: "#6545a9", type: "priority" },
            { id: "l107", title: "Medium", color: "#777ae5", type: "priority" },
            { id: "l108", title: "Low", color: "#7aaffd", type: "priority" },
            { id: "l109", title: "Critical", color: "#5c5c5c", type: "priority" }
        ],
        members: [],
        groups: [],
        activities: [],
        cmpsLabels: []
    }
}

const service = VITE_LOCAL === 'true' ? local : remote

VITE_LOCAL = false

export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService

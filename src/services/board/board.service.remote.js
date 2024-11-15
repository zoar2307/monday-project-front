import { httpService } from '../http.service'


const STORAGE_KEY = "boardDB"

export const boardService = {
    query,
    getById,
    save,
    remove,
}
window.cs = boardService

async function query(filterBy = { title: "", status: "", priority: "", person: "" }) {
    return httpService.get(`board`, filterBy)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)
    } else {
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}











async function query(filterBy = { title: "" }) {
    let boards = await storageService.query(STORAGE_KEY)
    const { title } = filterBy

    if (title) {
        const regex = new RegExp(title, "i")
        boards = boards.filter((board) => regex.test(board.title))
    }

    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    let savedBoard
    if (board._id) {
        const boardToSave = {
            ...board,
            updatedAt: Date.now(),
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const boardToSave = _createBoard(board)
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}


// function filterBoard(board, filters) {
//     let filteredGroups = filterGroupsByTasks(board.groups, filters)
//     filteredGroups = advancedFilter(filteredGroups, filters)
//     console.log(filteredGroups)

//     return {
//         ...board,
//         groups: filteredGroups,
//     };
// }

// function advancedFilter(groups, filters) {
//     groups = groups.map(group => {

//         if (filters.person.length > 0) {
//             let filteredTasks = group.tasks.map(task => {
//                 const assigned = [...task.assignedTo]
//                 const member = assigned.find(member => {
//                     if (filters.person.includes(member._id)) return member
//                 })
//                 if (member) {
//                     return task
//                 }
//             })
//             filteredTasks = filteredTasks.filter(task => !!task)
//             if (filteredTasks.length !== 0) group.tasks = filteredTasks
//             else group.tasks = []
//         }

//         if (filters.status.length > 0) {
//             let filteredTasks = group.tasks.map(task => {
//                 const taskStatus = task.status
//                 if (filters.status.includes(taskStatus)) return task
//             })
//             filteredTasks = filteredTasks.filter(task => !!task)
//             if (filteredTasks.length !== 0) group.tasks = filteredTasks
//             else group.tasks = []
//         }

//         if (filters.priority.length > 0) {
//             let filteredTasks = group.tasks.map(task => {
//                 const taskPriority = task.priority
//                 if (filters.priority.includes(taskPriority)) return task
//             })
//             filteredTasks = filteredTasks.filter(task => !!task)
//             if (filteredTasks.length !== 0) group.tasks = filteredTasks
//             else group.tasks = []
//         }

//         return group
//     })

//     return groups.filter(group => group.tasks)
// }

// function filterGroupsByTasks(groups, filters) {
//     return groups
//         .map(group => {
//             // Check if the group matches group-level filters
//             let groupMatches = (!filters.title || new RegExp(filters.title, "i").test(group.title))
//             // Filter tasks within the group based on task-level filters only if the group does not match
//             const filteredTasks = groupMatches ? group.tasks : filterEntities(group.tasks, filters)

//             // Only return the group if it matches group-level filters or contains matching tasks
//             if (groupMatches || filteredTasks.length > 0) {
//                 return { ...group, tasks: filteredTasks }
//             }

//             return null // Exclude groups that don't match and have no matching tasks
//         })
//         .filter(group => group) // Exclude null groups
// }

// function filterEntities(entities, filters) {
//     let filtered = entities
//     if (filters.title) {
//         const regex = new RegExp(filters.title, "i")
//         filtered = filtered.filter(entity => regex.test(entity.title))
//     }


//     return filtered
// }



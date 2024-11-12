// import { boardService } from "../../services/board/board.service.local"

// export const SET_TASKS = 'SET_TASKS'
// export const ADD_TASK = 'ADD_TASK'
// export const UPDATE_TASK = 'UPDATE_TASK'
// export const UPDATE_TASK_PRIORITY = 'UPDATE_TASK_PRIORITY'
// export const UPDATE_TASK_MEMBER = 'UPDATE_TASK_MEMBER'
// export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS'



// const initialState = {
//   tasks: [],
// }

// export function taskReducer(state = initialState, action = {}) {
//   let tasks
//   switch (action.type) {
//     // Tasks
//     case SET_TASKS:
//       return { ...state, tasks: action.tasks }

//     case ADD_TASK:
//       return {
//         ...state,
//         tasks: [...state.tasks, { ...action.task, groupId: action.groupId }],
//       }

//     case UPDATE_TASK:
//       tasks = state.tasks.map((task) =>
//         task.id === action.task.id ? { ...task, ...action.task } : task
//       )
//       return { ...state, tasks }

//     case UPDATE_TASK_STATUS:
//       tasks = state.tasks.map((task) =>
//         task.id === action.task.id ? { ...task, status: action.task.status } : task
//       )
//       return { ...state, tasks }

//     case UPDATE_TASK_PRIORITY:
//       tasks = state.tasks.map((task) =>
//         task.id === action.task.id ? { ...task, priority: action.task.priority } : task
//       )
//       return { ...state, tasks }

//     case UPDATE_TASK_MEMBER:
//       tasks = state.tasks.map((task) =>
//         task.id === action.task.id ? { ...task, assignedTo: action.task.assignedTo } : task
//       )
//       return { ...state, tasks }

//     default:
//       return state
//   }
// }

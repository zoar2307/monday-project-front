export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const UPDATE_TASK_PRIORITY = 'UPDATE_TASK_PRIORITY'
export const UPDATE_TASK_MEMBER = 'UPDATE_TASK_MEMBER'

const initialState = {
  tasks: [],
}

export function taskReducer(state = initialState, action = {}) {
  let tasks
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.task, groupId: action.groupId }],
      }

    case UPDATE_TASK:
      tasks = state.tasks.map((task) =>
        task.id === action.task.id ? { ...task, ...action.task } : task
      )
      return { ...state, tasks }

    case UPDATE_TASK_PRIORITY:
      tasks = state.tasks.map((task) =>
        task.id === action.task.id ? { ...task, priority: action.task.priority } : task
      )
      return { ...state, tasks }

    case UPDATE_TASK_MEMBER:
      tasks = state.tasks.map((task) =>
        task.id === action.task.id ? { ...task, assignedTo: action.task.assignedTo } : task
      )
      return { ...state, tasks }

    default:
      return state
  }
}

import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { boardReducer } from "./reducers/board.reducer.js"
import { groupReducer } from "./reducers/group.reducer.js"

// const { createStore, compose, combineReducers } = Redux

const rootReducer = combineReducers({
    boardModule: boardReducer,
    groupModule: groupReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store

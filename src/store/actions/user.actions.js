import { socketService } from '../../services/socket.service'
import { userService } from '../../services/user/user.service.remote'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from '../reducers/user.reducer'
import { store } from '../store'

export async function loadUsers() {
    try {
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.error('UserActions: error in loadUsers', err)
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
        loadUsers()

    } catch (err) {
        console.error('UserActions: error in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        console.log(credentials);

        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        loadUsers()
        return user
    } catch (err) {
        console.error("Cannot login", err)
        throw err
    }
}
export async function loginGoogle(token) {
    try {
        const user = await userService.loginGoogle(token)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        loadUsers()
        return user
    } catch (err) {
        console.error("Cannot login", err)
        throw err
    }
}


export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        loadUsers()
        return user
    } catch (err) {
        console.error("Cannot signup", err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        socketService.logout()
    } catch (err) {
        console.error("Cannot logout", err)
        throw err
    }
}

export async function updateUser(user, url) {
    try {
        user.imgUrl = url
        console.log(`user-action:`, user)
        await userService.update(user)
        store.dispatch({ type: SET_USER, user: user })
        loadUsers()
    } catch (err) {
        console.error("Cannot logout", err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        console.error('Cannot load user', err)
    }
}

import jwtDecode from "jwt-decode";
import {IJwtDecoded} from "../../apis/signon/login";
import {AccessToken, IAuthState} from "./AuthProvider";

export const STORAGE_KEY = '__loginAuth'

export function setStateToStorage (state: IAuthState) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    // for request-wrapper
    window.localStorage.setItem('jwt', state.accessToken || '')
}

export function getStateFromStorage (): IAuthState | null {
    const storage = window.localStorage.getItem(STORAGE_KEY)
    if (!storage) {
        return null
    }
    return JSON.parse(storage)
}

export function clearStorage () {
    window.localStorage.clear()
}

/**
 * returns true if expired, false if still active
 * @param token - JWT
 * @returns {boolean}
 */
export function jwtIsExpired (token: AccessToken) {
    try {
        // if jwt is not expired then user is still authorized
        const decoded = jwtDecode<IJwtDecoded>(token)
        const expiration = decoded.exp * 1e3 // convert to ms
        return (Date.now() - expiration) > 0
    } catch (err) {
        console.error(`Error validating JWT: ${token}`, err)
        return true
    }
}

export function isAuthorized (state: IAuthState): boolean {
    // check state first
    if (state.authorized && state.accessToken) {
        return !jwtIsExpired(state.accessToken)
    }
    // if no state, check localStorage for cached state
    const storage = getStateFromStorage()
    if (storage) {
        if (storage.accessToken) {
            return !jwtIsExpired(storage.accessToken)
        }
    }
    // return false by default
    return false
}

export const storeJWT = (token: AccessToken) => {
    try {
        window.localStorage.setItem('jwt', token)
    } catch (err) {
        console.error(`Failed to set jwt to localstorage: ${err.message}`)
    }
}
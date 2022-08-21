import jwtDecode from 'jwt-decode'
import { IJwtDecoded } from '../../apis/signon/login'
import { AccessToken, IAuthState } from './AuthProvider'

export const LOCAL_STORAGE_AUTH_KEY = '__loginAuth'
export const LOCAL_STORAGE_JWT_KEY = '__jwt'

export function setStateToStorage (state: IAuthState) {
  console.log('Setting auth state to localStorage...')
  window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(state))
  // for request-wrapper
  storeJWT(state.authUser?.['accessToken'] || '')
}

export const storeJWT = (token: AccessToken) => {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_JWT_KEY, token)
  } catch (err) {
    console.error(`Failed to set jwt to localstorage: ${err.message}`)
  }
}
export function getStateFromStorage (): IAuthState | null {
  const storage = window.localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
  if (!storage) {
    return null
  }
  return JSON.parse(storage)
}

export function clearStorage () {
  window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
  window.localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)
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

export function isAuthorized (accessToken?: string): boolean {
  // check state first
  if (accessToken) {
    return !jwtIsExpired(accessToken)
  }
  // if no state, check localStorage for cached state
  const storage = getStateFromStorage()
  if (storage) {
    if (storage.authUser?.accessToken) {
      return !jwtIsExpired(storage.authUser?.accessToken)
    }
  }
  // return false by default
  return false
}

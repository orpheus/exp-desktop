import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import jwtDecode from 'jwt-decode'
import usePageTimeout, { minutes } from '../hooks/usePageTimeout'
import { IJwtDecoded } from '../apis/signon/login'

export const LoginAuthCtx = React.createContext({})
export const useLoginAuth = () => {
  const ctx = useContext(LoginAuthCtx)
  if (!ctx) {
    throw new Error('useLoginAuth must be used within a LoginAuthProvider')
  }
  return ctx
}

const STORAGE_KEY = '__loginAuth'

export const initialState: ILoginAuthState = {
  accessToken: '',
  authorized: false,
  user: undefined,
}

/**
 * Handles user object, token, and authorized state.
 * Provides these globally through context.
 * Handles state/user persistence on page re-locations.
 * Initiates a page timeout and logout
 */
export default function LoginAuthProvider ({ children }: ProviderProps) {
  const [state, setState] = useState(initialState)
  const authorized = useMemo(() => isAuthorized(state), [state])
  const [cacheCleanup, setCacheCleanup] = useState({ time: 0 })

  const cacheLoginState = useCallback(() => {
    // set the state to localStorage and mark this current tab as 'caching'
    setStateToStorage(state)
    // cleanup cache in a minute
    setCacheCleanup({ time: 60 * 1000 })
  }, [state])

  /**
   * Safely clean up user cache with a timer
   */
  useEffect(() => {
    function handler () {
      if (localStorage.getItem(STORAGE_KEY)) {
        console.log('Cleanup user cache.')
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    if (cacheCleanup.time > 0) {
      const id = setTimeout(handler, cacheCleanup.time)
      return () => { clearTimeout(id) }
    }
    // set to an object so the timer will re-trigger on changes
  }, [cacheCleanup])

  /**
   * On unload/before refresh, cache user state
   */
  useEffect(() => {
    window.onunload = () => {
      console.log('Window Unloading: Caching User State')
      cacheLoginState()
    }
  }, [cacheLoginState])

  const logout = useCallback(() => {
    setState(initialState)
    clearStorage()
  }, [])

  // ON_APP_MOUNT_ONLY, check the token expiration authentication variable
  // if token is expired or user authentication is false, then logout, clearing state, and rerouting to login page
  useEffect(() => {
    console.log('App Mounted: Authorized With Valid Token:',
      JSON.stringify(authorized))
    if (!authorized) {
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Add a window event listener to check for authorization on window refocus
   */
  useEffect(() => {
    const handleFocus = () => {
      console.log('Window Refocused: Authorized With Valid Token:', authorized)
      if (!authorized) {
        logout()
      }
    }
    window.addEventListener('focus', handleFocus, false)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [authorized, logout])

  const setLoginData = useCallback((state: ILoginAuthState) => {
    setState(state)
  }, [])

  const authorize = useCallback((authorized: boolean) => {
    setState((state: ILoginAuthState) => {
      return {
        ...state,
        authorized,
      }
    })
  }, [])

  usePageTimeout({
      logout,
      activate: Boolean(state.user),
      duration: minutes(60),
    },
  )

  const contextValue = useMemo(() => ({
    state,
    setLoginData,
    authorize,
    authorized,
    logout,
    cacheLoginState,
  }), [state, setLoginData, authorize, authorized, logout, cacheLoginState])

  return <LoginAuthCtx.Provider value={contextValue}>
    {children}
  </LoginAuthCtx.Provider>
}

function setStateToStorage (state: ILoginAuthState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  // for request-wrapper
  window.localStorage.setItem('jwt', state.accessToken)
}

function getStateFromStorage (): ILoginAuthState {
  const storage = window.localStorage.getItem(STORAGE_KEY)
  if (!storage) {
    throw Error('Could not find login state storage in localStorage')
  }
  return JSON.parse(storage)
}

function clearStorage () {
  window.localStorage.clear()
}

/**
 * returns true if expired, false if still active
 * @param token - JWT
 * @returns {boolean}
 */
function jwtIsExpired (token: AccessToken) {
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

function isAuthorized (state: ILoginAuthState) {
  // check state first
  if (state.authorized) {
    return !jwtIsExpired(state.accessToken)
  }
  // if no state, check localStorage for cached state
  if (getStateFromStorage()?.authorized) {
    return !jwtIsExpired(getStateFromStorage().accessToken)
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

type AccessToken = string

interface ILoginAuthState {
  accessToken: AccessToken
  authorized: boolean
  user?: object
}

interface ProviderProps {
  children?: React.ReactElement[] | React.ReactElement
}

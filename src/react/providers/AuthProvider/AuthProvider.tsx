import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import usePageTimeout, { minutes } from '../../hooks/usePageTimeout'
import { IUser } from '../../apis/signon/login'
import { clearStorage, isAuthorized, setStateToStorage } from './authHelpers'

export interface IAuthState {
  authUser?: IUser
}

export const initialAuthState: IAuthState = {
  authUser: undefined,
}

export const AuthCtx = React.createContext<IAuthCtxPayload>({
  authState: initialAuthState,
  authorized: false,
  logout: () => null,
  authorizeUser: () => null,
  cacheLoginState: () => null,
})

export const useAuth = (): IAuthCtxPayload => {
  const ctx = useContext(AuthCtx)
  if (!ctx) {
    throw new Error('useLoginAuth must be used within a LoginAuthProvider')
  }
  return ctx
}

/**
 * Handles user object, token, and authorized state.
 * Provides these globally through context.
 * Handles state/user persistence on page re-locations.
 * Initiates a page timeout and logout
 */
export default function AuthProvider ({ children }: ProviderProps) {
  // The Auth User
  const [authState, setAuthState] = useState<IAuthState>(initialAuthState)
  // Whether that User has valid access
  const authorized = useMemo<boolean>(
    () => isAuthorized(authState.authUser?.accessToken),
    [authState])
  // Cache cleanup timer
  const [cacheCleanup, setCacheCleanup] = useState({ time: 0 })

  const cacheLoginState = useCallback(() => {
    // set the state to localStorage and mark this current tab as 'caching'
    console.log('Caching login state...')
    setStateToStorage(authState)
    // cleanup cache in a minute
    setCacheCleanup({ time: 60 * 1000 })
  }, [authState])

  /**
   * Safely clean up user cache with a timer
   */
  useEffect(() => {
    function handler () {
      clearStorage()
    }

    if (cacheCleanup.time > 0) {
      const id = setTimeout(handler, cacheCleanup.time)
      return () => {
        clearTimeout(id)
      }
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
    setAuthState(initialAuthState)
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

  const authorizeUser = useCallback((user: IUser) => {
    setAuthState({
      authUser: user,
    })
  }, [])

  usePageTimeout({
      logout,
      activate: Boolean(authState.authUser),
      duration: minutes(60),
    },
  )

  const contextValue = useMemo(() => ({
    authState,
    authorizeUser,
    authorized,
    logout,
    cacheLoginState,
  }), [authState, authorized, authorizeUser, logout, cacheLoginState])

  return <AuthCtx.Provider value={contextValue}>
    {children}
  </AuthCtx.Provider>
}

export type AccessToken = string

export interface IAuthCtxPayload {
  authState: IAuthState
  authorizeUser: (user: IUser) => void
  authorized: boolean
  logout: () => void
  cacheLoginState: () => void
}

interface ProviderProps {
  children?: React.ReactElement[] | React.ReactElement
}

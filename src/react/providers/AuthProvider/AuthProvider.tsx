import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import jwtDecode from 'jwt-decode'
import usePageTimeout, {minutes} from '../../hooks/usePageTimeout'
import {IJwtDecoded} from '../../apis/signon/login'
import {clearStorage, isAuthorized, setStateToStorage, STORAGE_KEY} from "./authHelpers";


export const initialAuthState: IAuthState = {
    accessToken: '',
    authorized: false,
    user: undefined,
}

export const AuthCtx = React.createContext<IAuthCtxPayload>({
    authState: initialAuthState,
    authorize: () => null,
    logout: () => null,
    setLoginData: () => null,
    cacheLoginState: () => null
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
export default function AuthProvider({children}: ProviderProps) {
    const [authState, setAuthState] = useState<IAuthState>(initialAuthState)
    const authorized = useMemo<boolean>(() => isAuthorized(authState), [authState])
    const [cacheCleanup, setCacheCleanup] = useState({time: 0})

    const authorize = useCallback((isAuthorized: boolean) => {
        setAuthState((state: IAuthState) => {
            return {
                ...state,
                authorized: isAuthorized,
            }
        })
    }, [])

    /**
     * The `authorized` memo variable will check the validity of the accessToken in the `authState`
     * as well as its basic existence. This hook will watch for changes in the `authorized` variable
     * and update the `authState` accordingly
     */
    useEffect(() => {
        authorize(authorized)
    }, [authorize, authorized])

    const cacheLoginState = useCallback(() => {
        // set the state to localStorage and mark this current tab as 'caching'
        setStateToStorage(authState)
        // cleanup cache in a minute
        setCacheCleanup({time: 60 * 1000})
    }, [authState])

    /**
     * Safely clean up user cache with a timer
     */
    useEffect(() => {
        function handler() {
            if (localStorage.getItem(STORAGE_KEY)) {
                console.log('Cleanup user cache.')
                localStorage.removeItem(STORAGE_KEY)
            }
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

    const setLoginData = useCallback((authState: IAuthState) => {
        setAuthState(authState)
    }, [])



    usePageTimeout({
            logout,
            activate: Boolean(authState.user),
            duration: minutes(60),
        },
    )

    const contextValue = useMemo(() => ({
        authState,
        setLoginData,
        authorize,
        logout,
        cacheLoginState,
    }), [authState, setLoginData, authorize, logout, cacheLoginState])

    return <AuthCtx.Provider value={contextValue}>
        {children}
    </AuthCtx.Provider>
}


export type AccessToken = string

export interface IAuthCtxPayload {
    authState: IAuthState
    setLoginData: (authState: IAuthState) => void
    authorize: (isAuthorized: boolean) => void
    logout: () => void
    cacheLoginState: () => void
}

export interface IAuthState {
    accessToken?: AccessToken
    authorized: boolean
    user?: object
}

interface ProviderProps {
    children?: React.ReactElement[] | React.ReactElement
}

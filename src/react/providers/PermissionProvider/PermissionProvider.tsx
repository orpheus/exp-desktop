import React, {createContext, useEffect, useState, useContext} from 'react'
import {useQuery} from 'react-query'
import {useAuth} from "../AuthProvider/AuthProvider";
import hasPermission from "./hasPermission";

export const PermissionsCtx = createContext(undefined)
export const useHasPermission = () => useContext(PermissionsCtx)

const PermissionsProvider = ({children}: ProviderProps) => {
    const [checkPermissions, setCheckPermissions] = useState(() => {
        return () => {
            return false
        }
    })
    const {authState} = useAuth()
    const user = authState?.user

    // currently we only use permissions in the admin view
    // to display when selecting permissions during role creation/modification
    // no need as of now to provider permissions to ctx provider
    // as would call for a memoization.
    // can easily just get permissions using react-query's cache
    // queryCache.getCacheData('permissions')
    useQuery('permissions', getPermissionsApi, {
        enabled: user && authState.authorized,
        refetchOnWindowFocus: false
    })

    // Each time the user updates
    useEffect(() => {
        if (user !== undefined) {
            let permissions: string[] = []

            console.log('user', user)
            permissions = user.role?.permissions

            const checkPermission = (permission: string) => {
                return hasPermission(permissions, permission)
            }
            setCheckPermissions(() => checkPermission)
        }
    }, [user])

    return <PermissionsCtx.Provider value={checkPermissions}>
        {children}
    </PermissionsCtx.Provider>
}


interface ProviderProps {
    children?: React.ReactElement[] | React.ReactElement
}

export default PermissionsProvider

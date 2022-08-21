import React, { createContext, useEffect, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { useAuth } from '../AuthProvider/AuthProvider'
import { hasPermission } from './hasPermission'
import { getPermissionApi } from '../../apis/permission/get-permission-api'
import { IPermission } from '../../apis/signon/login'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultPermissionFn = (permission: string) => false
export const PermissionsCtx = createContext(defaultPermissionFn)
export const useHasPermission = () => useContext(PermissionsCtx)

const PermissionsProvider = ({ children }: ProviderProps) => {
  const [checkPermissions, setCheckPermissions] = useState(() => {
    return defaultPermissionFn
  })
  const { authState, authorized } = useAuth()
  const user = authState?.authUser

  useQuery('permissions', getPermissionApi.call.bind(getPermissionApi), {
    enabled: user && authorized,
    refetchOnWindowFocus: false,
  })

  // Each time the user updates
  useEffect(() => {
    if (user !== undefined) {
      const permissions = user.role.permissions.map(p => p.id)

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

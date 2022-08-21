import { useAuth } from '../../providers/AuthProvider/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'

function AuthorizedRoute ({ children }: { children: JSX.Element }) {
  const { authorized } = useAuth()
  const location = useLocation()

  if (!authorized) {
    // Redirect them to the /signon page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signon" state={{ from: location }} replace/>
  }

  return children
}

export default AuthorizedRoute

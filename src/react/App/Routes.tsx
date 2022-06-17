import React from 'react'
import { Route, Routes as ReactRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthorizedRoute from '../components/util/AuthorizedRoute'
import SignOnPage from './pages/SignOnPage/SignOnPage'

const Routes = () => {
  return <ReactRoutes>
    <Route index element={
      <AuthorizedRoute><HomePage/></AuthorizedRoute>}
    />
    <Route path={'/signon'} element={<SignOnPage/>}/>
  </ReactRoutes>
}

export default Routes



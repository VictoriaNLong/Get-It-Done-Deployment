import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function AuthRoute() {
    const {auth} = useAuth()

    if(auth === undefined) return 'loading...'

  return auth === true ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
}

export default AuthRoute
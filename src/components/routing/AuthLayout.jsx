import React, { useEffect, useState } from 'react'
import { auth } from '../../utils/firebase'
import { useDispatch } from 'react-redux'
export const AuthLayout = () => {
  const [loggedIn, setLoggedin] = useState(false)
  const [checkStatus, setCheck] = useState(true)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        
        setLoggedin(true)
        setUser(user)
      }
      else {
        setLoggedin(false)
        setUser(null)
      }
      setCheck(false)
    })
    return () => unsubscribe();
  }, [])
  return { loggedIn, checkStatus, user };
}

export default AuthLayout
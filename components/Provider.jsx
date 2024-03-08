'use client'

import { createContext, useContext } from "react"

export const auth = createContext()

export const authInfo = {
    isLogin: false,
    name: 'night',
}

export const authContext = () => {
    return useContext(auth)
}

export default function Provider({ children }) {
  return (
    <auth.Provider value={{...authInfo}}>
        { children }
    </auth.Provider>
  )
}

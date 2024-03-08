'use client'
import { authContext } from "@/components/Provider"

export default function Page() {
  const {isLogin, name} = authContext()
  return (
    <div>{`${name} : ${isLogin ? 'Login' : 'not Login'}`}</div>
  )
}

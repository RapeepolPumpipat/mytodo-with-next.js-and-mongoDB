'use client'
import { useContext } from "react"
import { checkContext } from "../layout"

export default function Page() {
    const { isCheck, name, age, switchCheck, ageIncrease } = useContext(checkContext)

  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
      <button className="btn btn-success" onClick={ageIncrease}>Increase</button>
      <div>{ !isCheck ? 'no' : 'yes' }</div>
      <button className="btn btn-success" onClick={switchCheck}>Switch</button>
    </div>
  )
}

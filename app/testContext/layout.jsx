'use client'
import { createContext, useContext, useReducer, useState } from 'react';
import { reducer } from '@/lib/reduce';

export const checkContext = createContext();

const iniState = {
    isCheck:false,
    name:'night',
    age:24
}

export default function Layout({ children }) {
  const [state, dispatch] = useReducer(reducer, iniState);

  const switchCheck = () => {
    dispatch({type:"SWITCH"})
  }

  const ageIncrease = () => {
    dispatch({type:'AGE'})
  }

  return (
    <checkContext.Provider value={{...state,switchCheck,ageIncrease}}>
      <div>{state.name}</div>
      <div>{state.age}</div>
      <button className="btn btn-success" onClick={ageIncrease}>Increase</button>
      <div>{!state.isCheck ? 'no' : 'yes'}</div>
      <div>{children}</div>
    </checkContext.Provider>
  );
}

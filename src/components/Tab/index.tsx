import React from "react"
import { useSnapshot } from "valtio";
import state from '../../store'

interface TabProps{
  tab: {
    name: string
    icon: string
  }
  isFilterTab?: boolean
  isActiveTab?: string
  handleClick: ()=>void
}

export function Tab({tab, isFilterTab, isActiveTab, handleClick}: TabProps) {
  const snap = useSnapshot(state)
  return (
    <div className='/* classname */'>Tab</div>
  );
}

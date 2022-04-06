import React, { useCallback, useEffect, useState } from 'react'
import s from './TabTitle.module.scss'
import cn from 'classnames'

type Props = {
  title: string
  index: number
  activeTabIndex: number
  setSelectedTab: (index: number) => void
}

const TabTitle: React.FC<Props> = ({
  title,
  setSelectedTab,
  index,
  activeTabIndex,
}) => {
  const onClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  const [activeTab, setActiveTab] = useState(false)

  useEffect(() => {
    if (activeTabIndex === index) {
      setActiveTab(true)
    } else {
      setActiveTab(false)
    }
  }, [activeTabIndex])

  return (
    <li className={s.root}>
      <button
        className={cn(s.tabTitle, activeTab ? s.activeTab : '')}
        onClick={onClick}
      >
        {title}
      </button>
    </li>
  )
}

export default TabTitle

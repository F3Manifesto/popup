import React, {
  ReactElement,
  isValidElement,
  InputHTMLAttributes,
  DetailedHTMLProps,
  useState,
  HTMLAttributes,
  useEffect,
  ReactNode,
} from 'react'
import Tab from '../Tab'
import cn from 'classnames'
import s from './Tabs.module.scss'
import TabTitle from '../TabTitle/TabTitle'
import { set } from 'js-cookie'

type Props = {
  children: ReactElement[]
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className={s.tabTitleContainer}>
      <ul className={s.tabTitleList}>
        {children &&
          children.map((item, index) => {
            return (
              <TabTitle
                key={index}
                title={item.props.title}
                index={index}
                activeTabIndex={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )
          })}
      </ul>
      {children[selectedTab]}
    </div>
  )
}

export default Tabs

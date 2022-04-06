import cn from 'classnames'
import { FC, ReactNode, Component } from 'react'
import s from './GridContainer.module.css'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
}

const GridContainer: FC<Props> = ({ className, children }) => {
  const rootClassName = cn(s.root, [s.gridContainer], className)
  return <div className={rootClassName}>{children}</div>
}

export default GridContainer

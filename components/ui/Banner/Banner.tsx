import React, { FunctionComponent } from 'react'
import cn from 'classnames'
import s from './Banner.module.scss'

const Banner: React.FC = ({ children }) => {
  return <div className={s.banner}>{children}</div>
}

export default Banner

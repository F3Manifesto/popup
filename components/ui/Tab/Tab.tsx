import React, { InputHTMLAttributes, useState, useEffect } from 'react'
import cn from 'classnames'
import s from './Tab.module.scss'

type Props = {
  title: string
}

const Tab: React.FC<Props> = (props) => {
  const { children } = props

  return <div className={s.tabContent}>{children}</div>
}

export default Tab

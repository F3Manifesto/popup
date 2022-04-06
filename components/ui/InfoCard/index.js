import React from 'react'
import styles from './styles.module.scss'

const InfoCard = ({
  children,
  libon = null,
  mainColor = 'transparent',
  bodyClass = ''
}) => {
  return (
    <div
      className={styles.wrapper}
    >
      {libon ? <img src={libon} className={styles.libon} /> : null}
      <div className={[styles.body, bodyClass].join(' ')} style={{ backgroundColor: mainColor }}>
        {children}
      </div>
    </div>
  )
}

export default InfoCard

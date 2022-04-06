import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const PatternCard = ({ item }) => {
  return (
    <div className={cn(styles.wrapper)}>
      <a>
        <img
          src={item.thumbnail_url}
          alt={item.thumbnail_url}
          className={styles.photo}
        />
      </a>
    </div>
  )
}

PatternCard.propTypes = {
  cid: PropTypes.string,
}

PatternCard.defaultProps = {
  cid: '',
}

export default memo(PatternCard)

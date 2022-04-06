import React, { useState } from 'react'
import styles from './styles.module.scss'
import FashionImageCard from '../FashionImageCard'

const FashionCard = ({ image, leftImage, item }) => {
  const [selected, setSelected] = useState(0)

  return (
    <div className={styles.wrapper}>
      {leftImage && (
        <div className={styles.bodyWrapper}>
          <div className={styles.imageCardWrapper}>
            <div className={styles.imageInnerWrapper}>
              <FashionImageCard videoUrl={image} />
            </div>
          </div>
          <div className={styles.descriptionWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.body}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.description}>{item.description}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!leftImage && (
        <div className={styles.bodyWrapper2}>
          <div className={styles.descriptionWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.body}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.description}>{item.description}</div>
              </div>
            </div>
          </div>
          <div className={styles.imageCardWrapper}>
            <div className={styles.imageInnerWrapper}>
              <FashionImageCard videoUrl={image} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FashionCard

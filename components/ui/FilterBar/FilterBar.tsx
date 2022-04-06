import React from 'react'
import { useRouter } from 'next/router'
import styles from './FilterBar.module.scss'

type Props = {
  pageType?: number,
}

const FilterBar: React.FC<Props> = ({ pageType = 'collection' }) => {
  const { asPath } = useRouter()

  return (
    <div className={styles.filterBarWrapper}>
      <div className={styles.getDressed}>
        Can’t Find What You’re Looking For? <span>Get <a href='' target='_blank'>Bespoke Dressed Here</a>.</span>
      </div>
      
    </div>
  )
}

export default FilterBar

import React from 'react'
import { useRouter } from 'next/router'
import s from './HomeTitle.module.scss'

type Props = {
  pageType?: number,
}

const HomeContent: React.FC<Props> = ({ pageType = 'collection' }) => {
  const { asPath } = useRouter()

  return (
    <div className={s.homeTitleContainer}>
      {
        <div className={s.titleWrapper}>
          <div className={s.title}>
            F<sub>3</sub>Manifesto
          </div>
        </div>
      }
    </div>
  )
}

export default HomeContent

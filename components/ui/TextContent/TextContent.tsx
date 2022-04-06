import React from 'react'
import { useRouter } from 'next/router'
import s from './TextContent.module.scss'

type Props = {
  pageType?: number,
}

const TextContent: React.FC<Props> = ({ pageType = 'collection' }) => {
  const { asPath } = useRouter()

  return (
    <div className={s.textContentContainer}>
      {asPath.includes('web3') ? (
        <img src="/images/Group 1210.png" className={s.titleImage} />
      ) : (
        <div className={s.titleWrapper}>
          <div className={s.title}>
            PHYSICAL
          </div>
          <div className={s.subTitle}>INDIE WEB3 FASHION</div>
        </div>
      )}
    </div>
  )
}

export default TextContent

import { FC } from 'react'
import styles from './PriceTag.module.scss'

interface Props {
  monaPrice: string
  dollarPrice: string
  description?: string
  backImageSrc?: string
  withoutDollarSign?: boolean
}

const PriceTag: FC<Props> = ({ monaPrice, dollarPrice, description, backImageSrc, withoutDollarSign = false }) => {
  return (
    <div className={[styles.priceTagWrapper, backImageSrc ? styles.hasBackImage : ''].join(' ')}>
      <div className={styles.mainText}>
        {
          backImageSrc &&
          <img src={backImageSrc} className={styles.backImage} />
        }
        <p className={backImageSrc ? styles.absoluteText : ''}>
          {monaPrice + ' ' + (withoutDollarSign ? '' : '$') + `MONA `}
          <span>({withoutDollarSign ? '' : '$'}{dollarPrice})</span>
        </p>
      </div>
      {description && 
        <div className={styles.subText}>
        { description }
        </div>
      }
    </div>
  )
}

export default PriceTag
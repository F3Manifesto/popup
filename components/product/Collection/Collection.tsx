import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { useMain } from 'context'

import s from './Collection.module.scss'

interface Props {
  className?: string
  collection: any
  imgProps?: Omit<ImageProps, 'src'>
}

const placeholderImg = '/product-img-placeholder.svg'

const Collection: FC<Props> = ({
  className,
  collection,
  imgProps,
  ...props
}) => {

  return (
    <div className={s.collectionItemContainer}>
      <div className={s.collectionContent}>
        <h3 className={s.collectionTitle}>
          <span>{collection.name}</span>
        </h3>

        <Link href={`/collection${collection.path}`} {...props}>
          <a className={cn(s.root, className)}>
            <>
              <div className={s.imageContainer}>
                {collection?.image && (
                  <Image
                    alt={collection.name || 'Collection Image'}
                    className={s.collectionImage}
                    src={(collection.image && collection.image.url) || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                )}
              </div>
            </>
          </a>
        </Link>

        <div className={s.collectionPriceSection}>
          <a
            className={s.btnPrice}
            href={`/collection${collection.path}`}
          >
            <span>
              SEE ALL
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Collection

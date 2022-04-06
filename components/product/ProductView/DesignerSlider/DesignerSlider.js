import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import DesignerCard from '../DesignerCard'
import styles from './DesignerSlider.module.scss'
import designerList from '@data/designers.json'
import shuffle from '@lib/shuffle'

const DesignerSlider = ({}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const randomOrder = shuffle(designerList)

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        onClick={() => onClick()}
        className={[styles.arrowLeftButton].join(' ')}
      >
        <div className={styles.arrowLeft}></div>
      </button>
    )
  }

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={() => onClick()}
        className={[styles.arrowRightButton].join(' ')}
      >
        <div className={styles.arrowRight}></div>
      </button>
    )
  }

  return (
    <div className={styles.wrapper}>
      <Carousel
        ssr
        deviceType={'desktop'}
        itemClass="image-item"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
      >
        {randomOrder.map((item) => {
          return <DesignerCard cid={item.CID} key={item.CID} />
        })}
      </Carousel>
    </div>
  )
}

export default DesignerSlider

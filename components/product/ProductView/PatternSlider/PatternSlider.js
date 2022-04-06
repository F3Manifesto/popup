import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import PatternCard from '../PatternCard'
import styles from './PatternSlider.module.scss'
import shuffle from '@lib/shuffle'
import { ESPA_BACKEND_API_URL, ESPA_BACKEND_API_KEY } from '@constants/index'

const endpoint = `${ESPA_BACKEND_API_URL}get-all-thumbnails`
const API_KEY = ESPA_BACKEND_API_KEY
const LIST_LIMIT = 50

const PatternSlider = ({}) => {
  const [patternList, setPatternList] = useState([])
  useEffect(() => {
    fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log('thumbnails res: ', jsonData)
        setPatternList(
          shuffle(jsonData.data).filter(
            (item) => item.thumbnail_url !== null && item.thumbnail_url !== ''
          )
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  }

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
        {patternList.slice(0, LIST_LIMIT).map((item) => {
          return <PatternCard item={item} key={item.image_url} />
        })}
      </Carousel>
    </div>
  )
}

export default PatternSlider

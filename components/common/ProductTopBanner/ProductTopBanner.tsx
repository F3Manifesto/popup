import { FC, useState } from 'react'
import { Banner } from '@components/ui'
import { TextSlider } from '..'
import TextContent from '@components/ui/TextContent'
import HomeTitle from '@components/ui/HomeTitle'
import { HeroBar } from '@components/ui'
import Container from '@components/ui/Container'
import styles from './ProductTopBanner.module.scss'

interface Props {
  showSlider?: boolean
  showFilterbar?: boolean
  isHomePage?: boolean
  filter?: string
  setFilter(value: string): void
  setSortBy(sort: string): void
}

const ProductTopBanner: FC<Props> = ({
  showSlider = false,
  showFilterbar = false,
  isHomePage = false,
  filter,
  setFilter,
  setSortBy
}) => {
  return (
    <div className={styles.wrapper}>
      {/* <Banner> */}
      <Container
        className={styles.homePageContainer}
      >
        <HomeTitle />
        {
        showFilterbar && 
          <HeroBar isHomePage={isHomePage} filter={filter || ''} setFilter={setFilter} setSortBy={setSortBy} />
        }
      </Container>
      {/* </Banner> */}
      {showSlider && <TextSlider black={false} />}
    </div>
  )
}

export default ProductTopBanner

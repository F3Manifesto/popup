import { FC, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TextSlider } from "..";
import HomeTitle from "@components/ui/HomeTitle";
import { HeroBar } from "@components/ui";
import Container from "@components/ui/Container";
import shuffle from "@lib/shuffle";
import styles from "./ProductTopBanner.module.scss";

interface Props {
  showSlider?: boolean;
  showFilterbar?: boolean;
  isHomePage?: boolean;
  isExplorePage?: boolean;
  filter?: string;
  setFilter(value: string): void;
  setSortBy(sort: string): void;
}

const ProductTopBanner: FC<Props> = ({
  showSlider = false,
  showFilterbar = false,
  isHomePage = false,
  isExplorePage = false,
  filter = "",
  setFilter = () => {},
  setSortBy = () => {},
}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const banners = [
    "/images/banners/bridgeshot.jpg",
    "/images/banners/digiob.jpeg",
    "/images/banners/modelfinal1.gif",
    "/images/banners/skagefirl.gif",
    "/images/banners/models2.png",
    "/images/banners/whatisweb3.gif",
  ];

  const randomOrder = shuffle(banners);

  return (
    <div className={styles.wrapper}>
      <Container
        className={[
          styles.homePageContainer,
          isHomePage ? styles.homepage : "",
          isExplorePage ? styles.explorePage : "",
        ].join(" ")}
      >
        {isExplorePage && (
          <img src="/images/header.jpg" className={styles.headerImage} />
        )}
        {isHomePage && (
          <div className={styles.carouselWrapper}>
            <Carousel
              autoPlay
              autoPlaySpeed={10000}
              arrows={false}
              infinite={true}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              slidesToSlide={1}
              ssr
              deviceType={"desktop"}
              itemClass={styles.bannerItem}
              responsive={responsive}
              draggable={false}
              swipeable={false}
            >
              {randomOrder.map((item) => {
                return (
                  <img
                    src={item}
                    style={{
                      display: "block",
                      height: "57vw",
                      margin: "auto",
                      width: "100vw",
                      objectFit: "cover",
                    }}
                  />
                );
              })}
            </Carousel>
          </div>
        )}

        {!isHomePage && <div className={styles.overlay} />}
        <HomeTitle isHomePage={isHomePage} isExplorePage={isExplorePage} />
        {showFilterbar && (
          <HeroBar
            isHomePage={isHomePage}
            isExplorePage={isExplorePage}
            filter={filter || ""}
            setFilter={setFilter}
            setSortBy={setSortBy}
          />
        )}
      </Container>
      {showSlider && <TextSlider black={false} />}
    </div>
  );
};

export default ProductTopBanner;

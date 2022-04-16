import React, { memo } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./styles.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const imageArray = [
  "/images/panels/panel1.png",
  "/images/panels/panel1.png",
  "/images/panels/panel1.png",
];

const SlidingPanels = () => {
  return (
    <div className={styles.wrapper}>
      <Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        showArrows={false}
        autoPlay={true}
        interval={20000}
      >
        {imageArray.map((item, index) => {
          return (
            <div key={index}>
              <img src={item} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

SlidingPanels.propTypes = {};

SlidingPanels.defaultProps = {};

export default memo(SlidingPanels);

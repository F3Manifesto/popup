import React, { memo, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./styles.module.scss";
import cn from "classnames";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const imageArray = [
  "/images/panels/walletsetup.png",
  "/images/panels/panel1.png",
  "/images/panels/panel1.png",
];

const SlidingPanels = ({ openPreview }) => {
  const onClickZoomOut = (imageFile) => {
    openPreview(imageFile);
  };

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
            <div key={index} onClick={() => onClickZoomOut(item)}>
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

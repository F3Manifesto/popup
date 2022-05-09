import { FC, useState, useEffect } from "react";
import Image from "next/image";
import ReactFreezeframe from "react-freezeframe";
import Gif from "./Gif";
import type { Product } from "@commerce/types";
import styles from "./ProductTiles.module.scss";

interface Props {
  products?: Array<Product>;
}

const shuffleArray = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;

      setWindowDimensions({
        width,
        height,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const ProductTiles: FC<Props> = ({ products }) => {
  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);
  const [shuffledArray, setShuffledArray] = useState([]);
  // let shuffledArray = []
  const placeholderImg = "/product-img-placeholder.svg";

  useEffect(() => {
    const shuffled = shuffleArray(products || []);
    setShuffledArray(shuffled);
    // if (typeof window !== "undefined") {
    //   const ff = new Freezeframe({
    //     trigger: false,
    //   });
    //   ff.stop();
    // }
  }, []);

  useEffect(() => {
    screenWidth > 707 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  // console.log("shuffledArray: ", shuffledArray);
  // console.log("isMobile: ", isMobile);

  return (
    <div className={styles.wrapper}>
      {shuffledArray
        .slice(0, isMobile ? 60 : 80)
        .map((product: Product, index: number) => {
          return (
            // <Link key={index} href={`product${product?.path}`}>
            <a
              key={index}
              href={`product${product?.path}`}
              className={styles.tileWrapper}
            >
              {product?.images && (
                // <img
                //   alt={product.name || "Product Image"}
                //   className={`${styles.tileImage}`}
                //   src={`${product.images[0].url || placeholderImg}`}
                //   // height={540}
                //   // width={540}
                //   // quality="85"
                //   // layout="responsive"
                // />
                <Gif
                  src={`${product.images[0].url || placeholderImg}`}
                  frame={Math.random() % 8}
                  className={`${styles.tileImage}`}
                />
              )}
            </a>
            // </Link>
          );
        })}
    </div>
  );
};

export default ProductTiles;

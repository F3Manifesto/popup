import { FC } from "react";
import Image from "next/image";
import type { Product } from "@commerce/types";
import styles from "./ProductTiles.module.scss";
import Link from "next/link";

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

const ProductTiles: FC<Props> = ({ products }) => {
  const shuffledArray = shuffleArray(products || []);
  const placeholderImg = "/product-img-placeholder.svg";

  console.log("shuffledArray: ", shuffledArray);
  return (
    <div className={styles.wrapper}>
      {shuffledArray.map((product: Product, index: number) => {
        return (
          <Link key={index} href={`product${product?.path}`}>
            <a className={styles.tileWrapper}>
              {product?.images && (
                <Image
                  alt={product.name || "Product Image"}
                  className={styles.tileImage}
                  src={product.images[0].url || placeholderImg}
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                />
              )}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductTiles;

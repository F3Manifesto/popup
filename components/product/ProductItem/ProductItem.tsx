import { FC, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import Image, { ImageProps } from "next/image";

import type { Product } from "@commerce/types";
import PriceTag from "../PriceTag";
import s from "./ProductItem.module.scss";
import { useMain } from "context";

interface Props {
  className?: string;
  product: Product;
  variant?: "slim" | "simple";
  imgProps?: Omit<ImageProps, "src">;
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductItem: FC<Props> = ({
  className,
  product,
  variant,
  imgProps,
  ...props
}) => {
  const { monaPrice } = useMain();

  console.log("monaPrice: ", monaPrice);
  console.log("image: ", product.images[0].url || placeholderImg);

  return (
    <div className={s.productItemContainer}>
      <div className={s.productContent}>
        <a href={`/product/${product.slug}`}>
          <h3 className={s.productTitle}>
            <span>{product.name}</span>
          </h3>
        </a>
        <a
          className={cn(s.root, className)}
          href={`/product/${product.slug}`}
          {...props}
        >
          <>
            <div className={s.imageContainer}>
              {product?.images && (
                <Image
                  alt={product.name || "Product Image"}
                  className={s.productImage}
                  src={product.images[0].url || placeholderImg}
                  placeholder="blur"
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
        {/* </Link> */}

        <div className={s.productPriceSection}>
          <PriceTag
            monaPrice={`${(product.price.value * monaPrice).toFixed(2)}`}
            dollarPrice={`${product.price.value}`}
            description={"SALE PRICE"}
          />
          <a className={s.btnPrice} href={`/product/${product.slug}`}>
            <span>BUY NOW</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

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
  const { monaPrice, designers } = useMain();

  const firstDesigner = designers.find((item: any) => {
    const productDesigner: string | null = product.designers?.length
      ? product.designers[0]?.toLowerCase()
      : null;

    return (
      item.designerId?.toLowerCase() === productDesigner ||
      item.newDesignerID?.toLowerCase() === productDesigner
    );
  });

  const [isJson, setIsJson] = useState(false);
  const [descContent, setDescContent] = useState(() => {
    try {
      setIsJson(true);
      return JSON.parse(product.description);
    } catch (e) {
      setIsJson(false);
      return product.description;
    }
  });

  return (
    <div className={s.productItemContainer}>
      <div className={s.productContent}>
        <a href={`/product/${product.slug}`}>
          <h3 className={s.productTitle}>
            <span>{product.name}</span>
          </h3>
        </a>

        {/* {firstDesigner &&
          <a
            href={`https://designers.digitalax.xyz/designers/${firstDesigner.designerId}`}
            target='_blank'
            className={s.designer}
          >
            <div className={s.profilePicContainer}>
              <Image
                alt={firstDesigner.designerId || 'designer'}
                className={s.designerImage}
                src={firstDesigner.image_url || placeholderImg}
                height={30}
                width={30}
                quality="85"
                layout="responsive"
                // {...imgProps}
              />
            </div>
            <span>{firstDesigner.designerId}</span>
          </a>
        } */}

        {/* <Link 
          href={`/product/${product.slug}`}
          {...props}
        >
        <a
          className={cn(s.root, className)}          
        > */}
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

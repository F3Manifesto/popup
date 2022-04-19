import { FC, useEffect, useState } from "react";
import cn from "classnames";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import s from "./ProductView.module.scss";

import { Swatch, ProductSlider } from "@components/product";
import { Button, Container, useUI } from "@components/ui";
import BannerBar from "@components/product/ProductView/BannerBar";
import InfoCard from "@components/ui/InfoCard";
import ImageCard from "./ImageCard";
import PriceTag from "../PriceTag";

import type { Product } from "@commerce/types";
import usePrice from "@framework/product/use-price";
import { useAddItem } from "@framework/cart";

import { getVariant, SelectedOptions } from "../helpers";

import { getDripMarketplaceOfferById } from "services/api.service";
import digitalaxApi from "services/digitalaxApi.service";
import { useMain } from "context";
import SlidingPanels from "./SlidingPanels";

const fetchTokenUri = async (tokenUri: string) => {
  return fetch(tokenUri)
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};

const reviseUrl = (url: string) => {
  if (url?.includes("gateway.pinata")) {
    return url.replace("gateway.pinata", "digitalax.mypinata");
  }
  return url;
};

interface Props {
  className?: string;
  children?: any;
  product: Product;
}

interface Designer {
  id: number;
  image: string;
  description: string;
  name: string;
  instagram?: string;
  twitter?: string;
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem();
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });
  const { openSidebar, openModal, setModalView } = useUI();
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState<SelectedOptions>({
    color: null,
    size: null,
  });

  const { user, account, monaPrice, designers } = useMain();
  // const [loveCount, setLoveCount] = useState(0)
  // const [viewCount, setViewCount] = useState(0)
  // const [totalAmount, setTotalAmount] = useState(0);
  // const [soldAmount, setSoldAmount] = useState(0);
  // const [rarity, setRarity] = useState("");
  // const [isFetchedViewCount, setIsFetchedViewCount] = useState(false)
  const [garmentChildren, setGarmentChildren] = useState([]);
  const [sourceFile, setSourceFile] = useState("");

  const [curImgIndex, setCurImgIndex] = useState(0);
  const { asPath } = useRouter();

  const productId = asPath.split("/")[2];
  const collectionId = productId.split("-")[1];

  // Select the correct variant based on choices
  const variant = getVariant(product, choices);

  const currentDesigners =
    product.designers?.map((designerId: string) => {
      return designers.find((item: any) => {
        return (
          item.designerId?.toLowerCase() === designerId.toLowerCase() ||
          item.newDesignerID?.toLowerCase() === designerId.toLowerCase()
        );
      });
    }) || [];

  const handleOnclick = (i: number) => {
    setCurImgIndex(i);
  };

  useEffect(() => {
    const fetchDripInfo = async () => {
      const { dripMarketplaceOffer } = await getDripMarketplaceOfferById(
        collectionId
      );
      console.log("Product: ", product);
      console.log("collectionId: ", collectionId);
      console.log("dripMarketplaceOffer: ", dripMarketplaceOffer);

      // setTotalAmount(dripMarketplaceOffer.garmentCollection?.garments?.length);
      // setSoldAmount(dripMarketplaceOffer.amountSold);
      // setRarity(dripMarketplaceOffer.garmentCollection?.rarity);
      const children: any = [];

      if (
        dripMarketplaceOffer?.garmentCollection?.garments[0].children.length
      ) {
        dripMarketplaceOffer.garmentCollection?.garments[0].children.forEach(
          async (child: any) => {
            const info = await fetchTokenUri(child.tokenUri);
            children.push({
              ...info,
              id: child.id.split("-")[1],
            });
          }
        );
      }

      const tokenUri =
        dripMarketplaceOffer?.garmentCollection?.garments[0].tokenUri;

      tokenUri &&
        fetch(tokenUri)
          .then((response) => response.json())
          .then((jsonData) => setSourceFile(jsonData["Source_File"]))
          .catch((error) => {
            console.error(error);
          });

      setGarmentChildren(children);
      console.log("garmentChildren: ", children.length);
      // setDesigner(dripMarketplaceOffer.designer)
    };

    fetchDripInfo();

    // const fetchViews = async () => {
    //   const viewData = await digitalaxApi.getViews('product', productId)
    //   setLoveCount(
    //     viewData && viewData[0] && viewData[0].loves
    //       ? viewData[0].loves.length
    //       : 0
    //   )
    //   setViewCount(
    //     viewData && viewData[0] && viewData[0].viewCount
    //       ? viewData[0].viewCount
    //       : 0
    //   )
    //   setIsFetchedViewCount(true)
    // }

    // const addViewCount = async () => {
    //   const data = await digitalaxApi.addView('product', productId)
    //   if (data) {
    //     setViewCount(data.viewCount)
    //   }
    // }

    // fetchViews()
    // addViewCount()
  }, []);

  const addToCart = async () => {
    setLoading(true);
    console.log({
      productId: String(product.id),
      variantId: String(variant ? variant.id : product.variants[0].id),
    });
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      });

      openSidebar();
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  // const addLove = async () => {
  //   const data = await digitalaxApi.addLove(
  //     account,
  //     user.randomString,
  //     'product',
  //     productId
  //   )
  //   if (data && data['success']) {
  //     setLoveCount(loveCount + 1)
  //   }
  // }

  // const onClickLove = () => {
  //   addLove()
  // }

  const onReadBtn = () => {
    setModalView("BESPOKE_VIEW");
    openModal();
  };

  useEffect(() => {}, []);

  const monaAmount =
    !price || price === undefined
      ? "0.00"
      : `${(monaPrice * Number(price?.replace(/\$/g, "") || "0")).toFixed(2)}`;

  return (
    <>
      <Container className={`${s.productViewContainer}`} clean>
        <NextSeo
          title={product.name}
          description={product.description}
          openGraph={{
            type: "website",
            title: product.name,
            description: product.description,
            images: [
              {
                url: product.images[0]?.url!,
                width: 800,
                height: 600,
                alt: product.name,
              },
            ],
          }}
        />

        <div className={cn(s.root, "fit")}>
          <div className={s.productName}>{product.name}</div>
          <div className={s.mainBody}>
            <div className={s.leftSide}>
              <div className={cn(s.productDisplay, "fit")}>
                <div className={s.sliderContainer}>
                  <div className={s.bodyWrapper}>
                    <ProductSlider
                      key={product.id}
                      imageId={curImgIndex}
                      onSlide={setCurImgIndex}
                    >
                      {product.images.map((image, i) => (
                        <div key={image.url} className={s.imageContainer}>
                          <Image
                            className={s.img}
                            src={image.url!}
                            alt={image.alt || "Product Image"}
                            width={780}
                            height={1000}
                            priority={i === 0}
                            quality="85"
                          />
                        </div>
                      ))}
                    </ProductSlider>
                  </div>
                </div>
              </div>

              <div className={s.previewImages}>
                {product.images.map((image, i) => (
                  <div
                    key={image.url}
                    className={[
                      s.previewImg,
                      i == curImgIndex ? s.selected : "",
                    ].join(" ")}
                  >
                    <Image
                      className={s.img}
                      src={image.url!}
                      alt={image.alt || "Product Image"}
                      width={44}
                      height={44}
                      priority={i === 0}
                      quality="85"
                      onClick={() => handleOnclick(i)}
                    />
                  </div>
                ))}
              </div>

              <div className={s.productAttrs}>
                {product.options
                  ?.sort((a, b) => {
                    const nameA = a.displayName;
                    const nameB = b.displayName;
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((opt) => (
                    <div className="pb-4 pr-6" key={opt.displayName}>
                      <div className="flex flex-row py-4">
                        {opt.values.map((v, i: number) => {
                          const active = (choices as any)[
                            opt.displayName.toLowerCase()
                          ];

                          return (
                            <Swatch
                              key={`${opt.id}-${i}`}
                              active={v.label.toLowerCase() === active}
                              variant={opt.displayName}
                              color={v.hexColors ? v.hexColors[0] : ""}
                              label={v.label}
                              onClick={() => {
                                setChoices((choices) => {
                                  return {
                                    ...choices,
                                    [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                                  };
                                });
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>

              <InfoCard mainColor="transparent" bodyClass={s.productDesc}>
                <div className={s.infoCard}>
                  {/* <div className={s.skinName}>
                    <div className={s.text}> {rarity} </div>
                  </div> */}
                  <div className={s.description}>{product?.description}</div>
                </div>
              </InfoCard>

              <div className={s.buttonWrapper}>
                <PriceTag
                  withoutDollarSign={true}
                  monaPrice={monaAmount}
                  dollarPrice={price}
                />
              </div>

              <div className={s.openCollectionButtonWrapper}>
                <Button
                  aria-label="Add to Cart"
                  type="button"
                  className={s.button}
                  onClick={addToCart}
                  loading={loading}
                  disabled={!variant && product.options.length > 0}
                >
                  {/* <img src={`/images/black_update/gray_button2.png`} /> */}
                  <div className={s.title}>ADD TO CART</div>
                </Button>
              </div>
            </div>

            <div className={s.sidebar}>
              <section>
                {/* <div className={s.amount}>
                  {product.limited
                    ? `${soldAmount} of ${totalAmount}`
                    : "Open Edition"}
                  <div className={s.helper}>
                    <span className={s.questionMark}>?</span>
                    <span className={s.description}>
                      Shipping takes approx 2 weeks. International can be
                      longer.
                    </span>
                  </div>
                </div> */}
                {/* <div className={s.lovesWrapper}>
                  <button
                    type="button"
                    className={s.loveButton}
                    onClick={onClickLove}
                  >
                    <img src="/images/like_icon.png" />
                  </button>

                  <div className={s.likeCount}>
                    {loveCount}
                    <span>LOVES</span>
                  </div>
                  <img src="/images/view_icon.png" />
                  <div className={s.viewCount}>
                    {viewCount}
                    <span>VIEWS</span>
                  </div>
                </div> */}
                <div>
                  {/* <p className={s.openCollection}>Open Collection</p>
                   */}
                </div>

                {/* <button type="button" className={s.readBtn} onClick={onReadBtn}>
                  read manifesto chapter
                </button> */}

                {garmentChildren?.length > 0 && (
                  <div className={s.garmentWrapper}>
                    <div className={s.childrenDescription}>
                      {/* Open Source{' '}
                      <a
                        href="https://designers.digitalax.xyz/fractional/"
                        target="_blank"
                      > */}
                      Fractional Garment Ownership
                      {/* </a> */}
                    </div>
                    <div className={s.childrenWrapper}>
                      {garmentChildren.map((child: any, index: number) => {
                        return (
                          <a
                            href={`https://opensea.io/assets/matic/0x567c7b3364ba2903a80ecbad6c54ba8c0e1a069e/${child.id}`}
                            target="_blank"
                            key={index}
                          >
                            {child.image_url ? (
                              <img src={reviseUrl(child.image_url)} />
                            ) : child.animation_url ? (
                              <video muted autoPlay loop>
                                <source src={reviseUrl(child.animation_url)} />
                              </video>
                            ) : null}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </Container>
      <BannerBar className={s.homeHeroBar} sourceFile={sourceFile} />
      <SlidingPanels />
    </>
  );
};

export default ProductView;

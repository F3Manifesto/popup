import { useState } from "react";
import styles from "./styles.module.scss";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getConfig } from "@framework/api";
import getAllProducts from "@framework/product/get-all-products";

import { Layout, ProductTiles } from "@components/common";
import { Container, GridContainer } from "@components/ui";
import { ProductItem } from "@components/product";
import ProductTopBanner from "@components/common/ProductTopBanner";

import { filterProducts } from "@lib/filter";
import { ESPA_BACKEND_API_URL, ESPA_BACKEND_API_KEY } from "@constants/index";

import { getDripMarketplaceOffers } from "services/api.service";

const endpoint = `${ESPA_BACKEND_API_URL}save-drip-emails`;
const API_KEY = ESPA_BACKEND_API_KEY;

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale });

  const { products } = await getAllProducts({
    // variables: { first: 12 },
    config,
    preview,
  });

  const { dripMarketplaceOffers } = await getDripMarketplaceOffers();

  console.log("dripMarketplaceOffers: ", dripMarketplaceOffers);

  const wrappedProducts = products.map((item) => {
    const collectionId = item?.slug?.split("-")[1];
    if (collectionId) {
      const foundDripItem = dripMarketplaceOffers.find(
        (dripItem: any) => dripItem?.id === collectionId
      );

      if (foundDripItem && foundDripItem != undefined) {
        return {
          ...item,
          amountSold: foundDripItem.amountSold,
          startTime: foundDripItem.startTime,
          endTime: foundDripItem.endTime,
          rarity: foundDripItem.garmentCollection?.rarity,
        };
      }
    }

    return item;
  });

  return {
    props: {
      products: wrappedProducts,
      dripMarketplaceOffers,
      // pages,
    },
    revalidate: 14400,
  };
}

export default function Home({
  products,
  dripMarketplaceOffers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [email, setEmail] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const addEmail = () => {
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify({ email }),
    }).then((res) => {
      if (res.status === 200) {
        toast.success("You're successfully registered!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Email already exists!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const filteredProducts = filterProducts(products, filter, sortBy) || [];
  // console.log('dripMarketplaceOffer: ', dripMarketplaceOffers)
  console.log("filteredProducts: ", filteredProducts);

  return (
    <>
      <div className="relative bg-yellow">
        <div className="relative top-0 w-full overflow-hidden">
          <>
            <ProductTopBanner
              showFilterbar
              isHomePage
              filter={filter}
              setFilter={setFilter}
              setSortBy={setSortBy}
            />
            <section className={styles.topSection}>
              <div className={styles.windowWrapper}>
                <div className={styles.titleBar}>
                  <a>X</a>
                </div>
                <div className={styles.text1}>SELF SOVEREIGN MERCH DROPS</div>
                <div className={styles.text2}>
                  NFTs you collect give you access to secret streetwear drops &
                  so much more.
                </div>
              </div>
              <video loop autoPlay muted playsInline>
                <source src="/tvscene.mp4" />
              </video>
            </section>
            <section className={styles.skateSection}>
              <iframe
                className={styles.youtubeFrame}
                width="560"
                height="315"
                src="https://www.youtube.com/watch?v=AWVYBE8r0Bg"
              ></iframe>
              <img src="/images/curves1.png" className={styles.curves1} />
              <img src="/images/curves2.png" className={styles.curves2} />

              <div className={styles.text1}>
                NYC <br />
                Skate <br />
                <div>
                  Sticker ART <br />
                  Street Art <br />
                  Streetwear <br />
                </div>
              </div>
              <div className={styles.text2}>Indie Series</div>
            </section>
            <section className={styles.vintageSection}>
              <img src="/images/header.jpg" />
            </section>
          </>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
Home.Layout = Layout;
// export default Home

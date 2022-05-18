import { useState } from "react";
import styles from "./styles.module.scss";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { Layout } from "@components/common";
import ProductTopBanner from "@components/common/ProductTopBanner";

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: 14400,
  };
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <>
      <div className="relative bg-yellow">
        <div className="relative top-0 w-full overflow-hidden">
          <>
            <ProductTopBanner
              showFilterbar
              isHomePage={true}
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
                src="https://www.youtube.com/embed/AWVYBE8r0Bg?autoplay=1&mute=1&controls=0&loop=1"
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
    </>
  );
}
Home.Layout = Layout;
// export default Home

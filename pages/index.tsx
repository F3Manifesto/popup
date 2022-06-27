import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { Layout } from "@components/common";
import ProductTopBanner from "@components/common/ProductTopBanner";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

const stickyTipData = [
  "https://www.youtube.com/embed/WMZ-qIL1KU8",
  "https://www.youtube.com/embed/6c4AEXVM8zw",
];

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      console.log("width: ", width);
      setWindowDimensions({
        width,
        height,
      });
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

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
  const screenWidth = useWindowDimensions().width;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    screenWidth > 707 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

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
                src="https://www.youtube.com/embed/K9NMXDPTnvg?autoplay=1&mute=1&controls=0&loop=1"
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
              <div className={styles.mobileText1}>
                NYC Skate
                <div>Sticker ART Street Art Streetwear</div>
              </div>
              <div className={styles.text2}>Indie Series</div>
            </section>
            <section className={styles.stickyTipSection}>
              <img src="/images/curves1.png" className={styles.curves1} />
              <div className={styles.swiperWrapper}>
                <Swiper
                  spaceBetween={3}
                  slidesPerView={isMobile ? 1 : 3}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onSwiper={(swiper) => {
                    // Delay execution for the refs to be defined
                    setTimeout(() => {
                      // Override prevEl & nextEl now that refs are defined
                      swiper.params.navigation.prevEl =
                        navigationPrevRef.current;
                      swiper.params.navigation.nextEl =
                        navigationNextRef.current;

                      // Re-init navigation
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    });
                  }}
                  onSlideChange={() => console.log("slide change")}
                  // onSwiper={(swiper) => console.log(swiper)}
                >
                  {stickyTipData.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className={styles.video}>
                          <iframe
                            className={styles.youtubeFrame}
                            width="560"
                            height="315"
                            src={`${item}?autoplay=1&mute=1&controls=0&loop=1`}
                          ></iframe>
                          {/* <video autoPlay muted loop playsInline>
                            <source src={item} type="video/mp4" />
                          </video> */}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className={styles.buttonWrapper}>
                <div className={styles.container}>
                  <button ref={navigationPrevRef}>
                    <img
                      src="/images/backward-button.png"
                      className={styles.backButton}
                    />
                  </button>
                  <button ref={navigationNextRef}>
                    <img
                      src="/images/forward-button.png"
                      className={styles.nextButton}
                    />
                  </button>
                </div>
              </div>
              <div className={styles.text1}>
                STICKY TIPS
                <div>from our kitchen</div>
              </div>
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

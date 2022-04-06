import { FC, useState } from 'react'
import s from './ProductView.module.scss'

import { Tabs, Tab } from '@components/ui'
import ProductDetailSlider from './ProductDetailSlider'
import { useRouter } from 'next/router'

const memeImages = [
  '/productDetails/1/1.png',
  '/productDetails/1/2.png',
  '/productDetails/1/3.png',
  '/productDetails/1/4.png',
  '/productDetails/1/5.png',
  '/productDetails/1/6.png',
  '/productDetails/1/7.png',
  '/productDetails/1/8.png',
  '/productDetails/1/9.png',
  '/productDetails/1/10.png',
  '/productDetails/1/11.png',
  '/productDetails/1/12.png',
  '/productDetails/1/13.png',
  '/productDetails/1/14.png',
  '/productDetails/1/15.png',
  '/productDetails/1/16.png',
  '/productDetails/1/17.png',
  '/productDetails/1/18.png',
  '/productDetails/1/19.png',
  '/productDetails/1/20.png',
  '/productDetails/1/21.png',
  '/productDetails/1/22.png',
  '/productDetails/1/23.png',
  '/productDetails/1/24.png',
  '/productDetails/1/25.png',
  '/productDetails/1/26.png',
  '/productDetails/1/27.png',
]

const memeImages1 = ['/productDetails/2/1.png', '/productDetails/2/2.png', '/productDetails/2/3.png']

interface Props {
  description: string
}

const ProductDetailTabs: FC<Props> = ({ description }) => {
  const router = useRouter()
  const { asPath } = router
  return (
    <div className={s.tabSection}>
      <Tabs>
        <Tab
          title={
            !asPath.includes('minecraft') ? 'REP YOUR DRIP' : 'ESPA MINECRAFT'
          }
        >
          <div>{description}</div>
          <br />
          <hr />
          <br />
          <div className={s.tabContentWrapper}>
            <div className="hidden md:block">
              <div className={s.arrowWrapper}>
                <span className={s.clock}> ⏱ </span>
                <div className={s.arrow} />
              </div>
              <div className={s.tabListContent}>
                <div className={s.leftTab}>
                  <h3 className={s.tabListContentTitle}>WHAT WE GET NOW</h3>
                  <div className={s.tabListContentItems}>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>Apparel</p>
                      </div>
                    </div>
                    {!asPath.includes('minecraft') ? (
                      <div className={s.tabListContentItemWrapper}>
                        <div className={s.tabListContentItem}>
                          <p>Proof of Uniqueness on Each Item</p>
                        </div>
                      </div>
                    ) : null}
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>Inventory Claim Ticket</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.rightTab}>
                  <h3 className={s.tabListContentTitle}>LATER</h3>
                  <div className={s.tabListContentItems}>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>
                          {asPath.includes('minecraft')
                            ? 'ERC1155 NFT'
                            : 'UNIQUE Memetic ERC1155 NFT'}
                        </p>
                      </div>
                      <div className={s.tabListContentItemSub}>
                        When Inventory is claimed
                      </div>
                    </div>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>
                          {!asPath.includes('minecraft')
                            ? 'DYNAMIC NFT'
                            : 'ESPA XP POINTS FOR BATTLE'}
                        </p>
                      </div>
                      <div className={s.tabListContentItemSub}>
                        4-6 Weeks After Launch
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block md:hidden text-center">
              <div className={s.arrowWrapperMobile}>
                <span className={s.clock}> ⏱ </span>
                <div className={s.arrow} />
              </div>
              <div className={s.tabListContentMobile}>
                <div className={s.leftTab}>
                  <h3 className={`${s.tabListContentTitle} mb-12`}>
                    WHAT WE GET NOW
                  </h3>
                  <div className={s.tabListContentItems}>
                    <div className={s.tabListContentItems}>
                      <div className={s.tabListContentItemWrapper}>
                        <div className={s.tabListContentItem}>
                          <p>Apparel</p>
                        </div>
                      </div>
                      {!asPath.includes('minecraft') ? (
                        <div className={s.tabListContentItemWrapper}>
                          <div className={s.tabListContentItem}>
                            <p>Proof of Uniqueness on Each Item</p>
                          </div>
                        </div>
                      ) : null}
                      <div className={s.tabListContentItemWrapper}>
                        <div className={s.tabListContentItem}>
                          <p>Inventory Claim Ticket</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.rightTab}>
                  <h3 className={`${s.tabListContentTitle} mb-4`}>LATER</h3>
                  <div className={s.tabListContentItems}>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>
                          {asPath.includes('minecraft')
                            ? 'ERC1155 NFT'
                            : 'UNIQUE Memetic ERC1155 NFT'}
                        </p>
                        <div className={s.tabListContentItemSub}>
                          When Inventory is claimed
                        </div>
                      </div>
                    </div>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>
                          {!asPath.includes('minecraft')
                            ? 'DYNAMIC NFT'
                            : 'ESPA XP POINTS FOR BATTLE'}
                        </p>
                        <div className={s.tabListContentItemSub}>
                          4-6 Weeks After Launch
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${s.bottomArrow} w-full flex justify-center h-12`}
                >
                  <div className={`${s.arrow} w-2 relative h-full`} />
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab
          title={
            !asPath.includes('minecraft')
              ? 'Memes for the Metaverse'
              : 'OPEN SOURCE NFT LIBRARY'
          }
        >
          <ProductDetailSlider
            content={!asPath.includes('minecraft') ? memeImages : memeImages1}
          />
          <hr className="my-6" />
          <div className="flex justify-between">
            <a
              target="_blank"
              href="https://blog.digitalax.xyz/digitalax-x-polygon-take-on-fashion-sustainability-mass-adoption-w-the-first-real-digifizzy-dcd814bd7a42"
              className={s.tabListContentTitle}
            >
              <span className={s.desktop}>MORE ABOUT DIGI-FIZZY</span>
              <span className={s.mobile}> ABOUT </span>
            </a>
            {!asPath.includes('minecraft') ? (
              <a
                target="_blank"
                href="https://blog.digitalax.xyz/from-memes-to-the-metaverse-3900ee517a25"
                className={s.tabListContentTitle}
              >
                <span className={s.desktop}> MEMES + METAVERSE </span>
                <span className={s.mobile}> METAVERSE </span>
              </a>
            ) : (
              <div className={s.tabListContentTitle}>
                <span className={s.desktop}> OPEN SOURCE PRINTS </span>
                <span className={s.mobile}> PRINTS </span>
              </div>
            )}
            <a
              target="_blank"
              href={
                !asPath.includes('minecraft')
                  ? 'https://blog.digitalax.xyz/counter-propaganda-memetic-patches-hybrid-digital-physical-fashion-nft-drip-launch-ea725cef4f2e'
                  : 'https://digitalax.xyz/fgo-2'
              }
              className={s.tabListContentTitle}
            >
              <span className={s.desktop}>
                {!asPath.includes('minecraft') ? 'MEMETIC PATCHES' : 'FGO'}
              </span>
              <span className={s.mobile}>
                {!asPath.includes('minecraft') ? 'MEMES' : 'FGO'}
              </span>
            </a>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default ProductDetailTabs

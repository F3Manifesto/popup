import { FC, useState, useEffect } from 'react'
import s from './ProductView.module.scss'

import { Tabs, Tab } from '@components/ui'
import { useRouter } from 'next/router'
import DesignerSlider from './DesignerSlider'
import PatternSlider from './PatternSlider'

interface Props {
  description: string
  title: string
}

const info: {
  [key: string]: {
    icon?: string
    globe?: string
    twitter?: string
    discord?: string
  }
} = {
  aave: {
    icon: '/cryptos/aave.png',
    globe: 'https://aave.com/',
    twitter: 'https://twitter.com/aaveaave',
    discord: 'https://aave.com/discord',
  },
  instadapp: {
    icon: '/cryptos/InstaDapp.png',
    globe: 'https://instadapp.io/',
    twitter: 'https://twitter.com/instadapp',
    discord: 'https://discord.com/invite/C76CeZc',
  },
  rulerprotocol: {
    icon: '/cryptos/ruler.png',
    globe: 'https://rulerprotocol.com/',
    twitter: 'https://twitter.com/RulerProtocol',
    discord: 'https://discord.com/invite/XcAQKg2YGP',
  },
  poap: {
    icon: '/cryptos/poap.png',
    globe: 'https://poap.xyz/',
    twitter: 'https://twitter.com/poapxyz',
    discord: 'https://discord.gg/9s8U8Bn',
  },
  forcedao: {
    icon: '/cryptos/Force.png',
    globe: 'https://www.forcedao.com/',
    twitter: 'https://twitter.com/force_dao',
    discord: 'http://discord.gg/xqxp2SNPwm',
  },
  zerion: {
    icon: '/cryptos/zerion.png',
    globe: 'https://zerion.io/',
    twitter: 'https://twitter.com/zerion_io',
    discord: 'https://discord.com/invite/B4kjkgv',
  },
  zapper: {
    icon: '/cryptos/Zapper.png',
    globe: 'https://zapper.fi/',
    twitter: 'https://twitter.com/zapper_fi',
    discord: 'https://discordapp.com/invite/h6CGbuN',
  },
  polygon: {
    icon: '/cryptos/Matic.png',
    globe: 'https://polygon.technology/',
    twitter: 'https://twitter.com/0xPolygon',
    discord: 'https://discord.gg/polygon',
  },
  opyn: {
    icon: '/cryptos/opyn.png',
    globe: 'https://www.opyn.co/',
    twitter: 'https://twitter.com/opyn_',
    discord: 'https://discord.com/invite/2NFdXaE',
  },
  picklefinance: {
    icon: '/cryptos/Pickle.png',
    globe: 'https://pickle.finance/',
    twitter: 'https://twitter.com/picklefinance',
    discord: 'https://discord.gg/uG6WhYkM8n',
  },
  rari: {
    icon: '/cryptos/Rari-logo@10x 1.png',
    globe: 'https://www.rari.capital/',
    twitter: 'https://twitter.com/RariCapital',
    discord: 'https://discord.gg/mtb6W57Ap6',
  },
  maker: {
    icon: '/cryptos/Maker.png',
    globe: 'https://makerdao.com/en/',
    twitter: 'https://twitter.com/MakerDAO',
  },
  bancor: {
    icon: '/cryptos/bancor.png',
    globe: 'https://bancor.network/',
    twitter: 'https://twitter.com/Bancor',
    discord: 'https://discord.gg/CAm3Ncyrxk',
  },
  fei: {
    icon: '/cryptos/Fei.png',
    globe: 'https://fei.money/',
    twitter: 'https://twitter.com/feiprotocol',
    discord: 'https://discord.com/invite/2prhYdQ5jP',
  },
}

const Web3ProductDetailTabs: FC<Props> = ({ description, title }) => {
  const router = useRouter()
  const { asPath } = router
  const index = asPath.split('/product/')[1].split('-')[0]

  return (
    <div className={s.tabSection}>
      <Tabs>
        <Tab title="W3FW">
          <div className={s.web3TabRow}>
            {/* <img src={(info[index] || {}).icon} className={s.tabRowImage} /> */}
            <div className={s.text}>
              <div className={s.title}> {title} </div>
              <div className={s.description}> {description} </div>
              {/* <div className={`flex items-center space-x-6 mt-4 ${s.icons}`}>
                <a href={(info[index] || {}).globe} target="_blank">
                  <img src="/images/globe 1.png" />
                </a>
                {(info[index] || {}).twitter ? (
                  <a href={(info[index] || {}).twitter} target="_blank">
                    <img src="/images/twitter 1.png" />
                  </a>
                ) : null}
                {(info[index] || {}).discord ? (
                  <a href={(info[index] || {}).discord} target="_blank">
                    <img src="/images/discord 1.png" />
                  </a>
                ) : null}
              </div> */}
            </div>
          </div>
          <div className={s.web3TabRow}>
            {/* <img src="/images/defi-map.png" className={s.tabRowImage} /> */}
            <div className={s.text}>
              <div className={s.title}>NFT Claim</div>
              <div className={s.description}>
                Every physical fashion item also is represented on-chain as a unique NFT with staking functionality. See more of the treasures that your purchase unlocks below. 
                <br /><br />
                If you pay via crypto your NFT is instantly teleported to your wallet. If you choose to pay via crypto you will receive an email from drip.digitalax.xyz with instructions of how to claim your NFT. Check the same email that you use at checkout.
              </div>
            </div>
          </div>
          <div className={s.web3TabRow}>
            {/* <img src="/images/defi-map.png" className={s.tabRowImage} /> */}
            <div className={s.text}>
              <div className={s.title}>Shipping</div>
              <div className={s.description}>
                Your item will arrive approximately 14 days after purchase. You will receive a tracking number to your email when your item is shipped and any other relevant shipping/production updates.
              </div>
            </div>
          </div>
          
        </Tab>
        <Tab title="GLOBAL DESIGNER NETWORK">
          <div className="flex flex-col items-center space-y-3">
            <div>
              <div className="text-lg font-bold">
                DIGITALAX & THE GLOBAL DESIGNER NETWORK.
              </div>
              Your fashion garment was designed by DIGITALAX in collaboration
              with hundreds of highly skilled digital and physical fashion
              designers under the Global Designer Network.
            </div>
            <div style={{ width: '100%' }}>
              <DesignerSlider />
            </div>
            <div>
              <a href="https://designers.digitalax.xyz/" target="_blank">
                <b className="underline">
                  {' '}
                  Meet All of the Web3 Fashion Anarchists
                </b>{' '}
              </a>
            </div>
            <div>
              Every part of your fashion is minted on-chain as an NFT under the
              <a
                href="https://designers.digitalax.xyz/fractional"
                target="_blank"
              >
                <b className="underline">
                  {' '}
                  Fractional Garment Ownership standard.
                </b>{' '}
              </a>
              Patterns, materials, textures and prints are designed by the
              Global Designer Network and minted as ERC-1155 NFTs by each
              designer, where they are open sourced under the DIGITALAX on-chain
              material libraries.
              <br />
              <br />
              This allows for modular and composable tracking of every part of
              the garment throughout the entire supply chain (Across both the
              digital and physical realms). The master garment is minted as an
              ERC-721 that owns a balance of the incorporated ERC-1155 NFTs
              on-chain— establishing streamlined fractional royalties for all
              contributors and injecting open source into fashion.
            </div>
            <div style={{ width: '100%' }}>
              <PatternSlider />
            </div>
            <div className="">
              <a
                href="https://designers.digitalax.xyz/opensourcelibraries/"
                target="_blank"
              >
                {' '}
                <b className="underline">
                  {' '}
                  See Entire On-Chain Open Source Libraries{' '}
                </b>{' '}
              </a>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Web3ProductDetailTabs

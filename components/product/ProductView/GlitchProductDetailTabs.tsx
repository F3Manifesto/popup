import { Tab, Tabs } from '@components/ui'
import { useRouter } from 'next/router'
import { FC } from 'react'
import DesignerSlider from './DesignerSlider'
import PatternSlider from './PatternSlider'
import styles from './ProductView.module.scss'

interface Props {
  description: string
}

const GlitchProductDetailTabs: FC<Props> = ({ description }) => {
  const router = useRouter()

  return (
    <div className={styles.tabSection}>
      <Tabs>
        <Tab title="glitched series">
          <div className={styles.web3TabRow}>
            <div className={styles.text}>{description}</div>
          </div>
        </Tab>
        <Tab title="fractional garment ownership">
          <div className={styles.web3TabRow}>
            <div className="flex flex-col items-center space-y-3">
              <div>
                Every part of your fashion is minted on-chain as an NFT under
                the
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
                designer, where they are open sourced under the DIGITALAX
                on-chain material libraries.
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
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default GlitchProductDetailTabs

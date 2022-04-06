import { Tab, Tabs } from '@components/ui'
import { useRouter } from 'next/router'
import { FC } from 'react'
import DesignerSlider from './DesignerSlider'
import styles from './ProductView.module.scss'

interface Props {}

const LookProductDetailTabs: FC<Props> = ({}) => {
  const router = useRouter()

  return (
    <div className={styles.tabSection}>
      <Tabs>
        <Tab title="CUSTOMISED LOOT FASHION">
          <div className={styles.web3TabRow}>
            <div className={styles.text}>
              LOOK is generative composable fashion look book text. How you wear
              it is up to you. It’s an experiment in web3 metaverse and
              composable on-chain fashion. If you own a LOOK NFT you will be
              able to purchase a physical varsity jacket that includes your
              on-chain NFT text in the design.{' '}
              <b>
                Make sure to connect the wallet that is holding your LOOK NFT so
                we can verify your purchase and include the correct metadata!
              </b>
            </div>
          </div>
        </Tab>
        <Tab title="get digitally dressed too!">
          <div className={styles.web3TabRow}>
            <div className="flex flex-col items-center space-y-3">
              <div className={styles.text}>
                If you’d like to match your physical fashion with some awesome
                digital fashion to wear across the metaverse and get dressed by
                the Global Designer Network tailors, head over{' '}
                <a
                  href="https://designers.digitalax.xyz/getdressed/"
                  target="_blank"
                >
                  <b>here</b>
                </a>{' '}
                to get fitted!
              </div>
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
                <a href="https://designerstyles.digitalax.xyz/" target="_blank">
                  <b className="underline">
                    {' '}
                    Meet All of the Web3 Fashion Anarchists
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

export default LookProductDetailTabs

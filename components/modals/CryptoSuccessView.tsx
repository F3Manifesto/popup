import { useUI, Button } from '@components/ui'
import router from 'next/router'
import { FC, useEffect } from 'react'

interface Props {}

const CryptoSuccessView: FC<Props> = () => {
  const { closeModal, setModalView } = useUI()
  const goBack = () => {
    router.back()
    closeModal()
    setModalView('')
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="uppercase text-center text-3xl font-bold">
        fashion x defi
      </h1>
      <p className="text-center">
        This Fashion NFT is not an ordinary asset. It unlocks an entire <br />{' '}
        world of Crypto, DeFi and Web3!
      </p>
      <p className="text-center">
        Your items are handcrafted. Shipping takes approximately 2 <br /> weeks
        from purchase.
      </p>
      <a
        href="https://staking.digitalax.xyz/"
        target="_blank"
        className="text-xl font-bold underline text-center"
      >
        Start Using Your NFT Here, Stake it For Yield!
      </a>
      <Button variant="slim" onClick={goBack}>
        Continue Shopping
      </Button>
    </div>
  )
}

export default CryptoSuccessView

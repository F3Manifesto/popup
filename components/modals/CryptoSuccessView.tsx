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
        Purchase Success
      </h1>
      <p className="text-center">
        Your items are handcrafted. 
      </p>
      <p className="text-center">
        Shipping takes approximately 2 <br /> weeks
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

import { useUI, Button } from '@components/ui'
import router from 'next/router'
import { FC } from 'react'

interface Props {}

const PurchaseSuccessView: FC<Props> = () => {
  const { closeModal, setModalView } = useUI()
  const goBack = () => {
    router.back()
    closeModal()
    setModalView('')
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="uppercase text-center text-3xl font-bold">
        you just got web3 fashioned
      </h1>
      <p className="text-center">
        Congratulations! Welcome to the Revolution. Your Decentraland in-game
        wearable and unique PFP game character will be airdropped to your wallet
        in a few hours! Also, you will receive an email shortly with
        instructions for how to wear your fashion digitally!
      </p>
      <p className="text-center">
        In the meantime you can stake your fashion for $MONA yield{' '}
        <a href="https://staking.digitalax.xyz/" target="_blank">
          {' '}
          here!{' '}
        </a>
      </p>
      <Button variant="slim" onClick={goBack}>
        OKAY!
      </Button>
    </div>
  )
}

export default PurchaseSuccessView

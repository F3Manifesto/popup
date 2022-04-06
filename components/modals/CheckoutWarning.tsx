import { Button, useUI } from '@components/ui'
import { useMain } from 'context'
import { Router, useRouter } from 'next/router'
import { FC } from 'react'

interface Props {}

const CheckoutWarning: FC<Props> = () => {
  const router = useRouter()
  const { setModalView, closeModal } = useUI()
  const { account } = useMain()

  return (
    <div className="flex flex-col space-y-3 items-center w-96 mx-10">
      <h1 className="text-center text-2xl font-bold">
        Every NFT Minted Is Unique. Checkout Your Tokens 1 by 1.
      </h1>
      <p className="text-center">
        You will need to go through the checkout process individually for each
        purchase with crypto in order to mint your NFT. Only add 1 item to your
        cart at a time! All items are handcrafted and arrive approximately two
        weeks after purchase!
      </p>
      <p className="text-center italic font-bold font-xl">
        Multi-purchase coming soon!
      </p>
      <Button
        variant="slim"
        onClick={() => {
          if (!account) {
            setModalView('CRYPTO_SIGNUP_VIEW')
          } else {
            closeModal()
            router.push('/checkout-crypto')
          }
        }}
      >
        GOT IT!
      </Button>
    </div>
  )
}

export default CheckoutWarning

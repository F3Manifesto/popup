import { FC } from 'react'
import { Button, useUI } from '@components/ui'
import { setAuthOption, setCollectionId, useMain } from 'context'
import router, { useRouter } from 'next/router'

interface Props {}

const AuthOptionsView: FC<Props> = () => {
  const { closeModal, setModalView, closeSidebar } = useUI()
  const { dispatch, user } = useMain()
  const { asPath } = useRouter()
  const collectionId = asPath.split('/')[1].split('-')[1]

  const onOptionClick = async (option: number) => {
    if (option === 0) {
      dispatch(setAuthOption(0))
      if (user) {
        closeModal()
        setModalView('')
        closeSidebar()
        dispatch(setCollectionId(collectionId))
        router.push('/checkout-crypto')
      } else {
        setModalView('CRYPTO_SIGNUP_VIEW')
      }
    } else {
      dispatch(setAuthOption(1))
      router.push('/checkout')
      closeModal()
      setModalView('')
      closeSidebar()
    }
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="text-center text-3xl font-newyork text-yellow font-bold py-6 md:py-0 md:px-6">
        {' '}
        Choose Crypto or Fiat.{' '}
      </h1>
      <p className="my-4 pb-4">
        {/* {' '}
        Take Your Drip Across The Realms. Claim Your NFT.{' '} */}
      </p>
      <Button variant="new-slim" width="200px" onClick={() => onOptionClick(0)}>
        <span className="uppercase font-lemonmilk">crypto</span>
      </Button>
      <Button variant="new-slim" width="200px" onClick={() => onOptionClick(1)}>
        <span className="uppercase font-lemonmilk">fiat</span>
      </Button>
    </div>
  )
}

export default AuthOptionsView

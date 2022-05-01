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
        Purchase Success!
      </h1>
      <p className="text-center">
        You're items are handcrafted and will arrive in approximately ~2 weeks.
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

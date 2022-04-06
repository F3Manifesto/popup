import { useUI, Button } from '@components/ui'
import { FC } from 'react'
import styles from './bespoke.module.scss'
interface Props {}

const BespokeView: FC<Props> = () => {
  // const { closeModal, setModalView } = useUI()
  // const goBack = () => {
  //   router.back()
  //   closeModal()
  //   setModalView('')
  // }

  return (
    <div className={["flex flex-col space-y-3 items-center", styles.bespokeWrapper].join(' ')}>
      <h1 className="uppercase text-center text-3xl font-bold">
        Go To The Metaverse Boutique
      </h1>
      <p className={["text-center", styles.description].join(' ')}>
        Get a custom outfit, tailored by the Global Designer Network! 
        You can choose from 2D or 3D styles and the games that you want this look to be compatible with. 
        Maybe you want the Minecraft version of your high fidelity 3D dress, 
        Decentraland version of your pixelated PFP or another game mod and style not yet discovered for yet! 
        The Web3 Tailors are here to bring you your best metaverse style!
      </p>
      <a href="https://designers.digitalax.xyz/getdressed/" target="_blank">
        <Button variant="new-slim">
          TELEPORT
        </Button>
      </a>
    </div>
  )
}

export default BespokeView
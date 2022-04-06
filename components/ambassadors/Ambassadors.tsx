import { FC } from 'react'
import s from './Ambassadors.module.scss'

const AmbassadorsBoard: FC = () => {
  return (
    <div className={s.background}>
      {/* <img src="/images/ambassador.png" className="w-full" /> */}
      <div className={`bg-black text-white text-center m-auto ${s.blackBox}`}>
        <div className={s.title}> Ambassador Program </div>
        <p>
          <b>
            {' '}
            DIGITALAX is revolutionising the fashion industry, pioneering
            digital fashion, open source, NFTs, web3, gaming, esports. We are
            building infrastructure for the metaverse, where designers,
            developers, players are at the heart of it all.{' '}
          </b>
        </p>
        <p>
          Are you a fashion forward leader or influencer? Want to crossover the
          digi-physical realms? If you’re ready to bring culture, style and
          fashion to the metaverse then we’d love to collaborate with you.
        </p>
        <a
          type="button"
          href="https://espadigitalax.typeform.com/to/knkuW7aR"
          target="_blank"
          className={s.requestButton}
        >
          {' '}
          Request Here{' '}
        </a>
        <ul className="text-center">
          <li>
            {' '}
            Rep DigiFizzy IRL, the first hybrid digital-physical NFT fashion
            line{' '}
          </li>
          <li> Feature creative takes in our Metaverse Magazine </li>
          <li> Release your own NFT content drip line </li>
          <li>
            {' '}
            Collaborate with other top designers, fashion artists in the space{' '}
          </li>
          <li> Enter the esports & streaming arena and get sponsored </li>
          <li> ....... and more. </li>
        </ul>
      </div>
    </div>
  )
}

export default AmbassadorsBoard

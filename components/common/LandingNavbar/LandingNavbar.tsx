import { FC, useState } from 'react'
import { Hamburger } from '@components/icons'
import Link from 'next/link'
import s from './LandingNavbar.module.scss'

const LandingNavbar: FC = () => {
  const [hamburger, setHambuger] = useState(false)

  return (
    <div
      className={`${
        hamburger && s.hamburgerWrapper
      } relative bg-transparent flex flex-row justify-between py-4 align-center md:py-6`}
    >
      <div className={`w-full flex items-center justify-between px-4`}>
        <div className={s.branding}>
          <Link href="https://digitalax.xyz">
            <a className={s.logo} aria-label="Logo">
              <span className={`${s.brand} text--uppercase fw-normal`}>
                Digitalax{' '}
              </span>
              <span className={s.subBrand}>The Digital Fashion Engine</span>
            </a>
          </Link>
        </div>
        <nav className={`hidden ml-6 space-x-6 lg:block`}>
          <a
            className={s.link}
            target="_blank"
            href="https://digitalax.xyz/whitepaper"
          >
            R&D
          </a>
          <a
            className={s.link}
            target="_blank"
            href="https://digitalax.xyz/marketplace"
          >
            Marketplace
          </a>
          <a
            className={s.link}
            target="_blank"
            href="https://staking.digitalax.xyz/staking"
          >
            Staking
          </a>
          <a
            className={s.link}
            target="_blank"
            href="https://espa.digitalax.xyz/"
          >
            Esports Platform
          </a>
        </nav>
        <div className="block md:hidden">
          <button
            className={`${s.hamburger} outline-none`}
            onClick={() => setHambuger(!hamburger)}
          >
            <Hamburger color="white" />
          </button>
        </div>
      </div>
      {hamburger && (
        <div className={s.hamburgerPane}>
          <a
            className={s.link}
            target="_blank"
            href="https://digitalax.xyz/whitepaper"
          >
            R&D
          </a>
          <a
            className={s.link}
            target="_blank"
            href="https://marketplace.digitalax.xyz"
          >
            Marketplace
          </a>
          <a
            className={s.link}
            target="_blank"
            href="https://espa.digitalax.xyz"
          >
            Staking
          </a>
          <a
            className={s.link}
            target="_blank"
            href="https://espa.digitalax.xyz"
          >
            Esports Platform
          </a>
        </div>
      )}
    </div>
  )
}

export default LandingNavbar

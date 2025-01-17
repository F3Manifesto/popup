import { FC } from 'react'
import Link from 'next/link'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import NavbarRoot from './NavbarRoot'
import s from './Navbar.module.scss'

const Navbar: FC = () => (
  <NavbarRoot>
    {/* <Container> */}
    <div className="relative flex flex-row justify-between align-center">
      <div className={`${s.navLeft} flex items-center`}>
        <div className={s.branding}>
          <a href="/" className={s.logo} aria-label="Logo">
            <img src="/images/logo.png" />
          </a>
        </div>
        <nav className={`${s.navItems} hidden ml-6 space-x-6 lg:block`}>
          <Link passHref href="https:/f3manifesto.xyz/">
            <a className={s.link} target="_blank">
              Home Port
            </a>
          </Link>
          <Link href="https://market.f3manifesto.xyz/">
            <a className={s.link} target="_blank">
              Digital Fashion Market
            </a>
          </Link>
          <Link href="https://web3fashionmanifesto.f3manifesto.xyz/">
            <a className={s.link} target="_blank">
              Web3 Fashion Manifesto
            </a>
          </Link>
          <Link href="https://themanifest.f3manifesto.xyz/">
            <a className={s.link} target="_blank">
              The Manifest Gallery
            </a>
          </Link>
          <Link href="https://web3cc0openlibrary.f3manifesto.xyz/">
            <a className={s.link} target="_blank">
              Web3 CC0 Open Library
            </a>
          </Link>
        </nav>
      </div>

      <div className="flex justify-end">
        <UserNav />
      </div>
    </div>
    {/* </Container> */}
  </NavbarRoot>
)

export default Navbar

import { FC } from 'react'
import Link from 'next/link'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import NavbarRoot from './NavbarRoot'
import s from './Navbar.module.scss'

const Navbar: FC = () => (
  <NavbarRoot>
    <Container>
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className={`${s.navLeft} flex items-center`}>
          <div className={s.branding}>
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <img src="/images/logo.png" />
              </a>
            </Link>
          </div>
          <nav className={`${s.navItems} hidden ml-6 space-x-6 lg:block`}>
            <Link href="/">
              <a className={s.link}>
                WEB3 FASHION MANIFESTO
              </a>
            </Link>
            <Link href="https://fashion.digitalax.xyz/">
              <a className={s.link} target="_blank">
                MARKET
              </a>
            </Link>
            <Link href="https://staking.digitalax.xyz/">
              <a className={s.link} target="_blank">
                SECONDARY MARKETPLACE
              </a>
            </Link>
          </nav>
        </div>

        <div className="flex justify-end">
          <UserNav />
        </div>
      </div>
    </Container>
  </NavbarRoot>
)

export default Navbar

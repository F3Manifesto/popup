import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@framework/common/get-all-pages'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.scss'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = ['terms-of-use', 'shipping-returns', 'privacy-policy']

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const router = useRouter()
  const isAmbassadors = router.pathname.includes('ambassadors')
  const rootClassName = cn(className)

  return (
    <footer className={`${rootClassName} ${s.footer}`}>
      <Container>
        <div className={`${s.footerWrapper}`}>
          <div className={s.heading}>
            {isAmbassadors ? 'GET IN TOUCH' : 'STAY UP TO DATE'}
          </div>
          <div className={s.description}>
            {isAmbassadors
              ? 'Contact us through contact@digitalax.xyz or reach out on any of our social media channels. We would love to hear from you. '
              : 'Check out our Medium and join our Discord community to stay up to date!'}
          </div>
          <div className={s.centerWrapper}>
            <div className={`${s.dFlex} ${s.aboutLine}`}>
              <a href="https://drive.google.com/file/d/1zG8h4GnodW7uWm_OsUY3g4I4RpOx6bMH/view?usp=sharing">
                ABOUT DIGITALAX
              </a>
              <a href="https://digitalax.gitbook.io/digitalax/" target="_blank">
                DOCUMENTATION
              </a>
              <a href="https://drive.google.com/file/d/1oFiBGBr_CN0-mUuuEp_g6wDBr-mNA0Uh/view?usp=sharing">
                READ ABOUT ESPA
              </a>
            </div>
            <img
              src="/white-logo.svg"
              alt="white-logo"
              className={s.whiteLogo}
            />
            <div className={`${s.dFlex} ${s.iconsLine}`}>
              <a href="https://www.facebook.com/digitalax1" target="_blank">
                <img
                  src="/images/facebook.svg"
                  alt=""
                  className={s.facebookIcon}
                />
              </a>
              <a href="https://twitter.com/DIGITALAX_" target="_blank">
                <img
                  src="/images/twitter.svg"
                  alt=""
                  className={s.twitterIcon}
                />
              </a>
              <a href="https://www.instagram.com/_digitalax" target="_blank">
                <img
                  src="/images/instagram.svg"
                  alt=""
                  className={s.instagramIcon}
                />
              </a>
              <a href="https://www.tiktok.com/@digitalax_" target="_blank">
                <img src="/images/tiktok.svg" alt="" className={s.tiktokIcon} />
              </a>
              <a href="https://www.twitch.tv/digitalax" target="_blank">
                <img src="/images/twitch.svg" alt="" className={s.twitchIcon} />
              </a>
              <a href="https://discord.com/invite/DKbSqRGtKv" target="_blank">
                <img
                  src="/images/discord.svg"
                  alt=""
                  className={s.discordIcon}
                />
              </a>
              <a href="https://www.reddit.com/r/DIGITALAX/" target="_blank">
                <img src="/images/reddit.svg" alt="" className={s.redditIcon} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCE26XV44aaYe1zlPnDbiz5Q"
                target="_blank"
              >
                <img
                  src="/images/youtube.svg"
                  alt=""
                  className={s.youtubeIcon}
                />
              </a>
              <a href="https://digitalax.medium.com/" target="_blank">
                <img
                  src="/images/medium-small.png"
                  alt=""
                  className={s.mediumIcon}
                />
              </a>
            </div>
            <div className={`${s.dFlex} ${s.faqLine}`}>
              <a href="https://blog.digitalax.xyz" target="_blank">
                FAQs
              </a>
              <a href="https://digitalax.xyz/marketplace" target="_blank">
                Digital Fashion Auctions
              </a>
              <a href="https://staking.digitalax.xyz" target="_blank">
                Staking
              </a>
            </div>
          </div>
          <div className="flex justify-end my-4">
            <Link href="/ambassadors">
              <a className={`uppercase text-3xl font-bold ${s.ambassadorText}`}>
                apply for ambassadors!
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)

      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer

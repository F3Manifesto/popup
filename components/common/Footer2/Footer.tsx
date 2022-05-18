import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Page } from "@framework/common/get-all-pages";
import getSlug from "@lib/get-slug";
import { Github, Vercel } from "@components/icons";
import { Logo, Container } from "@components/ui";
import { I18nWidget } from "@components/common";
import styles from "./Footer.module.scss";

interface Props {
  className?: string;
  children?: any;
  pages?: Page[];
}

const LEGAL_PAGES = ["terms-of-use", "shipping-returns", "privacy-policy"];

const Footer: FC<Props> = ({ className, pages }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.textLogo}>
          <img
            className={styles.imageLogo}
            src="/images/logoBig.png"
            alt="logo_big"
          />
        </div>

        <div className={styles.centerWrapper}>
          <div className={styles.description}>
            Web3 FASHION CC0 BRAND.
            {/* <br></br><br></br>
            <a className={styles.minting} href="https://docs.f3manifesto.xyz/marketplaces/pop-up#4c22" target="_blank" rel="noreferrer" >Minting Standard</a><br></br><br></br> */}
          </div>
          <div className={styles.description2}>
            How to make it in web3, make bags & not lose your soul.
          </div>

          <div className={[styles.dFlex, styles.iconsLine].join(" ")}>
            <a
              href="https://www.tiktok.com/@f3manifesto"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/social/tiktok-icon.png"
                alt="tiktok-icon"
                className={styles.tiktokIcon}
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UC5SOYiDrdooqNusoS5vrJAw"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/social/youtube-icon.png"
                alt="youtube-icon"
                className={styles.youtubeIcon}
              />
            </a>
            <a
              href="https://f3manifesto.medium.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/social/medium-icon.png"
                alt="medium-icon"
                className={styles.mediumIcon}
              />
            </a>
            <a
              href="https://mirror.xyz/f3manifesto.eth"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/social/mirror.png"
                alt="mirror-icon"
                className={styles.mirrorIcon}
              />
            </a>
            <a
              href="https://twitter.com/f3manifesto"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/social/twitter-icon.png"
                alt="twitter-icon"
                className={styles.twitterIcon}
              />
            </a>
            <a
              href="https://docs.f3manifesto.xyz/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/social/gitbook.png"
                alt="gitbook-icon"
                className={styles.gitbookIcon}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function usePages(pages?: Page[]) {
  const { locale } = useRouter();
  const sitePages: Page[] = [];
  const legalPages: Page[] = [];

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url);

      if (!slug) return;
      if (locale && !slug.startsWith(`${locale}/`)) return;

      if (isLegalPage(slug, locale)) {
        legalPages.push(page);
      } else {
        sitePages.push(page);
      }
    });
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  };
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug);

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0);
}

export default Footer;

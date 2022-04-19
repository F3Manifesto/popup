import { FC, useState, useEffect, useRef } from "react";
import Link from "next/link";
import cn from "classnames";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import type { LineItem } from "@framework/types";
import useCart from "@framework/cart/use-cart";
import { Bag } from "@components/icons";
import { useUI } from "@components/ui/context";
import DropdownMenu from "./DropdownMenu";
import s from "./UserNav.module.scss";
import { setFromSignin, useMain } from "context";
import ClickOutside from "@lib/click-outside";

interface Props {
  className?: string;
}

const countItem = (count: number, item: LineItem) => count + item.quantity;

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart();
  const { toggleSidebar, openModal, setModalView } = useUI();
  const { user, dispatch } = useMain();
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0;
  const [display, setDisplay] = useState(false);
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [display]);

  const signIn = () => {
    dispatch(setFromSignin(true));
    setModalView("CRYPTO_SIGNUP_VIEW");
    openModal();
  };

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <nav className={cn(s.root, className)}>
        <div className={s.mainContainer}>
          <ul className={s.list}>
            {user?.username ? (
              <li className={s.item}>
                <DropdownMenu />
              </li>
            ) : (
              <li className={s.item}>
                <button type="button" onClick={signIn} className={s.signinBtn}>
                  {" "}
                  sign in{" "}
                </button>
              </li>
            )}
            <li className={s.item} onClick={toggleSidebar}>
              <Bag className={s.cart} />
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </li>
            <li
              className={[s.item, s.hamburger].join(" ")}
              onClick={() => {
                console.log("test");
                setDisplay(!display);
              }}
            >
              {/* <span className="">☰</span> */}
              <div></div>
              <div></div>
              <div></div>
            </li>
          </ul>
        </div>
        {display && (
          <ul className={s.mobileMenu} ref={ref}>
            <li>
              <Link href="https://docs.f3manifesto.xyz/">
                <a className={s.link} target="_blank">
                  DOCUMENTATION
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://web3fashionmanifesto.f3manifesto.xyz/manifesto/1/">
                <a className={s.link} target="_blank">
                  Web3 Fashion manifesto
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://mirror.xyz/f3manifesto.eth">
                <a className={s.link} target="_blank">
                  Sub-thread weekly
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://themanifest.f3manifesto.xyz/">
                <a className={s.link} target="_blank">
                  The Manifest Gallery
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://web3cc0openlibrary.f3manifesto.xyz/">
                <a className={s.link} target="_blank">
                  Web3 CC0 Open Library
                </a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </ClickOutside>
  );
};

export default UserNav;

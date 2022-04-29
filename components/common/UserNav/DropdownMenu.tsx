import cn from "classnames";
import { FC, useRef, useState, useEffect } from "react";
import s from "./DropdownMenu.module.css";
import { Avatar } from "@components/common";
import ClickOutside from "@lib/click-outside";

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { setAccount, setChainId, setUser, setWallet, useMain } from "context";
import { disconnectWallet } from "services/network.service";
import { toast } from "react-toastify";

interface DropdownMenuProps {
  open?: boolean;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  const [display, setDisplay] = useState(false);
  const { dispatch, wallet, account, user } = useMain();
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

  const logout = async () => {
    try {
      disconnectWallet(wallet);
      dispatch(setWallet());
      dispatch(setAccount());
      dispatch(setChainId());
      dispatch(setUser(null));
      window.localStorage.removeItem("F3M_POPUP_ACCOUNT");
      window.localStorage.removeItem("F3M_POPUP_USER");
      window.localStorage.removeItem("F3M_POPUP_CHAIN_ID");
      window.localStorage.removeItem("F3M_POPUP_CRYPTO_OPTION");
      window.localStorage.removeItem("F3M_POPUP_WALLET");
    } catch (err) {
      toast.error((err as any).message);
    }
  };

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div>
        <button
          className={s.avatarButton}
          onClick={() => setDisplay(!display)}
          aria-label="Menu"
        >
          <div className="flex items-center space-x-2">
            <Avatar>
              <img
                src={user.avatar}
                className={s.avatarImg}
                alt="nav-profile-image"
              />
            </Avatar>
            <span className="hidden lg:block">{account?.slice(0, 7)}...</span>
          </div>
        </button>
        {display && (
          <ul className={s.dropdownMenu} ref={ref}>
            <li>
              <a className={cn(s.link, "")} href="/profile">
                Profile
              </a>
            </li>
            <li>
              <a
                className={cn(s.link, "border-t border-accents-2")}
                onClick={() => logout()}
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownMenu;

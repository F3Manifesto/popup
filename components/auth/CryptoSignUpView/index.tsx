import { FC, useState, useEffect } from "react";
import cn from "classnames";
import styles from "./styles.module.css";
import { setWeb3Provider } from "services/web3-provider.service";
import { connectWallet } from "services/network.service";
import { setAccount, setChainId, setWallet, useMain } from "context";
import { toast } from "react-toastify";
import { useUI } from "@components/ui";

interface Props {}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      console.log("width: ", width);
      setWindowDimensions({
        width,
        height,
      });
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const CryptoSignUpView: FC<Props> = () => {
  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);

  const { setModalView } = useUI();
  const { dispatch, account } = useMain();

  useEffect(() => {
    screenWidth > 707 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  const btnClasses = cn(
    "w-80 bg-yellow flex items-center px-6 py-1 justify-start",
    styles.walletBtn
  );

  const onConnect = async (option: number) => {
    if (isMobile) {
      console.log("isMobile: ", isMobile);

      setModalView("METAMASK_MOBILE");
    } else {
      setWeb3Provider(option);
      try {
        const res = await connectWallet(option);
        console.log({ account });
        if (!account) {
          dispatch(setWallet(option));
          dispatch(setAccount(res.account));
          dispatch(setChainId(res.chainId));
          window.localStorage.setItem("ACCOUNT", res.account);
          window.localStorage.setItem("CHAIN_ID", res.chainId);
          window.localStorage.setItem("WALLET", option.toString());
        }
        setModalView("SIGNUP_VIEW");
      } catch (error) {
        toast.error((error as any).message);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1
        className={cn(styles.title, "text-center text-3xl mb-5 mt-10 md:mt-0")}
      >
        {" "}
        Connect Your Wallet{" "}
      </h1>
      {/* <h2 className={styles.description}>
        If you are new to crypto please sign up/sign in with a Venly Wallet!
      </h2> */}
      <div className={btnClasses} onClick={() => onConnect(1)}>
        <img src="/images/metamask.png" className="w-11" />
        <span className={styles.buttonCaption}> Metamask </span>
      </div>
      <div className={btnClasses} onClick={() => onConnect(2)}>
        <img src="/images/arkane.png" className="w-11" />
        <span className={styles.buttonCaption}> Venly </span>
      </div>
    </div>
  );
};

export default CryptoSignUpView;

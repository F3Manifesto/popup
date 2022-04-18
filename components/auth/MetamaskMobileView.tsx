import { FC } from "react";
import { useUI } from "@components/ui/context";
import { Button } from "@components/ui";
import styles from "./signupview.module.scss";

interface Props {}

const MetamaskMobile: FC<Props> = () => {
  const { closeModal } = useUI();

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSignup}
      className={[
        styles.wrapper,
        "flex flex-col space-y-3 justify-between p-3",
      ].join(" ")}
    >
      <h3 className="text-center text-3xl font-newyork text-yellow">
        METAMASK
      </h3>
      <div className={styles.walletAddress}>
        Metamask doesn't support mobile, please try again on your desktop.
      </div>
      <div className="pt-2 w-full flex flex-col">
        <Button
          className={styles.button}
          variant="new-slim"
          onClick={() => closeModal()}
        >
          Close
        </Button>
      </div>
    </form>
  );
};

export default MetamaskMobile;

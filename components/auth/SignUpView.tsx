import { FC, useEffect, useState, useCallback } from "react";
import { useUI } from "@components/ui/context";
import { Button, Input } from "@components/ui";
import router from "next/router";
import { setUser, useMain } from "context";
import { authenticate, fetchAuthToken, signup } from "services/api.service";
import { handleSignMessage } from "services/wallet.service";
import styles from "./signupview.module.scss";

interface Props {}

const SignUpView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [signMsg, setSignMsg] = useState(null);
  const { closeModal } = useUI();
  const { account, dispatch, fromSignin } = useMain();

  const tryToSignup = async (signMsg: any) => {
    try {
      if (!signMsg) {
        signMsg = await signup(account, username, "popup@digitalax.xyz");
      }

      const { signature } = await handleSignMessage({
        account,
        signMsg,
      });
      const data = await authenticate(account, signMsg, signature);
      if (data) {
        const { returnData, secret } = data;
        dispatch(setUser(returnData));
        window.localStorage.setItem("user", JSON.stringify(returnData));
        window.localStorage.setItem("TOKEN", secret);
      }
    } catch (e) {
      console.log({ e });
      throw e;
    }
  };

  const validateUsername = () => {
    const regEx = /^[A-Za-z0-9]*$/;
    return regEx.test(String(username));
  };

  // const validateEmail = () => {
  //   const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return regEx.test(String(email).toLowerCase());
  // };

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (!signMsg) {
      if (username.length > 10) {
        setMessage("User ID must be less than 10 characters!");
        return;
      }

      if (!validateUsername()) {
        setMessage("User ID must contains letters and numbers only!");
        return;
      }

      // if (!validateEmail()) {
      //   setMessage("You have entered an invalid Email address!");
      //   return;
      // }
    }

    try {
      setLoading(true);
      setMessage("");

      await tryToSignup(signMsg);

      setLoading(false);
      closeModal();
      if (!fromSignin) {
        router.push("/checkout-crypto");
      }
    } catch (errors: any) {
      setLoading(false);
      if (errors?.response && errors.response.data) {
        setMessage(errors.response.data);
      } else {
        setMessage(errors.message);
      }
    }
  };

  useEffect(() => {
    const getAuthToken = async () => {
      console.log("this is before fetching auth token");
      const msg = await fetchAuthToken(account);
      console.log("this is after fetching auth token");
      setSignMsg(msg);
      setDisabled(false);
    };

    getAuthToken();
  }, [account]);

  return (
    <form
      onSubmit={handleSignup}
      className={[
        styles.wrapper,
        "flex flex-col space-y-3 justify-between p-3",
      ].join(" ")}
    >
      {!disabled ? (
        <>
          <h3 className="text-center text-3xl font-newyork text-yellow">
            {!signMsg ? "Sign Up" : "Welcome Back!"}
          </h3>
          {signMsg && <div className={styles.walletAddress}>{account}</div>}
          {!signMsg && (
            <div className="flex flex-col ">
              {!!message.length && (
                <div className="text-red border border-red p-3">{message}</div>
              )}
              <div className={styles.label}>Username</div>
              <Input className={styles.input} onChange={setUsername} />
              {/* <div className={styles.label}>Email</div>
              <Input className={styles.input}  type="email" onChange={setEmail} /> */}
            </div>
          )}
          <div className="pt-2 w-full flex flex-col">
            <Button
              className={styles.button}
              variant="new-slim"
              type="submit"
              loading={loading}
            >
              {signMsg ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </>
      ) : null}
    </form>
  );
};

export default SignUpView;

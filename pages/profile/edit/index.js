import React, { useState, useEffect } from "react";
import Router from "next/router";
import { toast } from "react-toastify";

import { Layout } from "@components/common";
import Button from "@components/ui/Button";
import LoadingDots from "@components/ui/LoadingDots";
import InfoCard from "@components/ui/InfoCard";

// import userActions from '@actions/user.actions'
import { useMain, setUser } from "context";

import styles from "./styles.module.scss";
import digitalaxApi from "services/digitalaxApi.service";

const EditProfile = ({ history }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { user, dispatch } = useMain();

  if (!user) {
    // digitalaxApi
    // dispatch(userActions.checkStorageAuth())
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    setCurrentUser(user);
  }, [user]);

  if (!currentUser) {
    return <LoadingDots className={styles.loader} large />;
  }

  const uploadAvatar = async (file) => {
    try {
      setisLoading(true);
      let url = await digitalaxApi.getPresignedUrl();
      console.log("url: ", url);
      if (url) {
        const result = await digitalaxApi.uploadImageToS3(url, file);
        if (result) {
          const queryIndex = url.indexOf("?");
          if (queryIndex >= 0) {
            url = url.slice(0, queryIndex);
          }
          currentUser.avatar = url;
          console.log("currentUser: ", currentUser);
          localStorage.setItem("F3M_POPUP_USER", JSON.stringify(currentUser));
          setCurrentUser(currentUser);
          dispatch(setUser(currentUser));
        }
      }
    } catch (e) {}
    setisLoading(false);
  };

  const updateProfile = async () => {
    setisLoading(true);
    try {
      const data = await digitalaxApi.updateProfile(currentUser);
      setisLoading(false);
      if (data) {
        console.log("data: ", JSON.stringify(currentUser));
        localStorage.setItem("F3M_POPUP_USER", JSON.stringify(data));
        dispatch(setUser(data));
        toast.success("Your profile updated successfully.");
      } else {
      }
    } catch (e) {
      setisLoading(false);
    }
  };

  const showBrowserForAvatar = () => {
    document.getElementById("avatar-upload").click();
  };

  const onChangeFile = (e) => {
    const files = e.target.files || e.dataTransfer.files;

    if (files.length === 0) {
      return;
    }
    uploadAvatar(files[0]);
  };

  const onChange = (e, key) => {
    setCurrentUser({
      ...currentUser,
      [key]: e.target.value,
    });
  };

  const validateUserName = (username) => {
    const regEx = /^[A-Za-z0-9]*$/;
    return regEx.test(String(username));
  };

  const validateEmail = (email) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(email).toLowerCase());
  };

  const validIp = (address) => {
    const regEx = /^(([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)$/;
    return regEx.test(address);
  };

  const saveProfile = () => {
    if (!validateUserName(currentUser.username)) {
      toast("User ID must contains letters and numbers only!");
      return;
    }
    if (!validateEmail(currentUser.email)) {
      toast("You have entered an invalid Email address!");
      return;
    }
    updateProfile();
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <InfoCard mainColor={"#4E4AFF"} bodyClass={styles.padding5}>
          <h1>
            This is your global web3 fashion profile, interoperable across all
            DIGITALAX protocol stack integrated realms
          </h1>
          <div className={styles.profileWrapper}>
            <div className={styles.avatarWrapper}>
              <img
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : "../../../images/user-profile/user-avatar-black.svg"
                }
              />
              <input
                id="avatar-upload"
                type="file"
                onChange={onChangeFile}
                hidden
                accept=".jpg, .png, .gif"
              />
              <Button
                className={styles.uploadButton}
                background="black"
                onClick={showBrowserForAvatar}
              >
                UPLOAD
              </Button>
              <span>JPG, PNG, GIF. NO BIGGER THAN 5MB.</span>
            </div>
            <div className={styles.detailsWrapper}>
              <div className={styles.inputSection}>
                <span>CHANGE USER ID</span>
                <input
                  value={currentUser.username}
                  onChange={(e) => onChange(e, "username")}
                />
              </div>
              <div className={styles.inputSection}>
                <span>CHANGE EMAIL</span>
                <input
                  value={currentUser.email}
                  onChange={(e) => onChange(e, "email")}
                />
              </div>
              <div className={styles.inputSection}>
                <span>ADD TWITTER</span>
                <input
                  value={currentUser.twitter}
                  onChange={(e) => onChange(e, "twitter")}
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              className={styles.backProfileButton}
              background="black"
              onClick={() =>
                Router.push("/profile").then(() => window.scrollTo(0, 0))
              }
            >
              BACK TO PROFILE
            </Button>

            <Button
              className={styles.saveButton}
              background="black"
              onClick={saveProfile}
            >
              SAVE
            </Button>
          </div>
          {isLoading && <LoadingDots className={styles.pageLoader} large />}
        </InfoCard>
      </div>
    </div>
  );
};

export default EditProfile;

EditProfile.Layout = Layout;

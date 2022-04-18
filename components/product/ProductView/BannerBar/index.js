import React from "react";
import classnames from "classnames";
import styles from "./styles.module.scss";

const BannerBar = ({ className, sourceFile }) => {
  const classes = classnames(styles.wrapper, className);
  return (
    <div className={classes}>
      <div>
        <div className={styles.node}>
          <a href={sourceFile} target="_blank">
            VIEW ALL CC0 SOURCE MATERIAL
          </a>
        </div>
      </div>
    </div>
  );
};

export default BannerBar;

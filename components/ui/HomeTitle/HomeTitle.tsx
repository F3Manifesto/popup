import React from "react";
import { useRouter } from "next/router";
import s from "./HomeTitle.module.scss";

type Props = {
  pageType?: number;
  isHomePage?: boolean;
  isExplorePage?: boolean;
};

const HomeContent: React.FC<Props> = ({
  pageType = "collection",
  isHomePage = false,
  isExplorePage = false,
}) => {
  const { asPath } = useRouter();

  return (
    <div
      className={[
        s.homeTitleContainer,
        isHomePage ? s.homepage : "",
        isExplorePage ? s.explore : "",
      ].join(" ")}
    >
      {
        <div className={s.titleWrapper}>
          <div className={s.title}>
            F<sub>3</sub>Manifesto
          </div>
        </div>
      }
    </div>
  );
};

export default HomeContent;

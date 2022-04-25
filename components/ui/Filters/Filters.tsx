import React, { useState, FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  filter: string;
  filterChange(value: string): void;
  sortByChange(sort: string): void;
}

const Filters: FC<Props> = ({ filter, filterChange, sortByChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0);

  const filterItems = [
    " ",
    " most recent ",
    " highest price ",
    " lowest price ",
    " sold ",
    " exclusive rarity ",
    " semi-rare rarity ",
    " common rarity ",
    " male ",
    " female ",
  ];

  const onClickItem = (e: any) => {
    const value = e.getAttribute("data-value");
    console.log("value: ", value);
    setCurrentSelectedIndex(value);
    sortByChange(value);
    setShowFilters(false);
  };

  return (
    <>
      <div className={styles.actions}>
        <div className={styles.filterWrapper}>
          <div className={styles.filterLabel}>
            Search
            <div className={styles.helper}>
              <span className={styles.questionMark}>?</span>
              <span className={styles.description}>
                FILTER BY DESIGNER, OUTFIT NAME OR COLLECTOR ID
              </span>
            </div>
          </div>
          <div className={styles.filterInput}>
            <img src="/images/icons/search-icon.png" />
            <input
              className={styles.filter}
              value={filter}
              onChange={(e) => filterChange(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.sortWrapper}>
          <div className={styles.sortLabel}>Sort By</div>
          <div
            className={styles.sortInput}
            onClick={() => {
              !showFilters && setShowFilters(true);
            }}
          >
            {!showFilters && (
              <div className={styles.currentItem}>
                <img
                  className={styles.arrowBottomImg}
                  src="/images/arrow-bottom.svg"
                  alt="arrow-bottom"
                />
                <span>{filterItems[currentSelectedIndex]}</span>
              </div>
            )}
            <ul className={showFilters ? styles.show : styles.hidden}>
              {filterItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    data-value={`${index}`}
                    onClick={(e) => onClickItem(e.target)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;

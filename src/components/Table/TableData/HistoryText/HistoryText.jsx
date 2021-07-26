import * as React from "react";
import { useSelector } from "react-redux";

import { selectShortenedUrl } from "../../../../redux/shortenedLink/shortenedLinkSlice";
import * as styles from "./HistoryText.module.scss";

export const ShortLink = ({ copyLink, children }) => {
  const newUrl = {
    base: "https://impraise-shorty.herokuapp.com/",
    slug: `${children}`,
  };

  return (
    <div onClick={copyLink} className={styles.shortenedUrl}>
      <div role="presentation" className="shortened">
        {newUrl.base}

        <span>{newUrl.slug}</span>
      </div>

      <p>Click to copy this link</p>
    </div>
  );
};

export const ShortenedLink = ({ children }) => {
  return (
    <a className={styles.url} href={children}>
      {children}
    </a>
  );
};

const HistoryText = ({ children, shortcode }) => {
  const { createNewStatus, entities } = useSelector((state) =>
    selectShortenedUrl(state)
  );

  const isNew =
    createNewStatus === "success" &&
    entities[entities.length - 1].shortcode === shortcode;

  const copyLink = (event) => {
    const range = document.createRange();
    const text = event.currentTarget.querySelector(".shortened");

    range.selectNode(text);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    alert(`Link copied to clipboard!`);
  };

  const allowedTypes = [ShortLink, ShortenedLink];

  return (
    <div
      className={
        isNew
          ? `${styles.historyText} ${styles.newlyAdded}`
          : `${styles.historyText}`
      }
    >
      {React.Children.map(children, (child) => {
        if (allowedTypes.includes(child.type)) {
          return React.cloneElement(child, {
            copyLink,
          });
        }
      })}
    </div>
  );
};

export default HistoryText;

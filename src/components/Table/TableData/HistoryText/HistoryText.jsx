import * as React from "react";
import * as styles from "./HistoryText.module.scss";

const HistoryText = ({ url, shortenedUrl }) => {
  return (
    <div className={styles.historyText}>
      <div className={styles.shortenedUrl}>
        <a href={shortenedUrl}>{shortenedUrl}</a>
        <p>Click to copy this link</p>
      </div>

      <a className={styles.url} href={url}>
        {url}
      </a>
    </div>
  );
};

export default HistoryText;

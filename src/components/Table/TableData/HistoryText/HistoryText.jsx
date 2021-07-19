import * as React from "react";
import * as styles from "./HistoryText.module.scss";

const HistoryText = ({ shortcode, shortenedUrl }) => {
  const newUrl = {
    base: "https://impraise-shorty.herokuapp.com/",
    slug: `${shortcode}`,
  };

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

  return (
    <div className={styles.historyText}>
      <div onClick={copyLink} className={styles.shortenedUrl}>
        <div role="presentation" className="shortened">
          {newUrl.base}

          <span>{newUrl.slug}</span>
        </div>

        <p>Click to copy this link</p>
      </div>

      <a className={styles.url} href={shortenedUrl}>
        {shortenedUrl}
      </a>
    </div>
  );
};

export default HistoryText;

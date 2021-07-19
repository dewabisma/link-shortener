import * as React from "react";
import * as styles from "./UrlBox.module.scss";

const SearchBox = () => {
  const [url, setUrl] = React.useState("");

  const inputHandler = (event) => {
    setUrl(event.target.value);
  };

  const getShortenUrl = () => {
    alert("hehe");
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={url}
        onChange={inputHandler}
        placeholder="Paste the link you want to shorten here"
      />

      <button
        className={styles.activeBtn}
        onClick={getShortenUrl}
        disabled={!url}
      >
        Shorten this link
      </button>
    </div>
  );
};

export default SearchBox;

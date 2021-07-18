import React from "react";
import * as styles from "./SearchBox.module.scss";

const SearchBox = () => {
  const [url, setUrl] = React.useState("");

  const inputHandler = (event) => {
    setUrl(event.target.value);
  };

  const getShortenUrl = () => {};

  return (
    <div className={styles.searchBox}>
      <input type="text" value={url} onChange={inputHandler} />

      <button onClick={getShortenUrl}>Shorten this link</button>
    </div>
  );
};

export default SearchBox;

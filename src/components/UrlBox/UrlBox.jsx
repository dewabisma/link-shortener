import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewShortenedUrl,
  selectShortenedUrl,
} from "../../redux/shortenedLink/shortenedLinkSlice";

import ErrorFallback from "../ErrorFallback/ErrorFallback";

import * as styles from "./UrlBox.module.scss";

const SearchBox = () => {
  const dispatch = useDispatch();

  const { createNewStatus, createNewError } = useSelector((state) =>
    selectShortenedUrl(state)
  );

  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState("");

  const inputHandler = (event) => {
    setUrl(event.target.value);
  };

  const getShortenUrl = () => {
    dispatch(createNewShortenedUrl(url));
  };

  React.useEffect(() => {
    if (createNewStatus === "success") setUrl("");
    if (createNewStatus === "failed") setError(createNewError);
  }, [createNewStatus, createNewError]);

  return (
    <>
      {error && <ErrorFallback>{error}</ErrorFallback>}
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
          disabled={!url || createNewStatus === "loading"}
        >
          Shorten this link
        </button>
      </div>
    </>
  );
};

export default SearchBox;

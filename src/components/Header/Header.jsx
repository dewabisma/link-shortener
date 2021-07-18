import * as React from "react";
import * as styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Shooooort</h1>
      <p>The link shortener with a long name</p>
    </div>
  );
};

export default Header;

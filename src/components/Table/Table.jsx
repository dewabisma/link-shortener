import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectShortenedUrl,
  clearHistory,
} from "../../redux/shortenedLink/shortenedLinkSlice";
import TableData, { LinkDisplay, StatsDisplay } from "./TableData/TableData";

import * as styles from "./Table.module.scss";

const Table = () => {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => selectShortenedUrl(state));

  const clearHistoryHandler = () => {
    if (entities) {
      window.localStorage.removeItem("history");
      dispatch(clearHistory());
    }
  };

  return (
    <div className={styles.table}>
      <div className={styles.tableCaption}>
        <h3>Previously shortened by you</h3>
        <button onClick={clearHistoryHandler}>Clear history</button>
      </div>

      <table>
        <thead>
          <tr className={styles.tableHead}>
            <th>LINK</th>
            <th>VISITS</th>
            <th>LAST VISITED</th>
          </tr>
        </thead>

        <tbody>
          {entities.map((entity) => (
            <TableData
              key={entity.id}
              shortenedUrl={entity.shortenedUrl}
              shortcode={entity.shortcode}
            >
              <LinkDisplay />
              <StatsDisplay />
            </TableData>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

import * as React from "react";
import { formatDistanceToNow } from "date-fns";

import HistoryText from "./HistoryText/HistoryText";

import * as styles from "./TableData.module.scss";

const TableData = ({ url, shortenedUrl, visitCount, lastVisitTIme }) => {
  const distanceTime = formatDistanceToNow(lastVisitTIme);

  return (
    <tr className={styles.tableData}>
      <td>
        <HistoryText url={url} shortenedUrl={shortenedUrl} />
      </td>
      <td>{visitCount}</td>
      <td>{distanceTime}</td>
    </tr>
  );
};

export default TableData;

import * as React from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

import HistoryText from "./HistoryText/HistoryText";
import ErrorFallback from "../../ErrorFallback/ErrorFallback";

import * as styles from "./TableData.module.scss";

const TableData = ({ shortenedUrl, shortcode }) => {
  const [stats, setStats] = React.useState({
    redirectCount: 0,
    lastSeenDate: "-",
    error: null,
    status: "loading",
  });

  React.useEffect(() => {
    if (stats.status === "loading")
      (async (code) => {
        try {
          const { data } = await axios.get(`/${code}/stats`);

          const lastVisitedTime = data.lastSeenDate
            ? formatDistanceToNow(new Date(String(data.lastSeenDate)))
            : "-";

          console.log("called");

          setStats({
            ...stats,
            redirectCount: data.redirectCount,
            lastSeenDate: lastVisitedTime,
            status: "success",
          });
        } catch (error) {
          const errMsg = error.response.data;
          setStats({ ...stats, error: errMsg, status: "failed" });
        }
      })(shortcode);
  }, [shortcode, stats]);

  return (
    <tr tabIndex="0" role="list" className={styles.tableData}>
      <td>
        <HistoryText shortcode={shortcode} shortenedUrl={shortenedUrl} />
      </td>
      {stats.error ? (
        <>
          <td>
            <ErrorFallback>{stats.error}</ErrorFallback>
          </td>
          <td>
            <ErrorFallback>{stats.error}</ErrorFallback>
          </td>
        </>
      ) : stats.status === "loading" ? (
        <>
          <td>Loading...</td>
          <td>Loading...</td>
        </>
      ) : (
        <>
          <td>{stats.redirectCount}</td>
          <td>{stats.lastSeenDate}</td>
        </>
      )}
    </tr>
  );
};

export default TableData;

import * as React from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

import HistoryText from "./HistoryText/HistoryText";
import ErrorFallback from "../../ErrorFallback/ErrorFallback";

import * as styles from "./TableData.module.scss";

const TableData = ({ url, shortenedUrl, shortcode }) => {
  const [stats, setStats] = React.useState({
    redirectCount: 0,
    lastSeenDate: "-",
    error: null,
    status: "idle",
  });

  const getShortcodeStats = async (code) => {
    try {
      setStats({ ...stats, status: "loading" });

      const { data } = await axios.get(`/${code}/stats`);

      const lastVisitedTime = data.lastSeenDate
        ? formatDistanceToNow(new Date(String(data.lastSeenDate)))
        : "-";

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
  };

  React.useEffect(() => {
    getShortcodeStats(shortcode);
  }, [shortcode]);

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

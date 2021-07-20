import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

import HistoryText, {
  ShortLink,
  ShortenedLink,
} from "./HistoryText/HistoryText";
import ErrorFallback from "../../ErrorFallback/ErrorFallback";

import * as styles from "./TableData.module.scss";

const StatsError = ({ stats }) => {
  return (
    <>
      <td>
        <ErrorFallback>{stats.error}</ErrorFallback>
      </td>
      <td>
        <ErrorFallback>{stats.error}</ErrorFallback>
      </td>
    </>
  );
};

const StatsLoading = () => {
  return (
    <>
      <td>Loading...</td>
      <td>Loading...</td>
    </>
  );
};

const StatsSuccess = ({ stats }) => {
  return (
    <>
      <td>{stats.redirectCount}</td>
      <td>{stats.lastSeenDate}</td>
    </>
  );
};

export const StatsDisplay = ({ stats }) => {
  switch (stats.status) {
    case "loading":
      return <StatsLoading />;
    case "success":
      return <StatsSuccess stats={stats} />;
    case "failed":
      return <StatsError stats={stats} />;
    default:
      return (
        <ErrorFallback>Error: something impossible happened</ErrorFallback>
      );
  }
};

export const LinkDisplay = ({ shortcode, shortenedUrl }) => {
  return (
    <td>
      <HistoryText>
        <ShortLink>{shortcode}</ShortLink>
        <ShortenedLink>{shortenedUrl}</ShortenedLink>
      </HistoryText>
    </td>
  );
};

const TableData = ({ children, shortcode, shortenedUrl }) => {
  const [stats, setStats] = React.useState({
    redirectCount: 0,
    lastSeenDate: "-",
    error: null,
    status: "loading",
  });

  const allowedTypes = [
    StatsError,
    StatsDisplay,
    StatsLoading,
    StatsSuccess,
    LinkDisplay,
  ];

  React.useEffect(() => {
    if (stats.status === "loading")
      (async (code) => {
        try {
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
          const errMsg = error.response ? error.response.data : error.message;
          setStats({ ...stats, error: errMsg, status: "failed" });
        }
      })(shortcode);
  }, [shortcode, stats]);

  return (
    <tr tabIndex="0" role="list" className={styles.tableData}>
      {React.Children.map(children, (child) => {
        if (allowedTypes.includes(child.type)) {
          return React.cloneElement(child, {
            stats,
            shortcode,
            shortenedUrl,
          });
        }
      })}
    </tr>
  );
};

export default TableData;

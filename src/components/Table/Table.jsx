import * as React from "react";
import TableData from "./TableData/TableData";

import * as styles from "./Table.module.scss";

const Table = () => {
  return (
    <div className={styles.table}>
      <div className={styles.tableCaption}>
        <h3>Previously shortened by you</h3>
        <button>Clear history</button>
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
          <TableData
            url="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, dolorem."
            shortenedUrl="hahahahaha"
            visitCount={12}
            lastVisitTIme={new Date()}
          />

          <TableData
            url="kwodwkodwko"
            shortenedUrl="hahahahaha"
            visitCount={12}
            lastVisitTIme={new Date()}
          />

          <TableData
            url="kwodwkodwko"
            shortenedUrl="hahahahaha"
            visitCount={12}
            lastVisitTIme={new Date()}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Table;

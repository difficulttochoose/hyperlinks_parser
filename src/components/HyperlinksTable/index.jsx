import React from "react";
import styles from "./HyperlinkTable.module.scss";

export default function HyperlinksTable(props) {
  const { links } = props;
  const tr = links.map((l) => (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        <a className={styles.link} href={l.value}>
          {l.value}
        </a>
      </td>
      <td className={styles.tableCell}>{l.label}</td>
    </tr>
  ));
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableRow}>
          <th className={styles.tableCell}>Hyperlink value</th>
          <th className={styles.tableCell}>Link label</th>
        </tr>
      </thead>
      <tbody>{tr}</tbody>
    </table>
  );
}

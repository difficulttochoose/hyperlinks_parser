import React from "react";

export default function HyperlinksTable(props) {
  const { links } = props;
  return (
    <table style={{ width: "500px" }}>
      <thead>
        <tr>
          <th>Hyperlink value</th>
          <th>Link label</th>
        </tr>
      </thead>
      <tbody>{links}</tbody>
    </table>
  );
}

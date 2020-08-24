import React, { Component } from "react";
import Form from "./Form";
import HyperlinksTable from "../HyperlinksTable";

class HyperlinksParser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      error: null,
      htmlText: "",
    };
  }

  fetchHtmlDocument = (url) => {
    fetch(url, {
      method: "GET",
      "Content-type": "text/html",
    })
      .then((response) => response.text())
      .then((data) => {
        const links = data.match(
          /<\s*?[aA]\s+.*?href\s*=\s*(?<quote>\\?['"])(?<hrefValue>.*?)\k<quote>.*?>(?<label>.*?)<\/[aA]\s*?>/g
        );

        const labelLink = /.+(?<quote>\\?["'])\s*?>|<\s*?\/\s*a\s*>/g;

        const valueLink = /.+(?<=href\s*=\s*(?<quote>\\?['"]))|(?=(\k<quote>\\?['"])).+/g;

        const linksTable = links.map((v) => {
          const value = v.replace(valueLink, "");
          const label = v.replace(labelLink, "");
          const tr = (
            <tr>
              <td>
                <a href={value}>{value}</a>
              </td>
              <td>{label}</td>
            </tr>
          );
          return tr;
        });
        this.setState({
          htmlText: linksTable,
        });
      });
  };

  handleSubmit = ({ values: { urlValue } }) => {
    this.fetchHtmlDocument(urlValue);
  };

  render() {
    const { htmlText } = this.state;
    return (
      <article>
        <Form onSubmit={this.handleSubmit} />
        <section>
          <h1>HTML</h1>
          <HyperlinksTable links={htmlText} />
        </section>
      </article>
    );
  }
}

export default HyperlinksParser;

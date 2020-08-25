import React, { Component } from "react";
import Form from "./Form";
import HyperlinksTable from "../HyperlinksTable";
import spinnerStyle from "./spinner.module.css";

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
          const tr = {
            value,
            label,
          };
          return tr;
        });
        this.setState({
          htmlText: linksTable,
          isFetching: false,
        });
      });
  };

  handleSubmit = ({ values: { urlValue } }) => {
    this.setState({
      isFetching: true,
    });
    this.fetchHtmlDocument(urlValue);
  };

  render() {
    const { htmlText, isFetching } = this.state;
    return (
      <article>
        <Form onSubmit={this.handleSubmit} />
        <section>
          <h1>HTML</h1>
          {isFetching ? (
            <div className={spinnerStyle.loader}>Loading...</div>
          ) : (
            htmlText !== "" && <HyperlinksTable links={htmlText} />
          )}
        </section>
      </article>
    );
  }
}

export default HyperlinksParser;

import React from "react";
import HTMLReactParser from "html-react-parser";

interface ReactHtmlStringProps {
  html: any;
}
const ReactHtmlString = ({ html }: ReactHtmlStringProps) => {
  return <div>{HTMLReactParser(html)}</div>;
};

export default ReactHtmlString;

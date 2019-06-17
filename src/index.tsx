import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { HackerNewsClient } from "./HackerNewsClient";
import { LocalStorageMap } from "./utils/LocalStorageMap";
import { ConditionalMapReader } from "./utils/ConditionalMapReader";

const client = new HackerNewsClient(
  new ConditionalMapReader(
    () => !navigator.onLine,
    new LocalStorageMap("feed")
  ),
  new LocalStorageMap("item")
);

ReactDOM.render(<App client={client} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

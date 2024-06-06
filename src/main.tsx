import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HomePage />
    </Provider>
  </React.StrictMode>
);

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";

import HomePage from "./pages/HomePage";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.
const theme = createTheme();

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

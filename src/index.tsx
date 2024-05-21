import React from "react";
import ReactDOM from "react-dom/client";
import "./Localization/i18n";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme/theme";
import "./index.css";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins",
            },
            components: {
              Menu: {
                darkItemSelectedBg: "#000000e0",
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

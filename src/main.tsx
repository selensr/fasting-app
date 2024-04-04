import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.scss";

import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { AuthProvider } from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);

import { Provider } from "./components/ui/provider"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
import ItemProvider from "./context/ItemProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <AuthProvider>
        <ItemProvider>
        <App />
        </ItemProvider>
      </AuthProvider>
    </Provider>

  </React.StrictMode>
);

import { Provider } from "./components/ui/provider"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
import ItemProvider from "./context/ItemProvider";
import { Toast } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <AuthProvider>
        <ItemProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </ItemProvider>
      </AuthProvider>
    </Provider>

  </React.StrictMode>
);

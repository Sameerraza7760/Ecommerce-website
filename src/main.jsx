import React from "react";
import ReactDOM from "react-dom/client"; // Update this line
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom"; // Add this line

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      {" "}
      <App />
    </Router>
  </Provider>
);

// App.tsx
import React from "react";
import { Provider } from "react-redux";

import AppRouter from "./Config/Router/Router";
import ErrorBoundary from "./Errorboundry/ErrorBoundary";
import AdminDashboard from './../src/Pages/Admininterface/AdminDashboard/AdminDashboard'
import { store } from "./store/store";
import ManegeOrder from "./Pages/Admininterface/MenegeOrder/ManegeOrder";
import CreateOrder from "./Pages/Admininterface/CreateOrder/CreateOrder";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>

    {/* <AdminDashboard/> */}
    {/* <ManegeOrder/> */}
    {/* <CreateOrder/> */}

    </Provider>
  );
}

export default App;

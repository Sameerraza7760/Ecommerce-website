// App.tsx
import React from "react";
import { Provider } from "react-redux";

import AppRouter from "./Config/Router/Router";
import ErrorBoundary from "./Errorboundry/ErrorBoundary";
import { store } from "./store/store";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;

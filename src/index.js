import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import firebase from "./firebase";
import routeConfiguration from "./routeConfiguration";
import Routes from "./Routes";
import { authInfoSuccess } from "./ducks/auth.duck";
import "./index.css";
import * as ServiceWorkerRegistration from "./serviceWorkerRegistration";
import "bootstrap/dist/css/bootstrap.min.css";

// store
const store = configureStore({}, firebase);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch(authInfoSuccess(user));
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes routes={routeConfiguration()} />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
ServiceWorkerRegistration.register();
// serviceWorker.unregister();

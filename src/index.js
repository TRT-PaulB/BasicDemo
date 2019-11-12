import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // notice navbar and body padding specified here
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStroopwafel,
  faHeart,
  faHeartBroken
} from "@fortawesome/free-solid-svg-icons";
library.add(faStroopwafel);
library.add(faHeart);
library.add(faHeartBroken);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();

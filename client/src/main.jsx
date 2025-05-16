import {
  createRoot,
} from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";
import "./assets/styles/index.scss";
import App from "./App.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

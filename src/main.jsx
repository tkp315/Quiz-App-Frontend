import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "./context/SocketProvider.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <SocketProvider>
  <Provider store={store}>

    <BrowserRouter>
    <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <App />
    </BrowserRouter>

  </Provider>
  </SocketProvider>
);

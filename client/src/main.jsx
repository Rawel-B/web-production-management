import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthProvider } from './AuthContext'
import "./index.css";
import App from "./App.jsx";
import globalReducer from "./state";
import { api } from "./state/api";
import { BrowserRouter } from 'react-router-dom';

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
          <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

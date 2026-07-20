// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'

import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App.jsx";

import { store } from "./app/store";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import router from "./router";
import './index.css'
import { CountryProvider } from './CountryContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CountryProvider>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </CountryProvider>,
)

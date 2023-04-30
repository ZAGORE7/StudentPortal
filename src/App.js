import React from "react";
import ReactDOM from "react-dom/client";
import router from "./Routes/Mainroutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;

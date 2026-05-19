import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";

import router from "@/app/router/index";
import ReduxProvider from "@/app/providers/ReduxProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <RouterProvider router={router} />
      <App />
    </ReduxProvider>
  </StrictMode>
);

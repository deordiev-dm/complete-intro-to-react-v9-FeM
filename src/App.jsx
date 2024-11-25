import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <RouterProvider router={router} />;
  </StrictMode>,
);

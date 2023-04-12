import React from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
import "./styles/globals.css";

const activeChain = "mumbai";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

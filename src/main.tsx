// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CVProvider } from "./contexts/CVContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <CVProvider>
    <App />
  </CVProvider>
  // </StrictMode>
);

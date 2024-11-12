import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @TODP: remove index.css line if not require in future
// import './index.css'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

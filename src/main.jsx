import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./styles/index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <App />
      </ThemeProvider>
    </HeroUIProvider>
  </StrictMode>
);

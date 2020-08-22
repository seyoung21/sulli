import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { Router } from "@reach/router";
import SocketConnectionProvider from "./providers/SocketProvider";
import TeacherOption from "./components/teacheroption";
import Teacher from "./pages/teacher";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <SocketConnectionProvider>
          <Router>
            <App path="/" />
            <Teacher path="teacher" />
          </Router>
        </SocketConnectionProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

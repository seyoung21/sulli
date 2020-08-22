import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { Router } from "@reach/router";
import SocketConnectionProvider from "./providers/SocketProvider";
import Teacher from "./pages/teacher";
import TeacherRoom from "./pages/teacherRoom";
import StudentRoom from "./pages/studentRoom";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <SocketConnectionProvider>
          <Router>
            <App path="/" />
            <Teacher path="teacher" />
            <TeacherRoom path="teacher/:roomID" />
            <StudentRoom path="student/:roomID" />
          </Router>
        </SocketConnectionProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

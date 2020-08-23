import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
  ITheme,
} from "@chakra-ui/core";
import { Router } from "@reach/router";
import SocketConnectionProvider from "./providers/SocketProvider";
import Teacher from "./pages/teacher";
import TeacherRoom from "./pages/teacherRoom";
import StudentRoom from "./pages/studentRoom";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    happy: { 200: "#FFCC80", 500: "#FFCC80" },
    confused: { 200: "#F3CDCA", 500: "#F3CDCA" },
    anxious: { 200: "#D2E5EC", 500: "#D2E5EC" },
    tired: { 200: "#CBCEDF", 500: "#CBCEDF" },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
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

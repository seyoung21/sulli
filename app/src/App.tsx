import React from "react";
import { Heading, Text } from "@chakra-ui/core";
import { useSocketConnectionStatus } from "./providers/SocketProvider";
import ClassRoomKey from "./components/classroomkey";
import Layout from "./components/layout";
import TeacherOption from "./components/teacheroption";

export interface IApp {
  path: any;
}

const App: React.FC<IApp> = ({ path }) => {
  const connectionStatus = useSocketConnectionStatus();

  return (
    <Layout>
      <ClassRoomKey />
      <TeacherOption />
    </Layout>
  );
};

export default App;

import React from "react";
import { useSocketConnectionStatus } from "../providers/SocketProvider";
import Layout from "../components/layout";
import StartClass from "../components/startclass";

export interface ITeacher {
  path: any;
}

const Teacher: React.FC<ITeacher> = ({ path }) => {
  const connectionStatus = useSocketConnectionStatus();

  return (
    <Layout>
      <StartClass />
    </Layout>
  );
};

export default Teacher;

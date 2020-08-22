import React from "react";
import Layout from "../components/layout";
import StartClass from "../components/startclass";

export interface ITeacher {
  path: any;
}

const Teacher: React.FC<ITeacher> = ({ path }) => {
  return (
    <Layout>
      <StartClass />
    </Layout>
  );
};

export default Teacher;

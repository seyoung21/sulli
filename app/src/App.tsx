import React from "react";
import ClassRoomKey from "./components/classroomkey";
import Layout from "./components/layout";
import TeacherOption from "./components/teacheroption";

export interface IApp {
  path: any;
}

const App: React.FC<IApp> = ({ path }) => {
  return (
    <Layout>
      <ClassRoomKey />
      <TeacherOption />
    </Layout>
  );
};

export default App;

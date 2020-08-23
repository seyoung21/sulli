import React, { useContext, useState, useEffect } from "react";
import { SocketConnectionContext } from "./SocketProvider";

export interface IIncomingMessage {
  reaction: string;
  sender: string;
}

export interface IStudentList {
  sockets: { [id: string]: boolean };
  length: number;
}

export interface ITeacherContext {
  incomingMessageListener: (message: IIncomingMessage) => void;
  students: IStudentList;
}

export interface ITeacherProvider {
  children: React.ReactNode;
  incomingMessageListener: (message: IIncomingMessage) => void;
}

const TeacherContext = React.createContext<Partial<ITeacherContext>>({});

const TeacherProvider: React.FC<ITeacherProvider> = ({
  children,
  incomingMessageListener,
}) => {
  const socketContext = useContext(SocketConnectionContext);
  const [students, setStudentsList] = useState<IStudentList>();

  useEffect(() => {
    if (socketContext && socketContext.socket) {
      socketContext.socket.on(
        "student_reaction_incoming",
        (message: IIncomingMessage) => {
          incomingMessageListener(message);
        }
      );

      socketContext.socket.on("student_list", (data: IStudentList) => {
        setStudentsList(data);
      });
    }
  }, [socketContext]);

  useEffect(() => {
    console.log(students);
  }, [students]);

  return (
    <TeacherContext.Provider value={{ incomingMessageListener, students }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useStudentList = () => {
  const context = useContext(TeacherContext);
  if (context && context.students) {
    return context.students;
  }
};
export default TeacherProvider;

import React, { useContext, useState } from "react";
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

  if (
    socketContext &&
    socketContext.socket &&
    !socketContext.socket.hasListeners("student_reaction_incoming") &&
    !socketContext.socket.hasListeners("student_list")
  ) {
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

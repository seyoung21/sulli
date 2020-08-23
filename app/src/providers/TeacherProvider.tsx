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

export interface IStudentReaction {
  socketID: string;
  reaction: string;
}

export interface ITeacherContext {
  incomingMessageListener: (message: IIncomingMessage) => void;
  students: IStudentList;
  studentReactions: IStudentReaction[];
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
  const [studentReactions, setStudentReactions] = useState<IStudentReaction[]>(
    []
  );

  useEffect(() => {
    if (socketContext && socketContext.socket) {
      socketContext.socket.on(
        "student_reaction_incoming",
        (message: IIncomingMessage) => {
          incomingMessageListener(message);
          setStudentReactions((prevState) => {
            const newState = [...prevState];
            const idx = newState.findIndex(
              (val) => val.socketID === message.sender
            );
            if (idx >= 0) {
              console.log(idx, newState);
              newState[idx].reaction = message.reaction;
            } else {
              newState.push({
                socketID: message.sender,
                reaction: message.reaction,
              });
            }
            return newState;
          });
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
    <TeacherContext.Provider
      value={{ incomingMessageListener, students, studentReactions }}
    >
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

export const useStudentReactions = () => {
  const context = useContext(TeacherContext);
  if (context && context.studentReactions) {
    return context.studentReactions;
  }
};
export default TeacherProvider;

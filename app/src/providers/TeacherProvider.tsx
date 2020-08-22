import React, { useContext } from "react";
import { SocketConnectionContext } from "./SocketProvider";

export interface IIncomingMessage {
  reaction: string;
  sender: string;
}

export interface ITeacherContext {
  socket: SocketIOClient.Socket;
  socketConnectionStatus: boolean;
  incomingMessageListener: (message: IIncomingMessage) => void;
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

  if (socketContext && socketContext.socket) {
    socketContext.socket.on(
      "student_reaction_incoming",
      (message: IIncomingMessage) => {
        incomingMessageListener(message);
      }
    );
  }

  return (
    <TeacherContext.Provider
      value={{ socket: socketContext.socket, incomingMessageListener }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherProvider;

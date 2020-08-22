import React, { useState, useContext } from "react";
import socket from "socket.io-client";

export interface ISocketConnectionContext {
  socket: SocketIOClient.Socket;
  socketConnectionStatus: boolean;
}

export interface ISocketConnectionProvider {
  children: React.ReactNode;
}

export const SocketConnectionContext = React.createContext<
  Partial<ISocketConnectionContext>
>({});

const SocketConnectionProvider: React.FC<ISocketConnectionProvider> = ({
  children,
}) => {
  const [localServerSocket] = useState(socket("http://localhost:8080"));
  const [onlineStatus, setOnlineStatus] = useState(false);

  localServerSocket.on("connect_error", () => {
    setOnlineStatus(false);
  });

  localServerSocket.on("connect", () => {
    setOnlineStatus(true);
  });

  return (
    <SocketConnectionContext.Provider
      value={{
        socket: localServerSocket,
        socketConnectionStatus: onlineStatus,
      }}
    >
      {children}
    </SocketConnectionContext.Provider>
  );
};

export const useSocketConnectionStatus = () => {
  const context = useContext(SocketConnectionContext);
  if (context && context.socket) {
    return context.socketConnectionStatus;
  } else {
    throw new Error("SocketConnectionProvider was not found");
  }
};

export const useNewClassroom = () => {
  const context = useContext(SocketConnectionContext);
  if (context && context.socket) {
    const createClassRoom = (sock: SocketIOClient.Socket) => () => {
      const classroomID = new Promise<string>((resolve, reject) => {
        sock.emit("create_room");
        sock.once("create_room_success", (id: any) => {
          resolve(id);
        });
      });
      return classroomID;
    };
    return createClassRoom(context.socket);
  } else {
    throw new Error(
      "SocketConnectionProvider was not found or the socket is not connected"
    );
  }
};

export interface IJoinRoom {
  roomID: string;
}

export const useJoinClassRoom = () => {
  const context = useContext(SocketConnectionContext);
  if (context && context.socket) {
    const joinClassRoom = (sock: SocketIOClient.Socket) => ({
      roomID,
    }: IJoinRoom) => {
      const joinStatus = new Promise((resolve, reject) => {
        sock.emit("join_room", roomID);
        sock.once("join_room_success", () => {
          resolve(true);
        });
      });
      return joinStatus;
    };
    return joinClassRoom(context.socket);
  } else {
    throw new Error(
      "SocketConnectionProvider was not found or the socket is not connected"
    );
  }
};

export const useSendStudentReaction = () => {
  const context = useContext(SocketConnectionContext);
  if (context && context.socket) {
    const sendStudentReaction = (sock: SocketIOClient.Socket) => (
      reaction: string,
      room: string
    ) => {
      sock.emit("student_reaction", { reaction, room });
      console.log("Sent");
    };
    return sendStudentReaction(context.socket);
  } else {
    throw new Error("SocketConnectionProvider was not found");
  }
};

export const useRoomCount = () => {
  const context = useContext(SocketConnectionContext);
  if (context && context.socket) {
    const getRoomCount = (sock: SocketIOClient.Socket) => (room: string) => {
      return new Promise<number>((resolve, reject) => {
        sock.emit("get_room_count", room);
        sock.once("room_count", (count: number) => {
          resolve(count);
        });
      });
    };
    return getRoomCount(context.socket);
  } else {
    throw new Error("SocketConnectionProvider was not found");
  }
};

export const useLeaveRoom = () => {
  const context = useContext(SocketConnectionContext);
  if (context && context.socket) {
    const leaveRoom = (sock: SocketIOClient.Socket) => (room: string) => {
      sock.emit("exit_room", room);
    };
    return leaveRoom(context.socket);
  } else {
    throw new Error("SocketConnectionProvider was not found");
  }
};

export default SocketConnectionProvider;

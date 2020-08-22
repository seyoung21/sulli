import React, { useState, useContext } from "react";
import socket from "socket.io-client";

export interface ISocketConnectionContext {
  socket: SocketIOClient.Socket;
  socketConnectionStatus: boolean;
}

export interface ISocketConnectionProvider {
  children: React.ReactNode;
}

const SocketConnectionContext = React.createContext<
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

export default SocketConnectionProvider;

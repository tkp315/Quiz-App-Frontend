import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import PropType from 'prop-types'

// Create the context for socket
const socketContext = createContext(null);

// Hook to use socket in any component
export const useSocket = () => {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

const SocketProvider = ({ children }) => {
  // Use useMemo to initialize the socket connection once
  const [mySocket,setMySocket] = useState(null);
  const socket = useMemo(() => {
    const newSocket = io("http://localhost:8080");

    newSocket.on("connect", () => {
      console.log("Connected with socket id", newSocket.id);
    });
    setMySocket(newSocket)
    console.log(newSocket)
    return newSocket;
  }, []); // The socket instance is memoized and won't reinitialize unnecessarily

  // Disconnect socket when the component unmounts
  useEffect(() => {
    return () => {
      socket.disconnect();
      console.log(`Socket with id ${socket.id} disconnected`);
    };
  }, [socket]); // Cleanup effect watches the memoized socket instance

  return (
    <socketContext.Provider value={mySocket}>
      {children}
    </socketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropType.node.isRequired,
};


export default SocketProvider;

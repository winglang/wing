import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const WebSocketContext = createContext<WebSocket | undefined>(undefined);

export const WebSocketProvider = ({
  webSocket,
  children,
}: {
  webSocket: WebSocket;
  children: ReactNode;
}) => {
  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketState = () => {
  const webSocket = useContext(WebSocketContext);
  if (!webSocket) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }

  const [webSocketState, setWebSocketState] = useState<
    "open" | "closed" | "error"
  >("closed");
  useEffect(() => {
    const onStateChange = () => {
      setWebSocketState(
        webSocket.readyState === WebSocket.OPEN ? "open" : "closed",
      );
    };
    webSocket.addEventListener("close", onStateChange);
    webSocket.addEventListener("open", onStateChange);
    return () => {
      webSocket.removeEventListener("close", onStateChange);
      webSocket.removeEventListener("open", onStateChange);
    };
  }, [webSocket]);

  return { webSocketState };
};

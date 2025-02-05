import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log("Attempting WebSocket connection");

        const ws = new WebSocket("ws://localhost:6790/ws");

        ws.onopen = () => {
            console.log("Connected to WebSocket");
            setSocket(ws);

            const heartbeatInterval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: "heartbeat" }));
                    console.log("💓 Sent heartbeat");
                }
            }, 5000);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error: " + error);
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket");
            clearInterval(heartbeatInterval);
        };

        return () => ws.close();
    }, []);

    console.log("Current socket state: " + socket);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
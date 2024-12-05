import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/useConversation";
import notifiacationSound from "../assets/sound/notification.mp3";

const useListenMesssage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notifiacationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMesssage;

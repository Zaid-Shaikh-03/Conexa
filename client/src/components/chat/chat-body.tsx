import { useChat } from "@/hooks/use-chat";
import { useSocket } from "@/hooks/use-socket";
import type { MessageType } from "@/types/chat.type";
import { useEffect, useRef, useState } from "react";
import ChatBodyMessage from "./chat-body-message";

interface Props {
  chatId: string | null;
  messages: MessageType[];
  onReply: (message: MessageType) => void;
}
const ChatBody = ({ chatId, messages, onReply }: Props) => {
  const { socket } = useSocket();
  const { addNewMessage, addOrUpdateMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [_, setAiChunk] = useState<string>("");

  useEffect(() => {
    if (!chatId) return;
    if (!socket) return;

    const handleNewMessage = (msg: MessageType) => addNewMessage(chatId, msg);

    socket.on("message:new", handleNewMessage);
    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [socket, chatId, addNewMessage]);

  useEffect(() => {
    if (!chatId) return;
    if (!socket) return;

    const handleAIStream = ({
      chatId: streamChatId,
      chunk,
      done,
    }: any) => {
      if (streamChatId !== chatId) return;
      const lastMsg = messages.at(-1);
      if (!lastMsg?._id && lastMsg?.streaming) {
        return;
      }
      if (chunk?.trim() && !done) {
        setAiChunk((prev) => {
          const newContent = prev + chunk;
          addOrUpdateMessage(
            chatId,
            {
              ...lastMsg,
              content: newContent,
            } as MessageType,
            lastMsg?._id,
          );
          return newContent;
        });
        if (done) {
          setAiChunk("");
        }
      }
    };
    socket.on("chat:ai", handleAIStream);
    return () => {
      socket.off("chat:ai", handleAIStream);
    };
  }, [addOrUpdateMessage, chatId, messages, socket]);

  useEffect(() => {
    if (!messages.length) return;
    const lastMsg = messages[messages.length - 1];
    const isStreaming = lastMsg?.streaming;

    bottomRef.current?.scrollIntoView({
      behavior: isStreaming ? "auto" : "smooth",
    });
  }, [messages]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col px-3 py-2">
      {messages.map((message) => (
        <ChatBodyMessage
          key={message._id}
          message={message}
          onReply={onReply}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBody;

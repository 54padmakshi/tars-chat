import { Message } from "@/components/sidebar/types/Message";
import Reactions from "./Reactions";

export default function MessageBubble({
  message,
  isOwn,
}: {
  message: Message;
  isOwn: boolean;
}) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>

      <div className="bg-blue-500 text-white px-4 py-2 rounded-xl max-w-xs">

        <p>{message.text}</p>

        <div className="text-xs opacity-70 mt-1">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>

        <Reactions message={message} />

      </div>

    </div>
  );
}
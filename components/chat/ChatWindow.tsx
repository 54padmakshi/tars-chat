"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { Id } from "@/convex/_generated/dataModel";

export default function ChatWindow({
  conversationId,
}: {
  conversationId: Id<"conversations">;
}) {

  const messages = useQuery(api.messages.getMessages, {
    conversationId,
  });

  if (!messages) return <div>Loading...</div>;

  return (
    <div className="flex flex-col flex-1">

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwn={false}
          />
        ))}
      </div>

      <MessageInput conversationId={conversationId} />

    </div>
  );
}
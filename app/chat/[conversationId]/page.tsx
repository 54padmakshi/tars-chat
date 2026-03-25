import { use } from "react";
import { Id } from "@/convex/_generated/dataModel";
import ChatWindow from "../../../components/chat/ChatWindow";

export default function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: Id<"conversations"> }>;
}) {
  const { conversationId } = use(params);

  return <ChatWindow conversationId={conversationId} />;
}
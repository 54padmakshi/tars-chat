"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar/Sidebar"
import Chat from "@/components/chat/Chat";
import { Id } from "@/convex/_generated/dataModel";

export default function Layout({ children }: { children: React.ReactNode }) {

  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null)

  return (
    <div className="flex h-screen">

      <Sidebar onSelectConversation={setConversationId} />

      <Chat conversationId={conversationId} />

    </div>
  )
}
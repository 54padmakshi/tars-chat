"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar/Sidebar"
import ChatWindow from "@/components/chat/ChatWindow"
import { Id } from "@/convex/_generated/dataModel"

export default function ChatPage() {

  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null)

  return (
    <div className="flex h-screen">

      <Sidebar
        onSelectConversation={setConversationId}
      />

      {conversationId ? (
        <ChatWindow conversationId={conversationId} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a user to start chatting
        </div>
      )}

    </div>
  )
}
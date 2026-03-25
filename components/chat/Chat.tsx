"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useEffect, useRef } from "react"
import MessageInput from "./MessageInput"
import { useUser } from "@clerk/nextjs"

type Props = {
  conversationId: Id<"conversations"> | null
}

export default function Chat({
  conversationId,
}: {
  conversationId: Id<"conversations"> | null
}) {

  const { user } = useUser()

  const currentUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  )

  const messages = useQuery(
    api.messages.getMessages,
    conversationId ? { conversationId } : "skip"
  )

  const resetUnread = useMutation(api.conversations.resetUnread);

  const bottomRef = useRef<HTMLDivElement>(null)

  // ✅ RESET unread when chat opens
  
  useEffect(() => {
    if (conversationId) {
      resetUnread({ conversationId })
    }
  }, [conversationId, resetUnread])

//auto scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a user to start chatting
      </div>
    )
  }

  if (!messages || !currentUser) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="flex flex-col flex-1">

      <div className="flex-1 overflow-y-auto p-4 space-y-2">

        {messages.map((msg) => {

          const isOwn = msg.senderId === currentUser._id

          return (
            <div
              key={msg._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded max-w-xs ${
                  isOwn
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          )
        })}

        <div ref={bottomRef} />
      </div>

      <MessageInput conversationId={conversationId} />

    </div>
  )
}

"use client"

import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"

export default function MessageInput({
  conversationId,
}: {
  conversationId: Id<"conversations">
}) {

  const [text, setText] = useState("")

  const { user } = useUser()

  const currentUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  )

  const sendMessage = useMutation(api.messages.sendMessage)

  const handleSend = async () => {

    if (!text.trim() || !currentUser) return

    await sendMessage({
      conversationId,
      senderId: currentUser._id,
      text,
    })

    setText("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div className="p-4 border-t flex gap-2">

      <input
        className="flex-1 border p-2 rounded"
        placeholder="Type message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>

    </div>
  )
}
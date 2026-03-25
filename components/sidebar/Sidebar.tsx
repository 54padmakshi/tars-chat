"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import UserItem from "./UserItem"
import LogoutButton from "../LogoutButton"

type SidebarProps = {
  onSelectConversation: (id: Id<"conversations">) => void
}

export default function Sidebar({ onSelectConversation }: SidebarProps) {

  const { user } = useUser()

  const users = useQuery(api.users.getUsers)

  const currentUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  )

  const conversations = useQuery(
    api.conversations.getUserConversations,
    currentUser ? { userId: currentUser._id } : "skip"
  )

  const getOrCreateConversation = useMutation(
    api.conversations.getOrCreateConversation
  )

  // loading state
  if (!users || !currentUser || !conversations) {
    return (
      <div className="w-80 border-r p-4">
        Loading users...
      </div>
    )
  }

  const handleUserClick = async (otherUserId: Id<"users">) => {
    const conversationId = await getOrCreateConversation({
      user1: currentUser._id,
      user2: otherUserId,
    })

    onSelectConversation(conversationId)
  }

  return (
    <div className="w-80 border-r h-screen flex flex-col">

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto">
        {users
          .filter((u) => u._id !== currentUser._id)
          .map((u) => {

            const convo = conversations.find((c: Doc<"conversations">) =>
              c.members.includes(u._id)
            )

            return (
              <UserItem
                key={u._id}
                user={u}
                selected={false}
                onClick={() => handleUserClick(u._id)}
                lastMessage={convo?.lastMessage}
                unreadCount={convo?.unreadCount}
              />
            )
          })}
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <LogoutButton />
      </div>

    </div>
  )
}
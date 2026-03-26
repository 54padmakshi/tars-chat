"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export default function SearchUsers({
  onSelectConversation,
}: {
  onSelectConversation: (id: Id<"conversations">) => void;
}) {
  const { user } = useUser();

  const users = useQuery(api.users.getUsers);

  // ✅ get current convex user
  const currentUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip"
  );

  const getOrCreateConversation = useMutation(
    api.conversations.getOrCreateConversation
  );

  const [search, setSearch] = useState("");

  if (!users || !currentUser) {
    return <div className="p-4">Loading...</div>;
  }

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = async (otherUserId: Id<"users">) => {
    const conversationId = await getOrCreateConversation({
      user1: currentUser._id,
      user2: otherUserId,
    });

    onSelectConversation(conversationId);
  };

  return (
    <div className="p-4">

      <input
        className="w-full border p-2 mb-4 rounded"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-2">
        {filteredUsers.map((u) => (
          <div
            key={u._id}
            onClick={() => handleClick(u._id)}
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
          >
            {u.name}
          </div>
        ))}
      </div>

    </div>
  );
}
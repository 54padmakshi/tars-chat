"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function SearchUsers() {

  const { user } = useUser();
  const router = useRouter();

  const users = useQuery(api.users.getUsers);

  const createConversation =
    useMutation(api.conversations.createConversation);

  const [search, setSearch] = useState("");

  if (!users || !user) return null;

  const filtered = users.filter((u) =>
    u.clerkId !== user.id &&
    (u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()))
  );

  const startChat = async (otherId: string) => {

    const id = await createConversation({
      user1: user.id,
      user2: otherId,
    });

    router.push(`/chat/${id}`);
  };

  return (
    <div className="p-3 border-b">

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />

      {search && (
        <div className="mt-2 bg-white shadow rounded">

          {filtered.length === 0 && (
            <div className="p-2 text-sm text-gray-400">
              No users found
            </div>
          )}

          {filtered.map((u) => (
            <button
              key={u._id}
              onClick={() => startChat(u.clerkId)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <img
                src={u.image || "/avatar.png"}
                className="w-8 h-8 rounded-full"
              />

              <div>
                <div className="text-sm font-medium">
                  {u.name || u.email}
                </div>
              </div>
            </button>
          ))}

        </div>
      )}
    </div>
  );
}
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  users: defineTable({
    clerkId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    isOnline: v.boolean(),
    lastSeen: v.number(),
  }).index("by_clerkId", ["clerkId"]),


  conversations: defineTable({
    members: v.array(v.id("users")),
    isGroup: v.boolean(),
    name: v.optional(v.string()),
    lastMessage: v.optional(v.string()),
    updatedAt: v.number(),
     unreadCount: v.optional(v.number()),
  })
  .index("by_member", ["members"]),


  messages: defineTable({
    conversationId: v.id("conversations"),
    senderId: v.id("users"),
    text: v.string(),
    createdAt: v.number(),
   

    reactions: v.optional(
      v.array(
        v.object({
          userId: v.id("users"),
          emoji: v.string(),
        })
      )
    ),
  })
  .index("by_conversation", ["conversationId"]),


  typing: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    isTyping: v.boolean(),
  })
  .index("by_conversation", ["conversationId"]),

});
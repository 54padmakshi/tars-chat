import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// GET ALL CONVERSATIONS OF CURRENT USER
export const getUserConversations = query({
  args: {
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    const conversations = await ctx.db.query("conversations").collect();

    return conversations.filter((c) =>
      c.members.includes(args.userId)
    );
  },
});


// FIND OR CREATE CONVERSATION
export const getOrCreateConversation = mutation({
  args: {
    user1: v.id("users"),
    user2: v.id("users"),
  },

  handler: async (ctx, args) => {

    const conversations = await ctx.db.query("conversations").collect();

    // ✅ correct way to find conversation
    const existing = conversations.find(
      (c) =>
        c.members.includes(args.user1) &&
        c.members.includes(args.user2)
    );

    if (existing) return existing._id;

    // create new
    const id = await ctx.db.insert("conversations", {
      members: [args.user1, args.user2],
      isGroup: false,
      updatedAt: Date.now(),
    });

    return id;
  },
});

//reset unread count
export const resetUnread= mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      unreadCount: 0,
    });
  },
});

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// SEND MESSAGE
export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    senderId: v.id("users"),
    text: v.string(),
  },

  handler: async (ctx, args) => {

    // 1️⃣ insert message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      senderId: args.senderId,
      text: args.text,
      createdAt: Date.now(),
      reactions: [],
    });

    // 2️⃣ get conversation
    const convo = await ctx.db.get(args.conversationId);

    if (!convo) return messageId;

    // 3️⃣ update conversation
    await ctx.db.patch(args.conversationId, {
      lastMessage: args.text,
      updatedAt: Date.now(),
      unreadCount: (convo.unreadCount || 0) + 1,
    });

    return messageId;
  },
}); 


// GET MESSAGES OF A CONVERSATION
export const getMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) =>
        q.eq(q.field("conversationId"), args.conversationId)
      )
      .collect();
  },
});


// DELETE MESSAGE
export const deleteMessage = mutation({
  args: {
    messageId: v.id("messages"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.messageId);
  },
});


// ADD REACTION
export const addReaction = mutation({
  args: {
    messageId: v.id("messages"),
    userId: v.id("users"),
    emoji: v.string(),
  },

  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);

    if (!message) return;

    const reactions = message.reactions ?? [];

    reactions.push({
      userId: args.userId,
      emoji: args.emoji,
    });

    await ctx.db.patch(args.messageId, {
      reactions,
    });
  },
});
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const setTyping = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    isTyping: v.boolean(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("typing", args);
  },
});

export const getTyping = query({
  args: {
    conversationId: v.id("conversations"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("typing")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .collect();
  },
});
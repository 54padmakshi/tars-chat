import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updatePresence = mutation({
  args: {
    userId: v.id("users"),
    isOnline: v.boolean(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      isOnline: args.isOnline,
      lastSeen: Date.now(),
    });
  },
});
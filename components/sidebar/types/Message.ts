import { Id } from "@/convex/_generated/dataModel";

export type Message = {
  _id: Id<"messages">;
  conversationId: Id<"conversations">;
  senderId: Id<"users">;
  text: string;
  createdAt: number;
  reactions?: {
    userId: Id<"users">;
    emoji: string;
  }[];
};
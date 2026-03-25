import { NextResponse } from "next/server";
import { getOrCreateConversation } from "@/lib/conversations";

export async function POST(req: Request) {
  const body = await req.json();
  const { currentUserId, otherUserId } = body;

  if (!currentUserId || !otherUserId) {
    return NextResponse.json({ error: "Missing users" }, { status: 400 });
  }

  const conversation = getOrCreateConversation(
    currentUserId,
    otherUserId
  );

  return NextResponse.json(conversation);
}
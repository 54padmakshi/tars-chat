import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function ChatPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <div className="h-screen">Chat loading...</div>
}
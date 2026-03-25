import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Message } from "@/components/sidebar/types/Message"

export default function Reactions({ message }: { message: Message }) {

  const react = useMutation(api.messages.addReaction)

const emojis = ["👍", "❤️", "😂", "😮", "😢"];

  return (
    <div className="flex gap-1 mt-1">

      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() =>
            react({
              messageId: message._id,
              emoji,
              userId: message.senderId
            })
          }
        >
          {emoji}
        </button>
      ))}

    </div>
  )
}
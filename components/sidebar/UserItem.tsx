import { User } from "@/components/sidebar/types/User"

export default function UserItem({
  user,
  selected,
  onClick,
  lastMessage,
  unreadCount,
}: {
  user: User
  selected: boolean
  onClick: () => void
   lastMessage?: string
  unreadCount?: number
}) {

  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer flex items-center gap-3 ${
        selected ? "bg-gray-200" : ""
      }`}
    >

      <div className="relative">
        <img
          src={user.image || "/avatar.png"}
          className="w-10 h-10 rounded-full"
        />

        {user.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"/>
        )}
      </div>

      <div>
        <div className="font-medium">{user.name}</div>
      </div>

       <div className="text-sm text-gray-500 truncate">
          {lastMessage || "Start chatting"}
        </div>
      

      {unreadCount && unreadCount > 0 && (
        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {unreadCount}
        </div>
      )}

    </div>
  )
}
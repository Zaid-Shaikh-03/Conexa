import { formatChatTime, getOtherUserAndGroup } from "@/lib/helper";
import { cn } from "@/lib/utils";
import type { ChatType } from "@/types/chat.type";
import { useLocation } from "react-router-dom";
import AvatarWithBadge from "../avatar-with-badge";

interface PropsType {
  chat: ChatType;
  currentUserId: string | null;
  onClick?: () => void;
}
const ChatListItem = ({ chat, currentUserId, onClick }: PropsType) => {
  const { pathname } = useLocation();

  const { lastMessage, createdAt } = chat;

  const { name, avatar, isOnline, isGroup } = getOtherUserAndGroup(
    chat,
    currentUserId,
  );

  const getLastMessageText = () => {
    if (!lastMessage) {
      return isGroup
        ? chat.creaetdBy === currentUserId
          ? "Group created"
          : "You were added"
        : "Send a message";
    }

    if (lastMessage.image) return "Photo";

    const messageText = lastMessage.content?.trim();
    // console.log(lastMessage.content, "lastm");

    if (isGroup && lastMessage.sender) {
      const senderName =
        lastMessage.sender._id === currentUserId
          ? "You"
          : lastMessage.sender.name || "Unknown";

      return messageText
        ? `${senderName}: ${messageText}`
        : `${senderName}: sent a message`;
    }

    return messageText || "New message";
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        `w-full flex items-center gap-2 p-2 roudned-sm hover:bg-sidebar-accent transition-colors text-left`,
        pathname.includes(chat._id) && "bg-siderbar-accent!",
      )}
    >
      <AvatarWithBadge
        name={name}
        src={avatar}
        isGroup={isGroup}
        isOnline={isOnline}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h5 className="text-sm font-semibold truncate">{name}</h5>
          <span className="text-xs ml-2 shrink-0 text-muted-foreground">
            {formatChatTime(lastMessage?.updatedAt || createdAt)}
          </span>
        </div>
        <p className="text-xs truncate text-muted-foreground -mt-px">
          {getLastMessageText()}
        </p>
      </div>
    </button>
  );
};

export default ChatListItem;

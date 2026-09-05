import type { UserType } from "./auth.type";

export type ChatType = {
  _id: string;
  lastMessage: MessageType | null;
  participants: UserType[];
  isGroup: boolean;
  isAiChat: boolean;
  creaetdBy: string;
  groupName?: string;
  createdAt: string;
  updatedAt: string;
};

export type MessageType = {
  _id: string;
  content: string | null;
  image: string | null;
  sender: UserType | null;
  replyTo: MessageType | null;
  createdAt: string;
  updatedAt: string;
  //
  status?: string;
  streaming?: boolean;
};

export type CreateChatType = {
  participantId?: string;
  isGroup?: boolean;
  participants?: string[];
  groupName?: string;
};

export type CreateMessageType = {
  chatId: string | null;
  content?: string;
  image?: string;
  replyTo?: MessageType | null;
};

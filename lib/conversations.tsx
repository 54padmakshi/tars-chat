type Conversation = {
  id: string;
  user1: string;
  user2: string;
  messages: {
    id: string;
    senderId: string;
    text: string;
  }[];
};

const conversations: Conversation[] = [];

export function getOrCreateConversation(
  user1: string,
  user2: string
): Conversation {
  let convo = conversations.find(
    (c) =>
      (c.user1 === user1 && c.user2 === user2) ||
      (c.user1 === user2 && c.user2 === user1)
  );

  if (!convo) {
    convo = {
      id: `convo_${Date.now()}`,
      user1,
      user2,
      messages: [],
    };
    conversations.push(convo);
  }

  return convo;
}

export function getConversationById(id: string) {
  return conversations.find((c) => c.id === id);
}
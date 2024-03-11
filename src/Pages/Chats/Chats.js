import {
  Flex,
  Heading,
  View,
  Text,
  TextField,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { AddCircle, Send, Delete } from "@mui/icons-material";
import "./Chats.css";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatsState,
  currentUserState,
  modalState,
  selectedChatState,
} from "../../Functions/GlobalState";
import {
  CreateChatMessage,
  GetChatsByProfileId,
  GetChatMessages,
} from "../../Functions/Server";
import CreateChatModal from "../../Modals/ChatModals/CreateChatModal";
import { intlFormatDistance } from "date-fns";
import { onCreateChatMessage } from "../../graphql/subscriptions";
import { generateClient } from "aws-amplify/api";

export default function Chats() {
  const [chats, setChats] = useRecoilState(chatsState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const setModal = useSetRecoilState(modalState);
  const currentUser = useRecoilValue(currentUserState);
  const { user } = useAuthenticator();

  const [message, setMessage] = useState("");
  const client = generateClient();

  useEffect(() => {
    async function GetChats() {
      const chats = await GetChatsByProfileId(user.userId);
      setChats(chats);
    }
    GetChats();
  }, []);

  useEffect(() => {
    async function getChatMessages() {
      if (selectedChat?.id) {
        const sub = client
          .graphql({
            query: onCreateChatMessage,
          })
          .subscribe({
            next: ({ data }) => {
              if (data.onCreateChatMessage.chatID === selectedChat.id) {
                setSelectedChat({
                  ...selectedChat,
                  messages: [
                    data.onCreateChatMessage,
                    ...selectedChat.messages,
                  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
                });
                let updatedChats = [...chats].map((chat) => {
                  if (chat.id === data.onCreateChatMessage.chatID)
                    return {
                      ...chat,
                      messages: [
                        data.onCreateChatMessage,
                        ...selectedChat.messages,
                      ].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
                    };
                  else return chat;
                });

                setChats(updatedChats);
              }
            },
            error: (error) => console.log(error),
          });
        return () => {
          sub.unsubscribe();
        };
      }
    }
    getChatMessages();
  }, [selectedChat]);

  async function sendMessage() {
    await CreateChatMessage(selectedChat.id, currentUser.id, message);
    setMessage("");
  }

  function getChatNameFromUsers(chat) {
    let names = chat.users
      .map((user) => {
        if (user.id !== currentUser.id) {
          return user.name;
        }
        return "";
      })
      .toString();
    if (names.charAt(names.length - 1) === ",")
      names = names.slice(0, names.length - 1);
    return names.replace(",", ", ");
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <Flex height="100%" gap="0">
      <Flex className="chat-container-1" direction="column">
        <Text as="div" className="chat-title">
          <Heading level={3}>Chats</Heading>
          <AddCircle
            className="icon"
            fontSize="large"
            onClick={() => openModal(<CreateChatModal />, "Create Chat")}
          />
        </Text>
        <View className="chat-list">
          {chats.map((chat) => {
            return (
              <Flex
                key={chat.id}
                className={`chat-tile ${
                  chat.id === selectedChat?.id ? "active" : ""
                }`}
                onClick={async () => {
                  let chatMessages = await GetChatMessages(chat.id);
                  setSelectedChat({
                    ...chat,
                    messages: chatMessages.sort((a, b) =>
                      b.createdAt.localeCompare(a.createdAt)
                    ),
                  });
                }}
              >
                <Heading className="text-overflow" level={4}>
                  {chat.name ?? getChatNameFromUsers(chat)}
                </Heading>
                <Delete className="icon delete" />
              </Flex>
            );
          })}
        </View>
      </Flex>
      {selectedChat?.id !== null ? (
        <Flex className="chat-container-2" direction="column">
          <View className="chat-current">
            <Text as="div">
              <Heading level={3} className="text-overflow">
                {selectedChat.name ?? getChatNameFromUsers(selectedChat)}
              </Heading>
            </Text>
          </View>
          {selectedChat.messages.length > 0 ? (
            <View className="chat-log">
              {selectedChat?.messages.map((message) => {
                return (
                  <Flex
                    gap="2px"
                    key={message.id}
                    className={`chat-bubble ${
                      message.senderUserID === currentUser.id
                        ? "sender"
                        : "reciever"
                    }`}
                  >
                    <Text fontSize="x-small" opacity="75%">
                      {intlFormatDistance(
                        new Date(message.createdAt),
                        new Date()
                      )}
                    </Text>
                    <Text>{message.message}</Text>{" "}
                  </Flex>
                );
              })}
            </View>
          ) : (
            <Flex
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="x-large" opacity="75%">
                No Messages
              </Text>
            </Flex>
          )}
          <Flex className="chat-message">
            <TextField
              width="100%"
              labelHidden
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={async (e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Send
              className="icon"
              fontSize="large"
              onClick={() => sendMessage()}
            />
          </Flex>
        </Flex>
      ) : (
        <Flex width="75%" justifyContent="center" alignItems="center">
          <Text fontSize="x-large" opacity="75%">
            No chat selected
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

import {
  Flex,
  Heading,
  View,
  Text,
  TextField,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { AddCircle, Send } from "@mui/icons-material";
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
import { CircularProgress, Tooltip } from "@mui/material";
import { AccountType } from "../../Functions/Enums";
import { createMessageReceivedNotification } from "../../Functions/NotificationMethods";

// This page implements the chats page, This page allows users to view chats, create new chats and send real-time messages in existing chats

export default function Chats() {
  const [chats, setChats] = useRecoilState(chatsState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const setModal = useSetRecoilState(modalState);
  const currentUser = useRecoilValue(currentUserState);
  const { user } = useAuthenticator();
  const [message, setMessage] = useState("");
  const client = generateClient();
  const [isLoading, setIsLoading] = useState(true);
  const accountTypes = new AccountType();

  useEffect(() => {
    async function GetChats() {
      setChats(await GetChatsByProfileId(user.userId));
      setIsLoading(false);
    }
    GetChats();
  }, []);

  useEffect(() => {
    async function getChatMessages() {
      if (selectedChat?.id) {
        setIsLoading(true);
        const sub = client
          .graphql({
            query: onCreateChatMessage,
          })
          .subscribe({
            next: ({ data }) => {
              if (data.onCreateChatMessage.chatID === selectedChat.id) {
                let newMessage = [data.onCreateChatMessage];
                let updatedMessages = [...selectedChat.messages, ...newMessage];
                updatedMessages = updatedMessages.sort((a, b) =>
                  b.createdAt.localeCompare(a.createdAt)
                );
                let updatedSelectedChat = {
                  ...selectedChat,
                  messages: updatedMessages,
                };
                setSelectedChat(updatedSelectedChat);
              }
            },
            error: (error) => console.log(error),
          });
        setIsLoading(false);
        return () => {
          sub.unsubscribe();
        };
      }
    }
    getChatMessages();
  }, [selectedChat]);

  async function sendMessage() {
    await CreateChatMessage(selectedChat.id, currentUser.id, message).then(
      async () =>
        createMessageReceivedNotification(
          selectedChat.userIDs.filter((id) => id !== currentUser.id),
          selectedChat.name,
          currentUser.name
        )
    );
    setMessage("");
  }

  function getChatNameFromUsers(chat) {
    let names = chat.users
      .map((user) => {
        if (user.profileId !== currentUser.id) return user.profile.name;
        return "";
      })
      .toString();
    if (names.charAt(names.length - 1) === ",")
      names = names.slice(0, names.length - 1);
    return names.replace(",", ", ");
  }

  function getChatAddTooltipMessage() {
    if (currentUser.accountType === accountTypes.NONE)
      return "Please create a profile to access this feature";
    return "Create Chat";
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <Flex className="chats">
      <Flex className="chat-container-1" direction="column">
        <Text as="div" className="chat-title">
          <Heading level={3} color="#f7f5ef">
            Chats
          </Heading>
          <Tooltip title={getChatAddTooltipMessage()} arrow>
            {currentUser.accountType === accountTypes.NONE ? (
              <AddCircle className="chat-icon add disabled" fontSize="large" />
            ) : (
              <AddCircle
                className="chat-icon add"
                fontSize="large"
                onClick={() => openModal(<CreateChatModal />, "Create Chat")}
              />
            )}
          </Tooltip>
        </Text>
        {chats.length === 0 || isLoading ? (
          <>
            {isLoading ? (
              <Flex height="100%" justifyContent="center" alignItems="center">
                <Text fontSize="large" opacity="50%">
                  Loading
                </Text>
                <CircularProgress />
              </Flex>
            ) : (
              <Flex height="100%" justifyContent="center" alignItems="center">
                <Text fontSize="large" opacity="75%">
                  No Chats
                </Text>
              </Flex>
            )}
          </>
        ) : (
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
                </Flex>
              );
            })}
          </View>
        )}
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
                    <Text
                      className="message-text"
                      fontSize="x-small"
                      opacity="75%"
                    >
                      {intlFormatDistance(
                        new Date(message.createdAt),
                        new Date()
                      )}
                    </Text>
                    <Text className="message-text">{message.message}</Text>
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
              className="chat-icon"
              fontSize="large"
              onClick={() => sendMessage()}
            />
          </Flex>
        </Flex>
      ) : (
        <>
          {isLoading ? (
            <Flex width="75%" justifyContent="center" alignItems="center">
              <Text fontSize="x-large" opacity="50%">
                Loading
              </Text>
              <CircularProgress />
            </Flex>
          ) : (
            <Flex width="75%" justifyContent="center" alignItems="center">
              <Text fontSize="x-large" opacity="75%">
                No Chat Selected
              </Text>
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
}

import {
  Flex,
  Heading,
  View,
  Text,
  TextField,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Chats.css";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatsState,
  currentUserState,
  modalState,
  selectedChatState,
} from "../../Functions/GlobalState";
import { CreateChatMessage, GetChatsByProfileId } from "../../Functions/Server";
import CreateChatModal from "../../Modals/ChatModals/CreateChatModal";
import { intlFormatDistance } from "date-fns";
import { onCreateChatMessage } from "../../graphql/subscriptions";
import { generateClient } from "aws-amplify/api";
import { CONNECTION_STATE_CHANGE } from "aws-amplify/api";
import { Hub } from "aws-amplify/utils";

export default function Chats() {
  const [chats, setChats] = useRecoilState(chatsState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const setModal = useSetRecoilState(modalState);
  const currentUser = useRecoilValue(currentUserState);
  const { user } = useAuthenticator();
  const isFirstRender = useRef(true);

  const [message, setMessage] = useState(null);
  const client = generateClient();

  useEffect(() => {
    async function GetChats() {
      setChats(await GetChatsByProfileId(user.userId));
    }
    GetChats();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      const sub = client
        .graphql({
          query: onCreateChatMessage,
          variables: { filter: { chatID: { eq: selectedChat?.chatID } } },
        })
        .subscribe({
          next: ({ provider, value }) =>
            setSelectedChat({
              ...selectedChat,
              messages: [
                ...selectedChat.messages,
                value.data.onCreateChatMessage,
              ],
            }),
          error: (err) => console.log(err),
        });
      return () => sub.unsubscribe();
    }
  }, [selectedChat.id]);

  Hub.listen("api", (data) => {
    const { payload } = data;
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState;
      console.log(connectionState);
    }
  });

  async function sendMessage() {
    let messages = [
      ...selectedChat.messages,
      await CreateChatMessage(selectedChat.id, currentUser.id, message),
    ];
    setSelectedChat({
      ...selectedChat,
      messages: messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    });
  }

  async function toggleSelectedChat(chat) {
    let messages = [...chat.messages];
    setSelectedChat({
      ...chat,
      messages: messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    });
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <Flex height="100%" gap="0">
      <Flex className="chat-container-1" direction="column">
        <Text as="div" className="chat-title">
          <Heading level={3}>Chats</Heading>
          <AddCircleIcon
            className="icon"
            fontSize="large"
            onClick={() => openModal(<CreateChatModal />, "Create Chat")}
          />
        </Text>
        <View className="chat-list">
          {chats
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map((chat) => {
              return (
                <Flex
                  key={chat.id}
                  className={`chat-tile ${
                    chat.id === selectedChat?.id ? "active" : ""
                  }`}
                  onClick={() => toggleSelectedChat(chat)}
                >
                  <Heading className="text-overflow" level={4}>
                    {chat.name ??
                      chat.users.map((user, index) => {
                        if (user.id !== currentUser.id) {
                          if (index !== 0) return ", " + user.name;
                          else return user.name;
                        }
                        return "";
                      })}
                  </Heading>
                  <DeleteIcon className="icon delete" />
                </Flex>
              );
            })}
        </View>
      </Flex>
      {selectedChat !== null ? (
        <Flex className="chat-container-2" direction="column">
          <View className="chat-current">
            <Text as="div">
              <Heading level={3}>
                {selectedChat?.name ??
                  selectedChat.users.map((user, index) => {
                    if (user.id !== currentUser.id) {
                      if (index !== 0) return ", " + user.name;
                      else return user.name;
                    }
                    return "";
                  })}
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
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={async (e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <SendIcon
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

import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { ChatCreateForm } from "../../ui-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatsState,
  currentUserState,
  modalState,
} from "../../Functions/GlobalState";

export default function CreateChatModal() {
  const [chats, setChats] = useRecoilState(chatsState);
  const currentUser = useRecoilValue(currentUserState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Chat Information
      </Heading>
      <Divider marginBottom="20px" />
      <ChatCreateForm
        padding="0"
        onSubmit={(fields) => {
          fields.users.push(currentUser);
          fields.userIDs = fields.users.map((user) => {
            return user.id;
          });
          return fields;
        }}
        onSuccess={(data) => {
          setChats({
            ...chats,
            users: data.users.items,
            messages: data.messages.items,
          });
          setModal({ component: null, title: null, isShown: false });
        }}
      />
    </View>
  );
}

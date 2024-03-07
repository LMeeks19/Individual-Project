import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { ChatCreateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { chatsState, modalState } from "../../Functions/GlobalState";

export default function CreateChatModal() {
  const [chats, setChats] = useRecoilState(chatsState);
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
          fields.userIDs = fields.users.map((user) => {
            return user.id;
          });
          return fields
        }}
        onSuccess={(data) => {
          setModal({ component: null, title: null, isShown: false });
        }}
      />
    </View>
  );
}

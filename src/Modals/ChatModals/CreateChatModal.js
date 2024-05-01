import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { ChatCreateForm } from "../../ui-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatsState,
  currentUserState,
  modalState,
} from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { GetChatsByProfileId } from "../../Functions/Server";

// This component is used in the modal to create a chat with another user

export default function CreateChatModal() {
  const setChats = useSetRecoilState(chatsState);
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
          let updatedFields = fields;
          updatedFields.users.push(currentUser);
          updatedFields.userIDs = updatedFields.users.map((user) => {
            return user.id;
          });
          return updatedFields;
        }}
        onSuccess={async (data) => {
          setChats(await GetChatsByProfileId(currentUser.id));
          new SnackbarAlert().success("Chat successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

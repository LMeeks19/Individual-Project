import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { PlayerPostCreateForm } from "../../ui-components";
import { Divider, Heading, View } from "@aws-amplify/ui-react";
import {
  currentUserState,
  modalState,
  playerPostsState,
} from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";

export default function CreatePlayerPostModal() {
  const currentUser = useRecoilValue(currentUserState);
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Player Post Information
      </Heading>
      <Divider marginBottom="20px" />
      <PlayerPostCreateForm
        padding="0"
        onSubmit={(fields) => {
          const updatedFields = fields;
          updatedFields.createdByProfileID = currentUser.id;
          updatedFields.isActive = true;
          return updatedFields;
        }}
        onSuccess={(data) => {
          data.interestedUsers = [];
          setPlayerPosts([...playerPosts, data]);
          new SnackbarAlert().success("Player Post successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(error) => {
          new SnackbarAlert().error(
            "Unable to create Player Post, please try again"
          );
        }}
      />
    </View>
  );
}

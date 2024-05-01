import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { PlayerPostCreateForm } from "../../ui-components";
import { Divider, Heading, View } from "@aws-amplify/ui-react";
import {
  currentUserState,
  modalState,
  playerPostsState,
} from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { GetUsersPlayerPosts } from "../../Functions/Server";

// This component is used in the modal to create a player post

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
          updatedFields.createdByName = currentUser.name;
          updatedFields.createdByProfileID = currentUser.id;
          updatedFields.isActive = true;
          return updatedFields;
        }}
        onSuccess={async (data) => {
          const userPlayerPosts = await GetUsersPlayerPosts(currentUser.id);
          const nonUserPlayerPosts = playerPosts.filter(
            (post) => post.createdByProfileID !== currentUser.id
          );
          let updatedPlayerPosts = nonUserPlayerPosts.concat(userPlayerPosts);
          setPlayerPosts(updatedPlayerPosts);
          new SnackbarAlert().success("Player Post successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

import { Heading, View, Divider } from "@aws-amplify/ui-react";
import { PlayerPostUpdateForm } from "../../ui-components";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  modalState,
  playerPostsState,
} from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { createPlayerPostUpdatedNotification } from "../../Functions/NotificationMethods";

// This component is used in the modal to update a player post

export default function UpdatePlayerPostModal(props) {
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);
  const setModal = useSetRecoilState(modalState);
  const currentUser = useRecoilValue(currentUserState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Match Post Information
      </Heading>
      <Divider marginBottom="20px" />
      <PlayerPostUpdateForm
        padding="0"
        playerPost={props.playerPost}
        onSuccess={(data) => {
          let curPosts = playerPosts.filter((post) => post.id === data.id);
          data.interestedUsers = data.interestedUsers.items;
          data.registeredPlayers = data.registeredPlayers.items;
          curPosts.push(data);
          setPlayerPosts(curPosts);
          new SnackbarAlert().success("Player Post successfully updated");
          let interestedUsersIds = props.playerPost.interestedUsers
            .filter((iu) => iu.profileId !== currentUser.id)
            .map((iu) => {
              return iu.profileId;
            });
          createPlayerPostUpdatedNotification(
            interestedUsersIds,
            props.playerPost.title
          );
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

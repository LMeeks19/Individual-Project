import { Heading, View, Divider } from "@aws-amplify/ui-react";
import { RegisterPlayerPostPlayerForm } from "../../ui-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserState,
  modalState,
  playerPostsState,
} from "../../Functions/GlobalState";
import { GetPlayerPosts } from "../../Functions/Server";
import SnackbarAlert from "../../Components/Snackbar";

// This component is used in the modal to register or unregister a player on a player post

export default function RegisterPlayerModal(props) {
  const currentUser = useRecoilValue(currentUserState);
  const setPlayerPosts = useSetRecoilState(playerPostsState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Register Player
      </Heading>
      <Divider marginBottom="20px" />
      <RegisterPlayerPostPlayerForm
        padding="0"
        playerPost={{
          id: props.playerPost.id,
        }}
        onSubmit={(fields) => {
          if (fields.interestedUsers.some((iu) => iu.id === currentUser.id)) {
            fields.interestedUsers = [...props.playerPost.interestedUsers].map(
              (iu) => {
                return iu.profile;
              }
            );
          } else {
            fields.interestedUsers = [...props.playerPost.interestedUsers]
              .map((iu) => {
                if (iu.profileId !== currentUser.id) return iu.profile;
                return null;
              })
              .filter((iu) => iu !== null);
          }
          if (
            fields.registeredPlayers.some(
              (rp) => rp.profileID === currentUser.id
            )
          ) {
            fields.registeredPlayers = [
              ...props.playerPost.registeredPlayers,
            ].map((rp) => {
              return rp.player;
            });
          } else {
            fields.registeredPlayers = [...props.playerPost.registeredPlayers]
              .map((rp) => {
                if (rp.player.profileID !== currentUser.id) return rp.player;
                return null;
              })
              .filter((rp) => rp !== null);
          }
          return fields;
        }}
        onSuccess={async () => {
          setPlayerPosts(await GetPlayerPosts());
          new SnackbarAlert().success("Interest successfully updated");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

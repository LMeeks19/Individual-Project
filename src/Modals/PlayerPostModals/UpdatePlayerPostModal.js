import { Heading, View, Divider } from "@aws-amplify/ui-react";
import { PlayerPostUpdateForm } from "../../ui-components";
import { useSetRecoilState, useRecoilState } from "recoil";
import { modalState, playerPostsState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";

export default function UpdatePlayerPostModal(props) {
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Match Post Information
      </Heading>
      <Divider marginBottom="20px" />
      <PlayerPostUpdateForm
        padding="0"
        playerPost={{
          id: props.id,
          title: props.title,
          description: props.description,
          createdByName: props.createdByName,
          createdByProfileID: props.createdByProfileID,
          ageGroup: props.ageGroup,
          positionsNeeded: props.positionsNeeded,
          numOfPlayersNeeded: props.numOfPlayersNeeded,
          skillLevel: props.skillLevel,
          kickOff: props.kickOff,
          street: props.street,
          townCity: props.townCity,
          county: props.county,
          postcode: props.postcode,
          isActive: props.isActive,
          interestedUsers: props.interestedUsers,
          registeredPlayers: props.registeredPlayers,
          selectedPlayers: props.selectedPlayers,
        }}
        onSuccess={(data) => {
          let curPosts = playerPosts.filter((post) => post.id === data.id);
          data.interestedUsers = data.interestedUsers.items;
          data.registeredPlayers = data.registeredPlayers.items;
          curPosts.push(data);
          setPlayerPosts(curPosts);
          new SnackbarAlert().success("Player Post successfully updated");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={() => {
          new SnackbarAlert().error(
            "Unable to update Player Post, please try again"
          );
        }}
      />
    </View>
  );
}

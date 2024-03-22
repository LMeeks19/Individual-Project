import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { PlayerUpdateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";

export default function UpdatePlayerModal(props) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);
  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Player Information
      </Heading>
      <Divider marginBottom="20px" />
      <PlayerUpdateForm
        padding="0"
        player={props.player}
        onSuccess={(data) => {
          data.isShown = false;
          let updatedPlayers = currentUser.players.filter(
            (player) => player.id !== props.player.id
          );
          updatedPlayers.push(data);
          setCurrentUser({ ...currentUser, players: updatedPlayers });
          new SnackbarAlert().success("Player successfully updated");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={() => {
          new SnackbarAlert().error(
            "Unable to update Player, please try again"
          );
        }}
      />
    </View>
  );
}

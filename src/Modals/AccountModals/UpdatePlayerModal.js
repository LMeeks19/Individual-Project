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
        onSubmit={(fields) => {
          const updatedFields = fields;
          updatedFields.id = props.player.id;
          updatedFields.profileID = props.player.profileID;
          return updatedFields;
        }}
        onSuccess={(data) => {
          let updatedPlayers = [...currentUser.players].map((player) => {
            if (player.id === data.id) {
              return { ...data, isShown: props.player.isShown };
            } else {
              return player;
            }
          });
          setCurrentUser({ ...currentUser, players: updatedPlayers });
          new SnackbarAlert().success("Player successfully updated");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

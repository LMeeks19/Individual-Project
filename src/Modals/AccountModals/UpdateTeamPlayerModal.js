import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { TeamPlayerUpdateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";

export default function UpdateTeamPlayerModal(props) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);
  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Player Information
      </Heading>
      <Divider marginBottom="20px" />
      <TeamPlayerUpdateForm
        padding="0"
        teamPlayer={{
          name: props.teamPlayer.name,
          age: props.teamPlayer.age,
          kitNumber: props.teamPlayer.kitNumber,
          positions: props.teamPlayer.positions,
        }}
        onSubmit={(fields) => {
          fields.id = props.teamPlayer.id;
          fields.teamID = currentUser.team.id;
          return fields;
        }}
        onSuccess={(data) => {
          let updatedPlayers = currentUser.team.players.filter(
            (player) => player.id !== data.id
          );
          updatedPlayers.push(data);
          setCurrentUser({
            ...currentUser,
            team: {
              ...currentUser.team,
              players: updatedPlayers,
            },
          });
          new SnackbarAlert().success("Team Player successfully updated");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(error) => {
          new SnackbarAlert().error(
            "Unable to update Team Player, please try again"
          );
        }}
      />
    </View>
  );
}

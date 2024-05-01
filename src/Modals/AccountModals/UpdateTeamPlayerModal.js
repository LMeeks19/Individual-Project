import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { TeamPlayerUpdateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";

// This component is used in the modal to update a team player

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
        teamPlayer={props.teamPlayer}
        onSubmit={(fields) => {
          const updatedFields = fields;
          updatedFields.id = props.teamPlayer.id;
          updatedFields.teamID = props.teamPlayer.teamID;
          return updatedFields;
        }}
        onSuccess={(data) => {
          let updatedPlayers = [...currentUser.team.players].map((player) => {
            if (player.id === data.id) {
              return data;
            } else {
              return player;
            }
          });
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
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

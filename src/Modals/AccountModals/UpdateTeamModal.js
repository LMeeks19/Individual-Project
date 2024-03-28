import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { TeamUpdateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";

export default function UpdateTeamModal() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Team Information
      </Heading>
      <Divider marginBottom="20px" />
      <TeamUpdateForm
        padding="0"
        team={currentUser.team}
        onSubmit={(fields) => {
          const updatedFields = fields;
          updatedFields.id = currentUser.team.id;
          updatedFields.profileID = currentUser.team.profileID;
          return updatedFields;
        }}
        onSuccess={(data) => {
          setCurrentUser({
            ...currentUser,
            team: { ...data, players: currentUser.team.players },
          });
          new SnackbarAlert().success("Team successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

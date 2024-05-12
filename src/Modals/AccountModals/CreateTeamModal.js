import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { TeamCreateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { GetTeamByProfileId } from "../../Functions/Server";

// This component is used in the modal to create a team

export default function CreateTeamModal() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);
  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Team Information
      </Heading>
      <Divider marginBottom="20px" />
      <TeamCreateForm
        padding="0"
        onSubmit={(fields) => {
          const updatedFields = fields;
          updatedFields.profileID = currentUser.id;
          updatedFields.email = currentUser.email
          updatedFields.phoneNumber = currentUser.phoneNumber
          return updatedFields;
        }}
        onSuccess={async (data) => {
          setCurrentUser({
            ...currentUser,
            team: await GetTeamByProfileId(currentUser.id),
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

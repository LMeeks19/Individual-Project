import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { ProfileCreateForm } from "../../ui-components";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { useRecoilState, useSetRecoilState } from "recoil";
import SnackbarAlert from "../../Components/Snackbar";

export default function CreateProfileModal() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Profile Information
      </Heading>
      <Divider marginBottom="20px" />
      <ProfileCreateForm
        onSubmit={(fields) => {
          const updatedFields = fields;
          updatedFields.id = currentUser.id;
          updatedFields.username = currentUser.username;
          updatedFields.email = currentUser.email;
          return updatedFields;
        }}
        onSuccess={(data) => {
          setCurrentUser({
            ...data,
            team: currentUser.team,
            players: currentUser.players,
          });
          new SnackbarAlert().success("Profile successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

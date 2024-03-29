import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { PlayerCreateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { GetPlayersByProfileId } from "../../Functions/Server";

export default function CreatePlayerModal() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);
  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Player Information
      </Heading>
      <Divider marginBottom="20px" />
      <PlayerCreateForm
        padding="0"
        onSubmit={(fields) => {
          fields.profileID = currentUser.id;
          return fields;
        }}
        onSuccess={async (data) => {
          setCurrentUser({
            ...currentUser,
            players: await GetPlayersByProfileId(currentUser.id),
          });
          new SnackbarAlert().success("Player successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}
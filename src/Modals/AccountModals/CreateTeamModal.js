import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { TeamCreateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";

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
          fields.profileID = currentUser.id;
          return fields;
        }}
        onSuccess={(data) => {
          data.players = data.players.items;
          setCurrentUser({ ...currentUser, team: data });
          setModal({ component: null, title: null, isShown: false });
        }}
      />
    </View>
  );
}

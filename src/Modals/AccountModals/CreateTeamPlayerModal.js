import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { TeamPlayerCreateForm } from "../../ui-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";

export default function CreateTeamPlayerModal(props) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);
  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Player Information
      </Heading>
      <Divider marginBottom="20px" />
      <TeamPlayerCreateForm
        padding="0"
        onSubmit={(fields) => {
          fields.teamID = currentUser.team.id;
          return fields;
        }}
        onSuccess={(data) => {
          setCurrentUser({ ...currentUser, team: { ...currentUser.team, players: [...currentUser.team.players, data] } });
          setModal({ component: null, title: null, isShown: false });
        }}
      />
    </View>
  );
}

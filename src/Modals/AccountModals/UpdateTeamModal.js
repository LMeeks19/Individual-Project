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
        team={{
          id: currentUser.team.id,
          profileId: currentUser.team.profileId,
          name: currentUser.team.name,
          league: currentUser.team.league,
          ageGroup: currentUser.team.ageGroup,
          location: currentUser.team.location,
          email: currentUser.team.email,
          phoneNumber: currentUser.team.phoneNumber,
          website: currentUser.team.website,
        }}
        onSuccess={(data) => {
          data.players = currentUser.team.players;
          data.id = currentUser.team.id;
          setCurrentUser({ ...currentUser, team: data });
          new SnackbarAlert().success("Team successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(error) => {
          new SnackbarAlert().error("Unable to update Team, please try again");
        }}
      />
    </View>
  );
}

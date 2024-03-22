import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { MatchPostCreateForm } from "../../ui-components";
import { Divider, Heading, View } from "@aws-amplify/ui-react";
import {
  currentUserState,
  matchPostsState,
  modalState,
} from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";

export default function CreateMatchPostModal() {
  const currentUser = useRecoilValue(currentUserState);
  const [matchPosts, setMatchPosts] = useRecoilState(matchPostsState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Match Post Information
      </Heading>
      <Divider marginBottom="20px" />
      <MatchPostCreateForm
        padding="0"
        onSubmit={(fields) => {
          const updatedFields = fields;
          updatedFields.createdByProfileID = currentUser.id;
          updatedFields.isActive = true;
          updatedFields.teamID = currentUser.team.id;
          updatedFields.teamName = currentUser.team.name;
          return updatedFields;
        }}
        onSuccess={(data) => {
          data.interestedUsers = [];
          setMatchPosts([...matchPosts, data]);
          new SnackbarAlert().success("Match Post successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(error) => {
          new SnackbarAlert().error(
            "Unable to create Match Post, please try again"
          );
        }}
      />
    </View>
  );
}

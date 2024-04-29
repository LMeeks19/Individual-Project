import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { MatchPostCreateForm } from "../../ui-components";
import { Divider, Heading, View } from "@aws-amplify/ui-react";
import {
  currentUserState,
  matchPostsState,
  modalState,
} from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { GetUsersMatchPosts } from "../../Functions/Server";

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
          updatedFields.createdByName = currentUser.name;
          updatedFields.createdByProfileID = currentUser.id;
          updatedFields.isActive = true;
          updatedFields.teamID = currentUser.team.id;
          updatedFields.teamName = currentUser.team.name;
          return updatedFields;
        }}
        onSuccess={async (data) => {
          const userMatchPosts = await GetUsersMatchPosts(currentUser.id);
          const nonUserMatchPosts = matchPosts.filter(
            (post) => post.createdByProfileID !== currentUser.id
          );
          let updatedMatchPosts = nonUserMatchPosts.concat(userMatchPosts);
          setMatchPosts(updatedMatchPosts);
          new SnackbarAlert().success("Match Post successfully created");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

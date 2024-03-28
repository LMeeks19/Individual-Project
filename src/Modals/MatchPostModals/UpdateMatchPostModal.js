import { Heading, View, Divider } from "@aws-amplify/ui-react";
import { MatchPostUpdateForm } from "../../ui-components";
import { useSetRecoilState, useRecoilState } from "recoil";
import { matchPostsState, modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";

export default function UpdateMatchPostModal(props) {
  const [matchPosts, setMatchPosts] = useRecoilState(matchPostsState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Match Post Information
      </Heading>
      <Divider marginBottom="20px" />
      <MatchPostUpdateForm
        padding="0"
        matchPost={props.post}
        onSubmit={(fields) => {
          let updatedFields = fields;
          updatedFields.createdByProfileID = props.post.createdByProfileID;
          updatedFields.selectedOpponent = props.post.selectedOpponent;
          updatedFields.isActive = props.post.isActive;
          updatedFields.teamName = props.post.teamName;
          updatedFields.teamID = props.post.teamID;
          return updatedFields;
        }}
        onSuccess={(data) => {
          let updatedMatchPosts = [...matchPosts].map((post) => {
            if (post.id === data.id) {
              return { data, interestedUsers: post.interestedUsers };
            }
            return post;
          });
          setMatchPosts(updatedMatchPosts);
          new SnackbarAlert().success("Match Post successfully updated");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

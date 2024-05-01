import { Heading, View, Divider } from "@aws-amplify/ui-react";
import { MatchPostUpdateForm } from "../../ui-components";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  matchPostsState,
  modalState,
} from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { createMatchPostUpdatedNotification } from "../../Functions/NotificationMethods";

// This component is used in the modal to update a match post

export default function UpdateMatchPostModal(props) {
  const [matchPosts, setMatchPosts] = useRecoilState(matchPostsState);
  const setModal = useSetRecoilState(modalState);
  const currentUser = useRecoilValue(currentUserState);

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
          let interestedUsersIds = props.post.interestedUsers
            .filter((iu) => iu.profileId !== currentUser.id)
            .map((iu) => {
              return iu.profileId;
            });
          createMatchPostUpdatedNotification(
            interestedUsersIds,
            props.post.title
          );
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(fields, errorMessage) => {
          new SnackbarAlert().error(errorMessage);
        }}
      />
    </View>
  );
}

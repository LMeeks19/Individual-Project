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
        matchPost={{
          id: props.post.id,
          title: props.post.title,
          description: props.post.description,
          createdByProfileID: props.post.createdByProfileID,
          createdByName: props.post.createdByName,
          teamID: props.post.teamID,
          teamName: props.post.teamName,
          gameType: props.post.gameType,
          ageGroup: props.post.ageGroup,
          teamSize: props.post.teamSize,
          substitutionLimit: props.post.substitutionLimit,
          cards: props.post.cards,
          halfLength: props.post.halfLength,
          kickOff: props.post.kickOff,
          street: props.post.street,
          townCity: props.post.townCity,
          county: props.post.county,
          postcode: props.post.postcode,
          interestedUsers: props.post.interestedUsers,
          isActive: props.post.isActive,
        }}
        onSuccess={(data) => {
          let curPosts = matchPosts.filter((post) => post.id === data.id);
          data.interestedUsers = data.interestedUsers.items;
          curPosts.push(data);
          setMatchPosts(curPosts);
          new SnackbarAlert().success("Match Post successfully updated");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(error) => {
          new SnackbarAlert().error(
            "Unable to update Match Post, please try again"
          );
        }}
      />
    </View>
  );
}

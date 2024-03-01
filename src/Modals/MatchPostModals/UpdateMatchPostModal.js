import { Heading, View, Divider } from "@aws-amplify/ui-react";
import { MatchPostUpdateForm } from "../../ui-components";
import { useSetRecoilState, useRecoilState } from "recoil";
import { matchPostsState, modalState } from "../../Functions/GlobalState";

export default function UpdateMatchPostModal(props) {
  const [posts, setPosts] = useRecoilState(matchPostsState);
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
          let curPosts = posts.filter((post) => post.id === data.id);
          data.interestedUsers = data.interestedUsers.items;
          curPosts.push(data);
          setPosts(curPosts);
          setModal({ component: null, title: null, isShown: false });
        }}
      />
    </View>
  );
}

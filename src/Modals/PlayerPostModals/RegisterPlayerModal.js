import { Heading, View, Divider } from "@aws-amplify/ui-react";
import { RegisterPlayerPostPlayerForm } from "../../ui-components";
import { useSetRecoilState, useRecoilState } from "recoil";
import { modalState, playerPostsState } from "../../Functions/GlobalState";
import { GetPlayerPosts } from "../../Functions/Server";

export default function RegisterPlayerModal(props) {
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Register Player
      </Heading>
      <Divider marginBottom="20px" />
      <RegisterPlayerPostPlayerForm
        padding="0"
        playerPost={{
          id: props.playerPost.id,
        }}
        onSuccess={async () => {
          setPlayerPosts(await GetPlayerPosts());
          setModal({ component: null, title: null, isShown: false });
        }}
      />
    </View>
  );
}

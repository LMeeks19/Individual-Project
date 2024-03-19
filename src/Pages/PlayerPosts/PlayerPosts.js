import { Heading, View, Tabs, Flex, Button, Text } from "@aws-amplify/ui-react";
import PlayerPostsTab from "./PlayerPostsTab";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  currentUserState,
  playerPostsState,
} from "../../Functions/GlobalState";
import { modalState } from "../../Functions/GlobalState";
import { Add } from "@mui/icons-material";
import "./PlayerPosts.css";
import { GetPlayerPosts } from "../../Functions/Server";
import CreatePlayerPostModal from "../../Modals/PlayerPostModals/CreatePlayerPostsModal";

export default function MatchPosts() {
  const currentUser = useRecoilValue(currentUserState);
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);
  const setModal = useSetRecoilState(modalState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPlayerPosts() {
      let playerPosts = await GetPlayerPosts();
      playerPosts = playerPosts.sort((a, b) => a.title.localeCompare(b.title));
      setPlayerPosts(playerPosts);
      setIsLoading(false);
    }
    getPlayerPosts();
  }, []);

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <View className="page">
      <Flex
        marginBottom="20px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading level={3}>Player Posts</Heading>
        <Button
          className="custom-button"
          variation="primary"
          onClick={() =>
            openModal(<CreatePlayerPostModal />, "Create Player Post")
          }
        >
          <Text display="flex">
            <Add fontSize="small" className="icon" />
            Create
          </Text>
        </Button>
      </Flex>
      <Tabs.Container defaultValue="1">
        <Tabs.List spacing="equal" wrap="wrap">
          <Tabs.Item className="account-tab" value="1">
            ALL PLAYER POSTS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="2">
            MY PLAYER POSTS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="3">
            INTERESTED PLAYER POSTS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="4">
            ARCHIVED PLAYER POSTS
          </Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="1">
          <PlayerPostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            playerPosts={playerPosts.filter(
              (post) =>
                post.createdByProfileID !== currentUser.id && post.isActive
            )}
          />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <PlayerPostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            playerPosts={playerPosts.filter(
              (post) =>
                post.createdByProfileID === currentUser.id && post.isActive
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel value="3">
          <PlayerPostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            playerPosts={playerPosts.filter(
              (post) =>
                post.interestedUsers?.some(
                  (interestedUser) =>
                    interestedUser.profileId === currentUser.id
                ) && post.isActive
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel value="4">
          <PlayerPostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            playerPosts={playerPosts.filter(
              (post) =>
                !post.isActive &&
                (post.createdByProfileID === currentUser.id ||
                  post.selectedPlayers.some((id) =>
                    currentUser.players.some((player) => player.id === id)
                  ))
            )}
          />
        </Tabs.Panel>
      </Tabs.Container>
    </View>
  );
}

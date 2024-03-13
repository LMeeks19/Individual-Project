import { Heading, View, Tabs, Flex, Button, Text } from "@aws-amplify/ui-react";
import PlayerPostsTab from "./PlayerPostsTab";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, playerPostsState } from "../../Functions/GlobalState";
import { modalState } from "../../Functions/GlobalState";
import { Add } from "@mui/icons-material";
import "./PlayerPosts.css";

export default function MatchPosts() {
  const currentUser = useRecoilValue(currentUserState);
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);
  const setModal = useSetRecoilState(modalState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPlayerPosts() {
      // TODO:
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
          // TODO: OnClick Modal
        >
          <Text display="flex">
            <Add
              fontSize="small"
              className="icon"
              // TODO: OnClick Modal
            />
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
            MY PLAEYR POSTS
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
                !post.isActive && post.createdByProfileID === currentUser.id
            )}
          />
        </Tabs.Panel>
      </Tabs.Container>
    </View>
  );
}

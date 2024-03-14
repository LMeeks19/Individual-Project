import { Heading, View, Tabs, Flex, Button, Text } from "@aws-amplify/ui-react";
import MatchPostsTab from "./MatchPostsTab";
import { useEffect, useState } from "react";
import { GetMatchPosts } from "../../Functions/Server";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, matchPostsState } from "../../Functions/GlobalState";
import CreateMatchPostModal from "../../Modals/MatchPostModals/CreateMatchPostModal";
import { modalState } from "../../Functions/GlobalState";
import { Add } from "@mui/icons-material";
import "./MatchPosts.css";

export default function MatchPosts() {
  const currentUser = useRecoilValue(currentUserState);
  const [matchPosts, setMatchPosts] = useRecoilState(matchPostsState);
  const setModal = useSetRecoilState(modalState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMatchPosts() {
      let apiPosts = await GetMatchPosts();
      apiPosts = apiPosts.sort((a, b) => a.title.localeCompare(b.title));
      setMatchPosts(apiPosts);
      setIsLoading(false);
    }
    getMatchPosts();
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
        <Heading level={3}>Match Posts</Heading>
        <Button
          className="custom-button"
          variation="primary"
          onClick={() =>
            openModal(<CreateMatchPostModal />, "Create Match Post")
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
          <Tabs.Item className="match-posts-tab" value="1">
            ALL MATCH POSTS
          </Tabs.Item>
          <Tabs.Item className="match-posts-tab" value="2">
            MY MATCH POSTS
          </Tabs.Item>
          <Tabs.Item className="match-posts-tab" value="3">
            INTERESTED MATCH POSTS
          </Tabs.Item>
          <Tabs.Item className="match-posts-tab" value="4">
            ARCHIVED MATCH POSTS
          </Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="1">
          <MatchPostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            matchPosts={matchPosts.filter(
              (post) =>
                post.createdByProfileID !== currentUser.id && post.isActive
            )}
          />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <MatchPostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            matchPosts={matchPosts.filter(
              (post) =>
                post.createdByProfileID === currentUser.id && post.isActive
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel value="3">
          <MatchPostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            matchPosts={matchPosts.filter(
              (post) =>
                post.interestedUsers?.some(
                  (interestedUser) =>
                    interestedUser.profileId === currentUser.id
                ) && post.isActive
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel value="4">
          <MatchPostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            matchPosts={matchPosts.filter(
              (post) =>
                !post.isActive && post.createdByProfileID === currentUser.id
            )}
          />
        </Tabs.Panel>
      </Tabs.Container>
    </View>
  );
}

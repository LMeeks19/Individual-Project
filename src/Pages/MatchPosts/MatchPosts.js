import { Heading, View, Tabs, Flex, Button, Text } from "@aws-amplify/ui-react";
import PostsTab from "./PostsTab";
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
  const [posts, setPosts] = useRecoilState(matchPostsState);
  const setModal = useSetRecoilState(modalState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      let apiPosts = await GetMatchPosts();
      apiPosts = apiPosts.sort((a, b) => a.title.localeCompare(b.title));
      setPosts(apiPosts);
      setIsLoading(false);
    }
    getPosts();
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
            <Add
              fontSize="small"
              className="icon"
              onClick={() =>
                openModal(<CreateMatchPostModal />, "Create Match Post")
              }
            />
            Create
          </Text>
        </Button>
      </Flex>
      <Tabs.Container defaultValue="1">
        <Tabs.List spacing="equal" wrap="wrap">
          <Tabs.Item className="account-tab" value="1">
            ALL POSTS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="2">
            MY POSTS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="3">
            INTERESTED POSTS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="4">
            ARCHIVED POSTS
          </Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="1">
          <PostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            posts={posts.filter(
              (post) =>
                post.createdByProfileID !== currentUser.id && post.isActive
            )}
          />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <PostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            posts={posts.filter(
              (post) =>
                post.createdByProfileID === currentUser.id && post.isActive
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel value="3">
          <PostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            posts={posts.filter(
              (post) =>
                post.interestedUsers?.some(
                  (interestedUser) =>
                    interestedUser.profileId === currentUser.id
                ) && post.isActive
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel value="4">
          <PostsTab
            isLoading={isLoading}
            currentUser={currentUser}
            posts={posts.filter(
              (post) =>
                !post.isActive && post.createdByProfileID === currentUser.id
            )}
          />
        </Tabs.Panel>
      </Tabs.Container>
    </View>
  );
}

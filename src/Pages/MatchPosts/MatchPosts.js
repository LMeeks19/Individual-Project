import { Heading, View, Tabs } from "@aws-amplify/ui-react";
import PostsTab from "./PostsTab";
import { useEffect, } from "react";
import { GetMatchPosts } from "../../Functions/Server";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentUserState, matchPostsState } from "../../Functions/GlobalState";
import "./MatchPosts.css";

export default function MatchPosts() {
  const currentUser = useRecoilValue(currentUserState);
  const [posts, setPosts] = useRecoilState(matchPostsState);

  useEffect(() => {
    async function getPosts() {
      let apiPosts = await GetMatchPosts();
      apiPosts = apiPosts.sort((a, b) => a.title.localeCompare(b.title));
      setPosts(apiPosts);
    }
    getPosts();
  }, []);

  return (
    <View className="page">
      <Heading marginBottom="20px" level={3}>
        Match Posts
      </Heading>
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
            currentUser={currentUser}
            posts={posts.filter(
              (post) =>
                post.createdByProfileID !== currentUser.id && !post.isClosed
            )}
          />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <PostsTab
            currentUser={currentUser}
            posts={posts.filter(
              (post) =>
                post.createdByProfileID === currentUser.id && !post.isClosed
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel value="3">
          <PostsTab
            currentUser={currentUser}
            posts={posts.filter(
              (post) =>
                post.interestedUsers.includes(currentUser.id) && !post.isClosed
            )}
          />
        </Tabs.Panel>
        <Tabs.Panel value="4">
          <PostsTab
            currentUser={currentUser}
            posts={posts.filter(
              (post) =>
                post.isClosed &&
                (post.createdByProfileID === currentUser.id ||
                  post.selectedOpponentProfileID)
            )}
          />
        </Tabs.Panel>
      </Tabs.Container>
    </View>
  );
}

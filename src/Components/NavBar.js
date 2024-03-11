import {
  Tabs,
  Text,
  Flex,
  Menu,
  MenuItem,
  Divider,
  Heading
} from "@aws-amplify/ui-react";
import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

import { PostAdd, Chat, AccountCircle } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../Functions/GlobalState";

export default function NavBar() {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);

  return (
    <Flex gap="0" className="flex-container">
      <Heading className="header" level={3}>Individual Project</Heading>
      <Tabs.Container className="tab-container" defaultValue={currentUser.accountType === "COACH" || currentUser.accountType === "ADMIN" ? "1" : "2"}>
        <Tabs.List className="navbar" spacing="equal">

          <Tabs.Item
            className="item"
            value="1"
            onClick={() => navigate("/match-posts")}
          >
            <Text display="flex">
              <PostAdd className="icon" />
              MATCH POSTS
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="2"
            onClick={() => navigate("/player-posts")}
          >
            <Text display="flex">
              <PostAdd className="icon" />
              PLAYER POSTS
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="3"
            onClick={() => navigate("/messages")}
          >
            <Text display="flex">
              <Chat className="icon" />
              MESSAGES
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="4"
            onClick={() => navigate("/account")}
          >
            <Text display="flex">
              <AccountCircle className="icon" />
              ACCOUNT
            </Text>
          </Tabs.Item>
        </Tabs.List>
      </Tabs.Container>
      <Menu width="fit-content" menuAlign="end">
        <Divider />
        <MenuItem onClick={() => navigate("/match-posts")}>
          <Text display="flex">
            <PostAdd className="icon" />
            MATCH POSTS
          </Text>
        </MenuItem>
        <MenuItem onClick={() => navigate("/player-posts")}>
          <Text display="flex">
            <PostAdd className="icon" />
            PLAYER POSTS
          </Text>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/messages")}>
          <Text display="flex">
            <Chat className="icon" />
            MESSAGES
          </Text>
        </MenuItem>
        <MenuItem onClick={() => navigate("/account")}>
          <Text display="flex">
            <AccountCircle className="icon" />
            ACCOUNT
          </Text>
        </MenuItem>
      </Menu>
    </Flex>
  );
}

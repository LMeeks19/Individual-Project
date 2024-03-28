import {
  Tabs,
  Text,
  Flex,
  Menu,
  MenuItem,
  Divider,
  Heading,
} from "@aws-amplify/ui-react";
import React, { useEffect } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { PostAdd, Chat, AccountCircle } from "@mui/icons-material";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  activeNavbarTabState,
  currentUserState,
} from "../Functions/GlobalState";
import { AccountType } from "../Functions/Enums";

export default function NavBar() {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);
  const [activeNavbarTab, setActiveNavbarTab] =
    useRecoilState(activeNavbarTabState);
  const accountTypes = new AccountType();

  useEffect(() => {
    function setTab() {
      if (window.location.href.endsWith("/")) {
        if (
          currentUser.accountType === accountTypes.COACH ||
          currentUser.accountType === accountTypes.ADMIN ||
          currentUser.accountType === accountTypes.NONE
        ) {
          navigate("/match-posts");
        } else if (currentUser.accountType === accountTypes.PARENT) {
          navigate("/player-posts");
        }
      }
      if (window.location.href.endsWith("/match-posts")) {
        setActiveNavbarTab("1");
      } else if (window.location.href.endsWith("/player-posts")) {
        setActiveNavbarTab("2");
      } else if (window.location.href.endsWith("/messages")) {
        setActiveNavbarTab("3");
      } else if (window.location.href.endsWith("/account")) {
        setActiveNavbarTab("4");
      }
    }
    setTab();
  }, []);

  return (
    <Flex gap="0" className="flex-container">
      <Heading className="header" level={3}>
        Individual Project
      </Heading>
      <Tabs.Container className="tab-container" value={activeNavbarTab}>
        <Tabs.List className="navbar" spacing="equal">
          <Tabs.Item
            className="item"
            value="1"
            onClick={() => {
              setActiveNavbarTab("1");
              navigate("/match-posts");
            }}
          >
            <Text display="flex">
              <PostAdd className="icon" />
              MATCH POSTS
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="2"
            onClick={() => {
              setActiveNavbarTab("2");
              navigate("/player-posts");
            }}
          >
            <Text display="flex">
              <PostAdd className="icon" />
              PLAYER POSTS
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="3"
            onClick={() => {
              setActiveNavbarTab("3");
              navigate("/messages");
            }}
          >
            <Text display="flex">
              <Chat className="icon" />
              MESSAGES
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="4"
            onClick={() => {
              setActiveNavbarTab("4");
              navigate("/account");
            }}
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

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
import {
  PostAdd,
  Chat,
  AccountCircle,
  CalendarMonth,
  Notifications,
  GroupAdd,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  activeNavbarTabState,
  currentUserState,
  notificationsState,
} from "../Functions/GlobalState";
import { AccountType } from "../Functions/Enums";

// Implementation of the navbar component

export default function NavBar() {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserState);
  const notifications = useRecoilValue(notificationsState);
  const [activeNavbarTab, setActiveNavbarTab] =
    useRecoilState(activeNavbarTabState);
  const accountTypes = new AccountType();

  useEffect(() => {
    function setTab() {
      if (window.location.href.endsWith("/")) {
        navigate("/schedule");
      }
      if (window.location.href.endsWith("/schedule")) {
        setActiveNavbarTab("1");
      }
      if (window.location.href.endsWith("/match-posts")) {
        if (currentUser.accountType === accountTypes.PARENT)
          navigate("/player-posts");
        else setActiveNavbarTab("2");
      }
      if (window.location.href.endsWith("/player-posts")) {
        setActiveNavbarTab("3");
      }
      if (window.location.href.endsWith("/messages")) {
        setActiveNavbarTab("4");
      }
      if (window.location.href.endsWith("/notifications")) {
        setActiveNavbarTab("5");
      }
      if (window.location.href.endsWith("/account")) {
        setActiveNavbarTab("6");
      }
    }
    setTab();
  }, []);

  return (
    <Flex gap="0" className="flex-container">
      <Heading className="header" level={3}>
        Football Finder
      </Heading>
      <Tabs.Container className="tab-container" value={activeNavbarTab}>
        <Tabs.List className="navbar">
          <Tabs.Item
            className="item"
            value="1"
            onClick={() => {
              setActiveNavbarTab("1");
              navigate("/schedule");
            }}
          >
            <Text display="flex">
              <CalendarMonth className="icon" />
              SCHEDULE
            </Text>
          </Tabs.Item>

          {currentUser.accountType === accountTypes.COACH ||
          currentUser.accountType === accountTypes.ADMIN ? (
            <Tabs.Item
              className="item"
              value="2"
              onClick={() => {
                setActiveNavbarTab("2");
                navigate("/match-posts");
              }}
            >
              <Text display="flex">
                <PostAdd className="icon" />
                MATCH POSTS
              </Text>
            </Tabs.Item>
          ) : (
            <></>
          )}

          <Tabs.Item
            className="item"
            value="3"
            onClick={() => {
              setActiveNavbarTab("3");
              navigate("/player-posts");
            }}
          >
            <Text display="flex">
              <GroupAdd className="icon" />
              PLAYER POSTS
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="4"
            onClick={() => {
              setActiveNavbarTab("4");
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
            value="5"
            onClick={() => {
              setActiveNavbarTab("5");
              navigate("/notifications");
            }}
          >
            <Badge
              badgeContent={
                notifications.filter((notification) => !notification.isRead)
                  .length
              }
              color="error"
            >
              <Text display="flex">
                <Notifications className="icon" />
                NOTIFICATIONS
              </Text>
            </Badge>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="6"
            onClick={() => {
              setActiveNavbarTab("6");
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
      <Badge
        badgeContent={
          notifications.filter((notification) => !notification.isRead).length
        }
        color="error"
      >
        <Menu width="fit-content" menuAlign="end">
          <MenuItem onClick={() => navigate("/schedule")}>
            <Text display="flex">
              <CalendarMonth className="icon" />
              SCHEDULE
            </Text>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => navigate("/match-posts")}>
            <Text display="flex">
              <PostAdd className="icon" />
              MATCH POSTS
            </Text>
          </MenuItem>
          <MenuItem onClick={() => navigate("/player-posts")}>
            <Text display="flex">
              <GroupAdd className="icon" />
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
          <MenuItem onClick={() => navigate("/notifications")}>
            <Badge
              badgeContent={
                notifications.filter((notification) => !notification.isRead)
                  .length
              }
              color="error"
            >
              <Text display="flex">
                <Notifications className="icon" />
                NOTIFICATIONS
              </Text>
            </Badge>
          </MenuItem>
          <MenuItem onClick={() => navigate("/account")}>
            <Text display="flex">
              <AccountCircle className="icon" />
              ACCOUNT
            </Text>
          </MenuItem>
        </Menu>
      </Badge>
    </Flex>
  );
}

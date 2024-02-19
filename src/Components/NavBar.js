import {
  Tabs,
  Text,
  Flex,
  Menu,
  MenuItem,
  Divider,
} from "@aws-amplify/ui-react";
import React from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Flex gap="0" className="flex-container">
      <Tabs.Container className="tab-container" defaultValue="1">
        <Tabs.List className="navbar" spacing="equal">
          <Tabs.Item
            className="item"
            value="1"
            onClick={() => navigate("/dashboard")}
          >
            <Text display="flex">
              <DashboardIcon className="icon" />
              DASHBOARD
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="2"
            onClick={() => navigate("/schedule")}
          >
            <Text display="flex">
              <CalendarMonthIcon className="icon" />
              SCHEDULE
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="3"
            onClick={() => navigate("/match-posts")}
          >
            <Text display="flex">
              <PostAddIcon className="icon" />
              MATCH POSTS
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="4"
            onClick={() => navigate("/player-posts")}
          >
            <Text display="flex">
              <PostAddIcon className="icon" />
              PLAYER POSTS
            </Text>
          </Tabs.Item>

          <Tabs.Item
            className="item"
            value="5"
            onClick={() => navigate("/messages")}
          >
            <Text display="flex">
              <ChatIcon className="icon" />
              MESSAGES
            </Text>
          </Tabs.Item>
          <Tabs.Item
            className="item"
            value="6"
            onClick={() => navigate("/account")}
          >
            <Text display="flex">
              <AccountCircleIcon className="icon" />
              ACCOUNT
            </Text>
          </Tabs.Item>
        </Tabs.List>
      </Tabs.Container>
      <Menu width="fit-content" menuAlign="end">
        <MenuItem onClick={() => navigate("/dashboard")}>
          <Text display="flex">
            <DashboardIcon className="icon" />
            DASHBOARD
          </Text>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/schedule")}>
          <Text display="flex">
            <CalendarMonthIcon className="icon" />
            SCHEDULE
          </Text>
        </MenuItem>
        <MenuItem onClick={() => navigate("/match-posts")}>
          <Text display="flex">
            <PostAddIcon className="icon" />
            MATCH POSTS
          </Text>
        </MenuItem>
        <MenuItem onClick={() => navigate("/player-posts")}>
          <Text display="flex">
            <PostAddIcon className="icon" />
            PLAYER POSTS
          </Text>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/messages")}>
          <Text display="flex">
            <ChatIcon className="icon" />
            MESSAGES
          </Text>
        </MenuItem>
        <MenuItem onClick={() => navigate("/account")}>
          <Text display="flex">
            <AccountCircleIcon className="icon" />
            ACCOUNT
          </Text>
        </MenuItem>
      </Menu>
    </Flex>
  );
}

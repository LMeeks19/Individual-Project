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
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBar() {
  const activeTab =
    window.localStorage.getItem("activeTab") === null
      ? "1"
      : window.localStorage.getItem("activeTab");

  const setActiveTab = (tab) => {
    window.localStorage.setItem("activeTab", tab);
  };

  return (
    <Flex gap="0" className="flex-container">
      <Tabs.Container className="tab-container" defaultValue={activeTab}>
        <Tabs.List className="navbar" spacing="left">
          <Link className="link" to={"/dashboard"} component={Link}>
            <Tabs.Item
              className="item"
              value="1"
              onClick={() => setActiveTab("1")}
            >
              <DashboardIcon className="icon" />
              <Text>DASHBOARD</Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/schedule"} component={Link}>
            <Tabs.Item
              className="item"
              value="2"
              onClick={() => setActiveTab("2")}
            >
              <CalendarMonthIcon className="icon" />
              <Text>SCHEDULE</Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/match-post"} component={Link}>
            <Tabs.Item
              className="item"
              value="3"
              onClick={() => setActiveTab("3")}
            >
              <PostAddIcon className="icon" />
              <Text>MATCH POST</Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/players-post"} component={Link}>
            <Tabs.Item
              className="item"
              value="4"
              onClick={() => setActiveTab("4")}
            >
              <PostAddIcon className="icon" />
              <Text>PLAYERS POST</Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/messages"} component={Link}>
            <Tabs.Item
              className="item"
              value="5"
              onClick={() => setActiveTab("5")}
            >
              <ChatIcon className="icon" />
              <Text>MESSAGES</Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/account"} component={Link}>
            <Tabs.Item
              className="item"
              value="6"
              onClick={() => setActiveTab("6")}
            >
              <AccountCircleIcon className="icon" />
              <Text>ACCOUNT</Text>
            </Tabs.Item>
          </Link>
        </Tabs.List>
      </Tabs.Container>
      <Menu menuAlign="end">
        <MenuItem>DASHBOARD</MenuItem>
        <Divider />
        <MenuItem>MATCH POSTS</MenuItem>
        <MenuItem>PLAYER POSTS</MenuItem>
        <Divider />
        <MenuItem>MESSAGES</MenuItem>
        <MenuItem>ACCOUNT</MenuItem>
      </Menu>
    </Flex>
  );
}

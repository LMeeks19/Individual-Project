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

  return (
    <Flex gap="0" className="flex-container">
      <Tabs.Container className="tab-container" defaultValue="1">
        <Tabs.List className="navbar" spacing="equal">
          <Link className="link" to={"/dashboard"} component={Link}>
            <Tabs.Item className="item" value="1">
              <Text display="flex">
                <DashboardIcon className="icon" />
                <Text>DASHBOARD</Text>
              </Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/schedule"} component={Link}>
            <Tabs.Item className="item" value="2">
              <Text display="flex">
                <CalendarMonthIcon className="icon" />
                <Text>SCHEDULE</Text>
              </Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/match-posts"} component={Link}>
            <Tabs.Item className="item" value="3">
              <Text display="flex">
                <PostAddIcon className="icon" />
                <Text>MATCH POSTS</Text>
              </Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/player-posts"} component={Link}>
            <Tabs.Item className="item" value="4">
              <Text display="flex">
                <PostAddIcon className="icon" />
                <Text>PLAYER POSTS</Text>
              </Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/messages"} component={Link}>
            <Tabs.Item className="item" value="5">
              <Text display="flex">
                <ChatIcon className="icon" />
                <Text>MESSAGES</Text>
              </Text>
            </Tabs.Item>
          </Link>

          <Link className="link" to={"/view-account"} component={Link}>
            <Tabs.Item className="item" value="6">
              <Text display="flex">
                <AccountCircleIcon className="icon" />
                <Text>ACCOUNT</Text>
              </Text>
            </Tabs.Item>
          </Link>
        </Tabs.List>
      </Tabs.Container>
      <Menu height="75vh" overflow="auto" menuAlign="end">
        <MenuItem>
          <Link className="link" to={"/dashboard"} component={Link}>
            <Text display="flex">
              <DashboardIcon className="icon" />
              <Text margin="0px 0px 0px 5px">DASHBOARD</Text>
            </Text>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link className="link" to={"/schedule"} component={Link}>
            <Text display="flex">
              <CalendarMonthIcon className="icon" />
              <Text margin="0px 0px 0px 5px">SCHEDULE</Text>
            </Text>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="link" to={"/match-posts"} component={Link}>
            <Text display="flex">
              <PostAddIcon className="icon" />
              <Text margin="0px 0px 0px 5px">MATCH POSTS</Text>
            </Text>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="link" to={"/player-posts"} component={Link}>
            <Text display="flex">
              <PostAddIcon className="icon" />
              <Text margin="0px 0px 0px 5px">PLAYER POSTS</Text>
            </Text>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link className="link" to={"/messages"} component={Link}>
            <Text display="flex">
              <ChatIcon className="icon" />
              <Text margin="0px 0px 0px 5px">MESSAGES</Text>
            </Text>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="link" to={"/view-account"} component={Link}>
            <Text display="flex">
              <AccountCircleIcon className="icon" />
              <Text margin="0px 0px 0px 5px">ACCOUNT</Text>
            </Text>
          </Link>
        </MenuItem>
      </Menu>
    </Flex>
  );
}

import { Tabs, Text } from "@aws-amplify/ui-react";
import React from "react";
import "./NavBar.css";
import { useRecoilState } from "recoil";
import { sideBarState } from "../State/GlobalState";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [sideBar, setSideBar] = useRecoilState(sideBarState);

  return (
    <Tabs.Container defaultValue="1">
      <Tabs.List className="navbar" spacing="equal">
        <Tabs.Item className="item" value="1">
          <Link className="link" to={"/"} component={Link}>
            <Text>DASHBOARD</Text>
          </Link>
        </Tabs.Item>
        <Tabs.Item className="item" value="2">
          <Link className="link" to={"/schedule"} component={Link}>
            <Text>SCHEDULE</Text>
          </Link>
        </Tabs.Item>
        <Tabs.Item className="item" value="3">
          <Link className="link" to={"/match-post"} component={Link}>
            <Text>MATCH POST</Text>
          </Link>
        </Tabs.Item>
        <Tabs.Item className="item" value="4">
          <Link className="link" to={"/players-post"} component={Link}>
            <Text>PLAYERS POST</Text>
          </Link>
        </Tabs.Item>
        <Tabs.Item className="item" value="5" onClick={() => setSideBar(!sideBar)}>
            <Text>ACCOUNT</Text>
        </Tabs.Item>
      </Tabs.List>
    </Tabs.Container>
  );
}

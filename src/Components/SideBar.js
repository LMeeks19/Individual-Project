import "./SideBar.css";
import { Avatar } from "@mui/material";
import { sideBarState, themeState } from "../State/GlobalState";
import { useRecoilState } from "recoil";
import {
  Card,
  Divider,
  View,
  ToggleButtonGroup,
  ToggleButton,
  Text,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ContrastIcon from "@mui/icons-material/Contrast";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideBar() {
  const [sideBar, setSideBar] = useRecoilState(sideBarState);
  const [theme, setTheme] = useRecoilState(themeState);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <Card className={`sideBar ${sideBar ? "active" : ""}`}>
      <View className="header">
        <Text className="text">ACCOUNT</Text>
        <Text className="collapse ripple" onClick={() => setSideBar(!sideBar)}>
          <CloseSharpIcon fontSize="large" />
        </Text>
      </View>

      <Divider />

      <View className="details">
        <Avatar className="avatar" />
        <Text className="text">{user.username}</Text>
      </View>

      <Divider />

      <Link className="link" to={"/profile"} component={Link}>
        <View className="tab ripple" onClick={() => setSideBar(!sideBar)}>
          <Text className="text">PROFILE</Text>
          <Text className="icon">
            <ArrowCircleRightOutlinedIcon fontSize="large" />
          </Text>
        </View>
      </Link>

      <Divider />

      <View className="footer">
        <Divider />
        <View className="tab switcher">
          <Text className="text">THEME</Text>
          <ToggleButtonGroup
            value={theme}
            isExclusive
            padding="10px"
            onChange={(value) => setTheme(value)}
          >
            <ToggleButton isDisabled={theme === "light"} value="light">
              <LightModeIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton isDisabled={theme === "dark"} value="dark">
              <DarkModeIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton isDisabled={theme === "system"} value="system">
              <ContrastIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </View>

        <Divider />

        <Link className="link" to={"/settings"} component={Link}>
          <View className="tab ripple" onClick={() => setSideBar(!sideBar)}>
            <Text className="text">SETTINGS</Text>
            <Text className="icon">
              <SettingsIcon fontSize="large" />
            </Text>
          </View>
        </Link>

        <Divider />
        <View className="tab ripple" onClick={signOut}>
          <Text className="text">SIGNOUT</Text>
          <Text className="icon">
            <LogoutOutlinedIcon fontSize="large" />
          </Text>
        </View>
      </View>
    </Card>
  );
}

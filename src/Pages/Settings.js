import { Heading, View } from "@aws-amplify/ui-react";
import { useRecoilValue } from "recoil";
import { sideBarState } from "../State/GlobalState";
import "./Settings.css";

export default function Settings() {
  const sideBar = useRecoilValue(sideBarState);

  return (
    <View className={`page ${sideBar ? "blur" : ""}`}>
      <Heading level={3}>Settings</Heading>
    </View>
  );
}

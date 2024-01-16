import { Heading, View } from "@aws-amplify/ui-react";
import { useRecoilValue } from "recoil";
import { sideBarState } from "../State/GlobalState";
import "./Profile.css";

export default function Profile() {
  const sideBar = useRecoilValue(sideBarState);

  return (
    <View className={`page ${sideBar ? "blur" : ""}`}>
      <Heading level={3}>Profile</Heading>
    </View>
  );
}

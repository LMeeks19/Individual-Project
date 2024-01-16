import { Heading, View } from "@aws-amplify/ui-react";
import { useRecoilValue } from "recoil";
import { sideBarState } from "../State/GlobalState";
import "./Schedule.css";

export default function Schedule() {
  const sideBar = useRecoilValue(sideBarState);

  return (
    <View className={`page ${sideBar ? "blur" : ""}`}>
      <Heading level={3}>Schedule</Heading>

    </View>
  );
}

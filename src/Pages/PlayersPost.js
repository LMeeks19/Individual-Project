import { Heading, View } from "@aws-amplify/ui-react";
import { useRecoilValue } from "recoil";
import { sideBarState } from "../State/GlobalState";
import "./PlayersPost.css"


export default function PlayersPost() {
  const sideBar = useRecoilValue(sideBarState);

  return (
    <View className={`page ${sideBar ? "blur" : ""}`}>
      <Heading level={3}>PlayersPost</Heading>
    </View>
  );
}

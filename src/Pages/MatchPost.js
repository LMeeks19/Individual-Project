import { Heading, View } from "@aws-amplify/ui-react";
import { useRecoilValue } from "recoil";
import { sideBarState } from "../State/GlobalState";
import "./MatchPost.css"

export default function MatchPost() {
  const sideBar = useRecoilValue(sideBarState);

  return (
    <View className={`page ${sideBar ? "blur" : ""}`}>
      <Heading level={3}>Match Post</Heading>
    </View>
  );
}

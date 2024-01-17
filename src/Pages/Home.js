import { Heading, View } from "@aws-amplify/ui-react";
import { useRecoilValue } from "recoil";
import { sideBarState } from "../State/GlobalState";
import "./Home.css";

export default function Home() {
  const sideBar = useRecoilValue(sideBarState);

  return (
    <View className={`page ${sideBar ? 'blur' : ''}`}>
      <Heading level={3}>Dashboard</Heading>
    </View>
  );
}

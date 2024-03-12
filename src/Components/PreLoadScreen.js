import { Flex, Text, View } from "@aws-amplify/ui-react";
import "./PreLoadScreen.css";

export default function PreLoadScreen() {
  return (
    <Flex className="loader-container">
      <Text className="loader-text">Loading</Text>
      <View className="loader"></View>
    </Flex>
  );
}

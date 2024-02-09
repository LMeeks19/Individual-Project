import { View, Text } from "@aws-amplify/ui-react";
import CloseIcon from "@mui/icons-material/Close";
import "./Warning-Message.css";
import { useSetRecoilState } from "recoil";
import { warningIsShownState } from "../State/GlobalState";

export default function WarningMessage() {
  const setWarningIsShown = useSetRecoilState(warningIsShownState);

  return (
    <View className="warning">
      <View className="warning-close" onClick={() => setWarningIsShown(false)}>
        <Text>
          <CloseIcon />
        </Text>
      </View>
      <View className="warning-header">
        <Text>! WARNING !</Text>
      </View>
      <View className="warning-message">
        <Text>
          Access to certain features is be disabled until <a href="/edit-account">account</a> set-up has been completed
        </Text>
      </View>
    </View>
  );
}

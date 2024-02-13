import { View, Text } from "@aws-amplify/ui-react";
import CloseIcon from "@mui/icons-material/Close";
import "./Warning-Message.css";
import { useSetRecoilState } from "recoil";
import { CreateProfileModalIsShownState, warningIsShownState } from "../State/GlobalState";

export default function WarningMessage() {
  const setWarningIsShown = useSetRecoilState(warningIsShownState);
  const setIsCreateProfileModalShown = useSetRecoilState(CreateProfileModalIsShownState);

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
          Access to certain features is be disabled until account set-up has been completed
        </Text>
        <Text className="warning-link" onClick={() => setIsCreateProfileModalShown(true)}>Create Profile</Text>
      </View>
    </View>
  );
}

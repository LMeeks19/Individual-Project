import { View, Text } from "@aws-amplify/ui-react";
import CloseIcon from "@mui/icons-material/Close";
import "./Warning-Message.css";
import { useRecoilState } from "recoil";
import { modalState, warningIsShownState } from "../Functions/GlobalState";

export default function WarningMessage(props) {
  const [warningIsShown, setWarningIsShown] =
    useRecoilState(warningIsShownState);
  const [modal, setModal] = useRecoilState(modalState);

  return (
    <View
      className={`warning ${
        Object.values(props.currentUser).some((v) => v === null) &&
        warningIsShown
          ? "show"
          : ""
      }`}
    >
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
          Access to certain features is be disabled until account set-up has
          been completed
        </Text>
        <Text
          className="warning-link"
          onClick={() => setModal({ ...modal, isShown: true })}
        >
          Create Profile
        </Text>
      </View>
    </View>
  );
}

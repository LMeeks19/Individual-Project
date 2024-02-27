import { Card, View, Heading } from "@aws-amplify/ui-react";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState } from "recoil";
import { modalState } from "../Functions/GlobalState";
import "./Modal.css";

export default function Modal() {
  const [modal, setModal] = useRecoilState(modalState);

  return (
    <Card className="modal">
      <View className="banner">
        <Heading className="header" level={4}>
          {modal.title}
        </Heading>
        <CloseIcon
          fontSize="large"
          className="icon"
          onClick={() => setModal({ component: <></>, title: null, isShown: false })}
        />
      </View>
      {modal.component}
    </Card>
  );
}

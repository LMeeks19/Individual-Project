import { Card, View, Heading } from "@aws-amplify/ui-react";
import { Close } from "@mui/icons-material";
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
        <Close
          fontSize="large"
          className="icon"
          onClick={() => setModal({ component: <></>, title: null, isShown: false })}
        />
      </View>
      {modal.component}
    </Card>
  );
}

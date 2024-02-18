import { Card, View, Heading } from "@aws-amplify/ui-react";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState, useRecoilState } from "recoil";
import { modalIsShownState, modalSlotState } from "../../Functions/GlobalState";
import "./Modal.css";

export default function Modal() {
  const setIsModalShown = useSetRecoilState(modalIsShownState);
  const [modalSlot, setModalSlot] = useRecoilState(modalSlotState);

  function closeModal() {
    setIsModalShown(false);
    setModalSlot({ component: <></>, title: null });
  }

  return (
    <Card className="modal">
      <View className="banner">
        <Heading className="header" level={4}>
          {modalSlot.title}
        </Heading>
        <CloseIcon
          fontSize="large"
          className="icon"
          onClick={() => closeModal()}
        />
      </View>
      {modalSlot.component}
    </Card>
  );
}

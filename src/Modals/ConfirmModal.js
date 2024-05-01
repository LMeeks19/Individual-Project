import "./ConfirmModal.css";
import { useSetRecoilState } from "recoil";
import { View, Button, Flex, Heading } from "@aws-amplify/ui-react";
import { modalState } from "../Functions/GlobalState";

// Implementation of the Confirm Modal component

export default function ConfirmModal(props) {
  const setModal = useSetRecoilState(modalState);

  const confirm = () => {
    props.function();
    setModal({ component: <></>, title: null, isShown: false });
  };

  return (
    <View className="confirm-container">
      <Heading className="header" level={5}>
        Are you sure you want to proceed?
      </Heading>
      <Flex>
        <Button
          onClick={() =>
            setModal({ component: <></>, title: null, isShown: false })
          }
          className="button cancel"
        >
          Cancel
        </Button>
        <Button onClick={confirm} className="button confirm">
          Confirm
        </Button>
      </Flex>
    </View>
  );
}

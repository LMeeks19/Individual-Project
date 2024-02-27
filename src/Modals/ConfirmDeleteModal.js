import "./ConfirmDeleteModal.css";
import { useSetRecoilState } from "recoil";
import { View, Button, Flex, Heading } from "@aws-amplify/ui-react";
import { modalState } from "../Functions/GlobalState";

export default function ConfirmDeleteModal(props) {
  const setModal = useSetRecoilState(modalState);

  const confitmDelete = () => {
    props.deleteFunction();
    setModal({ component: <></>, title: null, isShown: false });
  };

  return (
    <View className="confirm-delete-container">
      <Heading className="header" level={5}>
        Are you sure you want to proceed? This action cannot be reversed!
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
        <Button onClick={confitmDelete} className="button delete">
          Delete
        </Button>
      </Flex>
    </View>
  );
}

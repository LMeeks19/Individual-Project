import {
  Divider,
  Input,
  Heading,
  View,
  Flex,
  Label,
  Button,
  SelectField,
} from "@aws-amplify/ui-react";
import AddIcon from "@mui/icons-material/Add";
import "./CreateProfileModal.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalIsShownState, currentUserState } from "../../State/GlobalState";
import { useState } from "react";
import { CreateProfile } from "../../State/Server";

export default function CreateProfileModal() {
  const setModalIsShown = useSetRecoilState(modalIsShownState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [newProfileInfo, setNewProfileInfo] = useState({
    id: currentUser.id,
    username: currentUser.username,
    name: null,
    dob: null,
    email: currentUser.email,
    phoneNumber: null,
    accountType: null,
    street: null,
    townCity: null,
    county: null,
    postcode: null,
  });

  async function createProfile(event) {
    event.preventDefault();
    setCurrentUser(await CreateProfile(newProfileInfo));
    setModalIsShown(false);
  }

  return (
    <View className="content" as="form" onSubmit={(e) => createProfile(e)}>
      <Heading className="card-header" level={5}>
        Profile Information
      </Heading>
      <Divider />

      <View className="input-fields">
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="name">Name:</Label>
          <Input
            name="name"
            isRequired
            onChange={(e) =>
              setNewProfileInfo({ ...newProfileInfo, name: e.target.value })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="dob">Date of Birth:</Label>
          <Input
            name="dob"
            type="date"
            isRequired
            onChange={(e) =>
              setNewProfileInfo({ ...newProfileInfo, dob: e.target.value })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="phoneNumber">Phone Number:</Label>
          <Input
            name="phoneNumber"
            isRequired
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
                phoneNumber: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="accountType">Account Type:</Label>
          <SelectField
            name="accountType"
            isRequired
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
                accountType: e.target.value,
              })
            }
          >
            <option value={null}>Please Select...</option>
            <option value="PARENT">PARENT</option>
            <option value="COACH">COACH</option>
          </SelectField>
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="street">Street:</Label>
          <Input
            name="street"
            isRequired
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
                street: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="townCity">Town/City:</Label>
          <Input
            name="townCity"
            isRequired
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
                townCity: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="county">County:</Label>
          <Input
            name="county"
            isRequired
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
                county: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="postcode">Postcode:</Label>
          <Input
            name="postcode"
            isRequired
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
                postcode: e.target.value,
              })
            }
          />
        </Flex>
      </View>

      <Button className="modal-button" type="submit">
        <AddIcon fontSize="small" className="icon" />
        Create
      </Button>
    </View>
  );
}

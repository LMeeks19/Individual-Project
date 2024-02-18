import {
  Divider,
  Input,
  Heading,
  View,
  Flex,
  Label,
  Button,
} from "@aws-amplify/ui-react";
import SaveIcon from "@mui/icons-material/Save";
import "./UpdateProfileModal.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalIsShownState, currentUserState } from "../../State/GlobalState";
import { useEffect, useState } from "react";
import { UpdateProfile } from "../../State/Server";
import { format } from "date-fns";
import "./UpdatePlayerModal.css";

export default function UpdateProfileModal() {
  const setModalIsShown = useSetRecoilState(modalIsShownState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [updatedProfileInfo, setUpdatedProfileInfo] = useState({
    id: currentUser.id,
    username: currentUser.username,
    name: currentUser.name,
    dob: currentUser.dob,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    accountType: currentUser.accountType,
    street: currentUser.street,
    townCity: currentUser.townCity,
    county: currentUser.county,
    postcode: currentUser.postcode,
  });

  async function updateProfile(event) {
    event.preventDefault();
    setCurrentUser(await UpdateProfile(updatedProfileInfo));
    setModalIsShown(false);
  }

  const [maxDateAllowed, setMaxDateAllowed] = useState("");

  useEffect(() => {
    function maxDate() {
      const dateNow = new Date();
      dateNow.setFullYear(dateNow.getFullYear() - 18);
      setMaxDateAllowed(format(dateNow, "yyyy-MM-dd"));
    }
    maxDate();
  }, []);

  return (
    <View className="content" as="form" onSubmit={(e) => updateProfile(e)}>
      <Heading className="card-header" level={5}>
        Profile Information
      </Heading>
      <Divider />

      <View className="input-fields">
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="name">Name:</Label>
          <Input
            name="name"
            defaultValue={updatedProfileInfo.name}
            onChange={(e) =>
              setUpdatedProfileInfo({
                ...updatedProfileInfo,
                name: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="dob">Date of Birth:</Label>
          <Input
            name="dob"
            defaultValue={updatedProfileInfo.dob}
            type="date"
            max={maxDateAllowed}
            onChange={(e) =>
              setUpdatedProfileInfo({
                ...updatedProfileInfo,
                dob: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="phoneNumber">Phone Number:</Label>
          <Input
            name="phoneNumber"
            defaultValue={updatedProfileInfo.phoneNumber}
            onChange={(e) =>
              setUpdatedProfileInfo({
                ...updatedProfileInfo,
                phoneNumber: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="street">Street:</Label>
          <Input
            name="street"
            defaultValue={updatedProfileInfo.street}
            onChange={(e) =>
              setUpdatedProfileInfo({
                ...updatedProfileInfo,
                street: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="townCity">Town/City:</Label>
          <Input
            name="townCity"
            defaultValue={updatedProfileInfo.townCity}
            onChange={(e) =>
              setUpdatedProfileInfo({
                ...updatedProfileInfo,
                townCity: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="county">County:</Label>
          <Input
            name="county"
            defaultValue={updatedProfileInfo.county}
            onChange={(e) =>
              setUpdatedProfileInfo({
                ...updatedProfileInfo,
                county: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="postcode">Postcode:</Label>
          <Input
            name="postcode"
            defaultValue={updatedProfileInfo.postcode}
            onChange={(e) =>
              setUpdatedProfileInfo({
                ...updatedProfileInfo,
                postcode: e.target.value,
              })
            }
          />
        </Flex>
      </View>

      <Button className="modal-button" type="submit">
        <SaveIcon fontSize="small" className="icon" />
        Save
      </Button>
    </View>
  );
}

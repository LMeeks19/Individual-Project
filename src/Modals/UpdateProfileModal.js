import {
  Divider,
  Input,
  Heading,
  View,
  Flex,
  Label,
  Button,
  Text,
} from "@aws-amplify/ui-react";
import SaveIcon from "@mui/icons-material/Save";
import "./UpdateProfileModal.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { useEffect, useState } from "react";
import { UpdateProfile } from "../../Functions/Server";
import { format } from "date-fns";
import ErrorIcon from "@mui/icons-material/Error";
import { ValidateProfileModal } from "../../Functions/Validatiion";

export default function UpdateProfileModal() {
  const setModal = useSetRecoilState(modalState);
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

  const [errors, setErrors] = useState([]);

  async function updateProfile() {
    const validationErrors = ValidateProfileModal(updatedProfileInfo);
    if (validationErrors.length > 0) setErrors(validationErrors);
    else {
      const updatedProfile = await UpdateProfile(updatedProfileInfo);
      setCurrentUser({
        ...updatedProfile,
        players: currentUser.players,
        team: currentUser.team,
      });
      setModal({ component: <></>, title: null, isShown: false });
    }
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
    <View className="content">
      <Heading className="card-header" level={5}>
        Profile Information
      </Heading>
      <Divider />

      <View className="input-fields">
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="name" fontWeight="bold">
              Player Name:
            </Label>
            {errors?.some((error) => error?.field === "name") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "name")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            autoComplete="name"
            marginTop="5px"
            id="name"
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
          <Flex justifyContent="space-between">
            <Label htmlFor="dob" fontWeight="bold">
              Date of Birth
            </Label>
            {errors?.some((error) => error?.field === "dob") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "dob")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="dob"
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
          <Flex justifyContent="space-between">
            <Label htmlFor="phoneNumber" fontWeight="bold">
              Phone Number:
            </Label>
            {errors?.some((error) => error?.field === "phoneNumber") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {
                  errors?.find((error) => error?.field === "phoneNumber")
                    ?.message
                }
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="phoneNumber"
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
          <Flex justifyContent="space-between">
            <Label htmlFor="street" fontWeight="bold">
              Street:
            </Label>
            {errors?.some((error) => error?.field === "street") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "street")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="street"
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
          <Flex justifyContent="space-between">
            <Label htmlFor="townCity" fontWeight="bold">
              Town/City:
            </Label>
            {errors?.some((error) => error?.field === "townCity") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "townCity")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="townCity"
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
          <Flex justifyContent="space-between">
            <Label htmlFor="county" fontWeight="bold">
              County:
            </Label>
            {errors?.some((error) => error?.field === "county") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "county")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="county"
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
          <Flex justifyContent="space-between">
            <Label htmlFor="postcode" fontWeight="bold">
              Postcode:
            </Label>
            {errors?.some((error) => error?.field === "postcode") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "postcode")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="postcode"
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

      <Button className="modal-button" onClick={() => updateProfile()}>
        <SaveIcon fontSize="small" className="icon" />
        Save
      </Button>
    </View>
  );
}

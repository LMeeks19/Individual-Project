import {
  Divider,
  Input,
  Heading,
  View,
  Flex,
  Label,
  Button,
  SelectField,
  Text,
} from "@aws-amplify/ui-react";
import AddIcon from "@mui/icons-material/Add";
import "./CreateProfileModal.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState, currentUserState } from "../../Functions/GlobalState";
import { useState } from "react";
import { CreateProfile } from "../../Functions/Server";
import ErrorIcon from "@mui/icons-material/Error";
import { ValidateProfileModal } from "../../Functions/Validatiion";

export default function CreateProfileModal() {
  const setModal = useSetRecoilState(modalState);
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

  const [errors, setErrors] = useState([]);

  async function createProfile() {
    const validationErrors = ValidateProfileModal(newProfileInfo);
    if (validationErrors.length > 0) setErrors(validationErrors);
    else {
      setCurrentUser(await CreateProfile(newProfileInfo));
      setModal({ component: <></>, title: null, isShown: false });
    }
  }

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
            onChange={(e) =>
              setNewProfileInfo({ ...newProfileInfo, name: e.target.value })
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
            id="dob"
            marginTop="5px"
            type="date"
            onChange={(e) =>
              setNewProfileInfo({ ...newProfileInfo, dob: e.target.value })
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
            id="phoneNumber"
            marginTop="5px"
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
                phoneNumber: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="accountType" fontWeight="bold">
              Account Type:
            </Label>
            {errors?.some((error) => error?.field === "accountType") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {
                  errors?.find((error) => error?.field === "accountType")
                    ?.message
                }
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <SelectField
            id="accountType"
            marginTop="5px"
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
            id="street"
            marginTop="5px"
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
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
            id="townCity"
            marginTop="5px"
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
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
            id="county"
            marginTop="5px"
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
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
            id="postcode"
            marginTop="5px"
            onChange={(e) =>
              setNewProfileInfo({
                ...newProfileInfo,
                postcode: e.target.value,
              })
            }
          />
        </Flex>
      </View>

      <Button className="modal-button" onClick={(e) => createProfile()}>
        <AddIcon fontSize="small" className="icon" />
        Create
      </Button>
    </View>
  );
}

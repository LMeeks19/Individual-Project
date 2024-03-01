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
  SwitchField,
  TextAreaField,
} from "@aws-amplify/ui-react";
import AddIcon from "@mui/icons-material/Add";
import "./CreateMatchPostModal.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  modalState,
  currentUserState,
  matchPostsState,
} from "../../Functions/GlobalState";
import { useState } from "react";
import { CreateMatchPost } from "../../Functions/Server";
import ErrorIcon from "@mui/icons-material/Error";
import { ValidateMatchPostModal } from "../../Functions/Validatiion";

export default function CreateMatchPostModal() {
  const setModal = useSetRecoilState(modalState);
  const currentUser = useRecoilValue(currentUserState);
  const [posts, setPosts] = useRecoilState(matchPostsState);

  const [newMatchPostInfo, setNewMatchPostInfo] = useState({
    title: null,
    description: null,
    createdByProfileID: currentUser.id,
    createdByName: currentUser.name,
    team: currentUser.team.name,
    gameType: null,
    ageGroup: null,
    teamSize: null,
    substitutionLimit: false,
    cards: true,
    halfLength: null,
    kickOff: null,
    street: null,
    townCity: null,
    county: null,
    postcode: null,
    interestedUsers: [],
    isActive: true,
  });

  const [errors, setErrors] = useState([]);

  async function createMatchPost() {
    const validationErrors = ValidateMatchPostModal(newMatchPostInfo);
    if (validationErrors.length > 0) setErrors(validationErrors);
    else {
      setPosts([...posts, await CreateMatchPost(newMatchPostInfo)]);
      setModal({ component: <></>, title: null, isShown: false });
    }
  }

  const ageGroups = [
    "U7",
    "U8",
    "U9",
    "U10",
    "U11",
    "U12",
    "U13",
    "U14",
    "U15",
    "U17",
    "U18",
    "U19",
    "U20",
    "U21",
  ];

  const teamSizes = ["5v5", "6v6", "7v7", "8v8", "9v9", "10v10", "11v11"];

  return (
    <View className="content">
      <Heading className="card-header" level={5}>
        Match Post Information
      </Heading>
      <Divider />

      <View className="input-fields">
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="title" fontWeight="bold">
              Title:
            </Label>
            {errors?.some((error) => error?.field === "title") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "title")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="title"
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
                title: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="description" fontWeight="bold">
              Description:
            </Label>
            {errors?.some((error) => error?.field === "description") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {
                  errors?.find((error) => error?.field === "description")
                    ?.message
                }
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <TextAreaField
            id="description"
            resize="vertical"
            overflow="hidden"
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
                description: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Flex alignItems="center" gap="0">
              <Label htmlFor="substitutionLimit" fontWeight="bold">
                Limit Substitutions:
              </Label>
              <SwitchField
                id="substitutionLimit"
                marginTop="5px"
                trackCheckedColor="#008080"
                isChecked={newMatchPostInfo.substitutionLimit}
                onChange={(e) =>
                  setNewMatchPostInfo({
                    ...newMatchPostInfo,
                    substitutionLimit: e.target.checked,
                  })
                }
              />
            </Flex>
            {errors?.some((error) => error?.field === "substitutionLimit") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {
                  errors?.find((error) => error?.field === "substitutionLimit")
                    ?.message
                }
              </Text>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Flex alignItems="center" gap="0">
              <Label htmlFor="cards" fontWeight="bold">
                Allow Cards:
              </Label>
              <SwitchField
                id="cards"
                marginTop="5px"
                trackCheckedColor="#008080"
                isChecked={newMatchPostInfo.cards}
                onChange={(e) =>
                  setNewMatchPostInfo({
                    ...newMatchPostInfo,
                    cards: e.target.checked,
                  })
                }
              />
            </Flex>
            {errors?.some((error) => error?.field === "cards") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "cards")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="gameType" fontWeight="bold">
              Game Type:
            </Label>
            {errors?.some((error) => error?.field === "gameType") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "gameType")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <SelectField
            id="gameType"
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
                gameType: e.target.value,
              })
            }
          >
            <option value="">Please Select...</option>
            <option value="Friendly">Friendly</option>
            <option value="League">League</option>
            <option value="Cup">Cup</option>
          </SelectField>
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="ageGroup" fontWeight="bold">
              Age Group:
            </Label>
            {errors?.some((error) => error?.field === "ageGroup") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "ageGroup")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <SelectField
            id="ageGroup"
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
                ageGroup: e.target.value,
              })
            }
          >
            <option value="">Please Select...</option>
            {ageGroups.map((ageGroup) => {
              return (
                <option key={ageGroup} value={ageGroup}>
                  {ageGroup}
                </option>
              );
            })}
          </SelectField>
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="teamSize" fontWeight="bold">
              Team Size:
            </Label>
            {errors?.some((error) => error?.field === "teamSize") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "teamSize")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <SelectField
            id="teamSize"
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
                teamSize: e.target.value,
              })
            }
          >
            <option value="">Please Select...</option>
            {teamSizes.map((ageGroup) => {
              return (
                <option key={ageGroup} value={ageGroup}>
                  {ageGroup}
                </option>
              );
            })}
          </SelectField>
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="halfLength" fontWeight="bold">
              Half Length:
            </Label>
            {errors?.some((error) => error?.field === "halfLength") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {
                  errors?.find((error) => error?.field === "halfLength")
                    ?.message
                }
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            id="halfLength"
            marginTop="5px"
            type="number"
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
                halfLength: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="kickOff" fontWeight="bold">
              Kick Off:
            </Label>
            {errors?.some((error) => error?.field === "kickOff") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "kickOff")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="kickOff"
            type="datetime-local"
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
                kickOff: e.target.value,
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
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
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
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
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
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
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
            onChange={(e) =>
              setNewMatchPostInfo({
                ...newMatchPostInfo,
                postcode: e.target.value,
              })
            }
          />
        </Flex>
      </View>

      <Button className="modal-button" onClick={() => createMatchPost()}>
        <AddIcon fontSize="small" className="icon" />
        Create
      </Button>
    </View>
  );
}

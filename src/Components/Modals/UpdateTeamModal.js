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
import SaveIcon from "@mui/icons-material/Save";
import "./UpdateTeamModal.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState, currentUserState } from "../../Functions/GlobalState";
import { useState } from "react";
import { UpdateTeam } from "../../Functions/Server";
import ErrorIcon from "@mui/icons-material/Error";
import { ValidateTeamModal } from "../../Functions/Validatiion";

export default function UpdateTeamModal() {
  const setModal = useSetRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [teamInfo, setTeamInfo] = useState({
    id: currentUser.team.items[0].id,
    profileId: currentUser.team.items[0].profileId,
    name: currentUser.team.items[0].name,
    league: currentUser.team.items[0].league,
    ageGroup: currentUser.team.items[0].ageGroup,
    location: currentUser.team.items[0].location,
    email: currentUser.team.items[0].email,
    phoneNumber: currentUser.team.items[0].phoneNumber,
    website: currentUser.team.items[0].website,
  });

  const [errors, setErrors] = useState([]);

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

  async function updateTeam() {
    const validationErrors = ValidateTeamModal(teamInfo);
    if (validationErrors.length > 0) setErrors(validationErrors);
    else {
      setCurrentUser({
        ...currentUser,
        team: { items: [await UpdateTeam(teamInfo)] },
      });
      setModal({ component: <></>, title: null, isShown: false });
    }
  }

  return (
    <View className="content">
      <Heading className="card-header" level={5}>
        Team Information
      </Heading>
      <Divider />

      <View className="input-fields">
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="name" fontWeight="bold">
              Team Name:
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
            defaultValue={teamInfo.name}
            onChange={(e) => setTeamInfo({ ...teamInfo, name: e.target.value })}
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="league" fontWeight="bold">
              League
            </Label>
            {errors?.some((error) => error?.field === "league") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "league")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            id="league"
            defaultValue={teamInfo.league}
            marginTop="5px"
            onChange={(e) =>
              setTeamInfo({ ...teamInfo, league: e.target.value })
            }
          />
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
            marginTop="5px"
            labelHidden
            padding="0"
            value={teamInfo.ageGroup}
            id="ageGroup"
            onChange={(e) =>
              setTeamInfo({
                ...teamInfo,
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
            <Label htmlFor="location" fontWeight="bold">
              Location:
            </Label>
            {errors?.some((error) => error?.field === "location") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "location")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            id="location"
            defaultValue={teamInfo.location}
            marginTop="5px"
            onChange={(e) =>
              setTeamInfo({
                ...teamInfo,
                location: e.target.value,
              })
            }
          />
        </Flex>

        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="email" fontWeight="bold">
              Email:
            </Label>
            {errors?.some((error) => error?.field === "email") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "email")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            id="email"
            defaultValue={teamInfo.email}
            marginTop="5px"
            onChange={(e) =>
              setTeamInfo({
                ...teamInfo,
                email: e.target.value,
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
            id="phoneNumber"
            defaultValue={teamInfo.phoneNumber}
            marginTop="5px"
            onChange={(e) =>
              setTeamInfo({
                ...teamInfo,
                phoneNumber: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="website" fontWeight="bold">
              Website:
            </Label>
            {errors?.some((error) => error?.field === "website") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "website")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            id="website"
            defaultValue={teamInfo.website}
            marginTop="5px"
            onChange={(e) =>
              setTeamInfo({
                ...teamInfo,
                website: e.target.value,
              })
            }
          />
        </Flex>
      </View>

      <Button className="modal-button" onClick={(e) => updateTeam()}>
        <SaveIcon fontSize="small" className="icon" />
        Save
      </Button>
    </View>
  );
}

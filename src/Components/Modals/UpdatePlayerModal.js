import {
  View,
  Heading,
  Divider,
  Flex,
  Label,
  Input,
  SelectField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Text,
} from "@aws-amplify/ui-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { UpdatePlayer } from "../../Functions/Server";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";

import { ValidatePlayerModal } from "../../Functions/Validatiion";
import "./UpdatePlayerModal.css";

export default function UpdatePlayerModal(props) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  const [playerInfo, setNewPlayerInfo] = useState({
    id: props.player.id,
    profileId: props.player.profileId,
    name: props.player.name,
    dob: props.player.dob,
    ageGroup: props.player.ageGroup,
    positions: props.player.positions,
    skillLevel: props.player.skillLevel,
  });

  const positions = ["GK", "LB", "CB", "RB", "LM", "CM", "RM", "ST"];

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

  const skillLevels = ["Beginner", "Intermediate", "Experienced"];

  function togglePosition(position) {
    if (!playerInfo.positions.includes(position)) {
      setNewPlayerInfo({
        ...playerInfo,
        positions: position,
      });
    } else {
      setNewPlayerInfo({
        ...playerInfo,
        positions: playerInfo.positions.filter((pos) => pos !== position),
      });
    }
  }

  const [errors, setErrors] = useState([]);

  async function updatePlayer() {
    const validationErrors = ValidatePlayerModal(playerInfo);
    if (validationErrors.length > 0) setErrors(validationErrors);
    else {
      let updatedPlayers = currentUser.players.items.filter(
        (player) => player.id !== playerInfo.id
      );
      updatedPlayers.push(await UpdatePlayer(playerInfo));
      setCurrentUser({
        ...currentUser,
        players: { items: updatedPlayers.sort((player) => player.name) },
      });
      setModal({ component: <></>, title: null, isShown: false });
    }
  }

  return (
    <View className="content">
      <Heading className="card-header" level={5}>
        Player Information
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
            autoComplete="off"
            marginTop="5px"
            id="name"
            defaultValue={playerInfo.name}
            onChange={(e) =>
              setNewPlayerInfo({ ...playerInfo, name: e.target.value })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="dob" fontWeight="bold">
              Date of Birth:
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
            type="date"
            placeholder="Please Select..."
            defaultValue={playerInfo.dob}
            onChange={(e) =>
              setNewPlayerInfo({ ...playerInfo, dob: e.target.value })
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
            id="ageGroup"
            value={playerInfo.ageGroup}
            onChange={(e) =>
              setNewPlayerInfo({
                ...playerInfo,
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
            <Label htmlFor="positions" fontWeight="bold">
              Positions:
            </Label>
            {errors?.some((error) => error?.field === "positions") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "positions")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <ToggleButtonGroup
            marginTop="5px"
            direction="row"
            value={playerInfo.positions}
            onChange={(value) => togglePosition(value)}
            className="positions-container"
          >
            {positions.map((position) => {
              return (
                <ToggleButton
                  id="positions"
                  key={position}
                  value={position}
                  isFullWidth
                >
                  {position}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Flex>

        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="skillLevel" fontWeight="bold">
              Skill Level:
            </Label>
            {errors?.some((error) => error?.field === "skillLevel") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {
                  errors?.find((error) => error?.field === "skillLevel")
                    ?.message
                }
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <SelectField
            marginTop="5px"
            labelHidden
            id="skillLevel"
            value={playerInfo.skillLevel}
            onChange={(e) =>
              setNewPlayerInfo({
                ...playerInfo,
                skillLevel: e.target.value,
              })
            }
          >
            <option value="">Please Select...</option>
            {skillLevels.map((skillLevel) => {
              return (
                <option key={skillLevel} value={skillLevel}>
                  {skillLevel}
                </option>
              );
            })}
          </SelectField>
        </Flex>

        <Button className="modal-button" onClick={(e) => updatePlayer()}>
          <AddIcon fontSize="small" className="icon" />
          Save
        </Button>
      </View>
    </View>
  );
}

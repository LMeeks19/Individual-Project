import {
  View,
  Heading,
  Divider,
  Flex,
  Label,
  Input,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Text,
} from "@aws-amplify/ui-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { UpdateTeamPlayer } from "../../Functions/Server";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import "./AddTeamPlayerModal.css";
import { ValidateTeamPlayerModal } from "../../Functions/Validatiion";
import ErrorIcon from "@mui/icons-material/Error";

export default function UpdateTeamPlayerModal(props) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  const [teamPlayerInfo, setTeamPlayerInfo] = useState({
    id: props.teamPlayer.id,
    name: props.teamPlayer.name,
    age: props.teamPlayer.age,
    kitNumber: props.teamPlayer.kitNumber,
    positions: props.teamPlayer.positions,
  });

  const positions = ["GK", "LB", "CB", "RB", "LM", "CM", "RM", "ST"];

  function togglePosition(position) {
    if (!teamPlayerInfo.positions.includes(position)) {
      setTeamPlayerInfo({
        ...teamPlayerInfo,
        positions: position,
      });
    } else {
      setTeamPlayerInfo({
        ...teamPlayerInfo,
        positions: teamPlayerInfo.positions.filter((pos) => pos !== position),
      });
    }
  }

  const [errors, setErrors] = useState([]);

  async function updateTeamPlayer() {
    const validationErrors = ValidateTeamPlayerModal(teamPlayerInfo);
    if (validationErrors.length > 0) setErrors(validationErrors);
    else {
      let updatedTeamPlayers = currentUser.players.filter(
        (teamPlayer) => teamPlayer.id !== teamPlayerInfo.id
      );
      updatedTeamPlayers.push(await UpdateTeamPlayer(teamPlayerInfo));
      setCurrentUser({
        ...currentUser,
        team: {
          ...currentUser.team,
          players: updatedTeamPlayers.sort((teamPlayer) => teamPlayer.name),
        },
      });
      setModal({ component: <></>, title: null, isShown: false });
    }
  }

  return (
    <View className="content">
      <Heading className="card-header" level={5}>
        Team Player Information
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
            defaultValue={teamPlayerInfo.name}
            onChange={(e) =>
              setTeamPlayerInfo({
                ...teamPlayerInfo,
                name: e.target.value,
              })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="age" fontWeight="bold">
              Age
            </Label>
            {errors?.some((error) => error?.field === "age") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "age")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="age"
            defaultValue={teamPlayerInfo.age}
            type="number"
            onChange={(e) =>
              setTeamPlayerInfo({
                ...teamPlayerInfo,
                age: e.target.value,
              })
            }
          />
        </Flex>

        <Flex direction="column" marginBottom="10px" gap="0">
          <Flex justifyContent="space-between">
            <Label htmlFor="kitNumber" fontWeight="bold">
              Kit Number
            </Label>
            {errors?.some((error) => error?.field === "kitNumber") ? (
              <Text className="error-message">
                <ErrorIcon fontSize="small" />
                {errors?.find((error) => error?.field === "kitNumber")?.message}
              </Text>
            ) : (
              <></>
            )}
          </Flex>
          <Input
            marginTop="5px"
            id="kitNumber"
            defaultValue={teamPlayerInfo.kitNumber}
            type="number"
            onChange={(e) =>
              setTeamPlayerInfo({
                ...teamPlayerInfo,
                kitNumber: e.target.value,
              })
            }
          />
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
            value={teamPlayerInfo.positions}
            onChange={(value) => togglePosition(value)}
            className="positions-container"
          >
            {positions.map((position) => {
              return (
                <ToggleButton
                  id="positions"
                  className="positions"
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

        <Button className="modal-button" onClick={(e) => updateTeamPlayer()}>
          <SaveIcon fontSize="small" className="icon" />
          Save
        </Button>
      </View>
    </View>
  );
}

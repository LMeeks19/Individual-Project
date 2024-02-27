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
import { CreateTeamPlayer } from "../../Functions/Server";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./AddTeamPlayerModal.css";
import { ValidateTeamPlayerModal } from "../../Functions/Validatiion";
import ErrorIcon from "@mui/icons-material/Error";

export default function AddTeamPlayerModal(props) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  const [newTeamPlayerInfo, setNewTeamPlayerInfo] = useState({
    teamId: props.team.id,
    name: null,
    age: null,
    kitNumber: null,
    positions: [],
  });

  const positions = ["GK", "LB", "CB", "RB", "LM", "CM", "RM", "ST"];

  function togglePosition(position) {
    if (!newTeamPlayerInfo.positions.includes(position)) {
      setNewTeamPlayerInfo({
        ...newTeamPlayerInfo,
        positions: position,
      });
    } else {
      setNewTeamPlayerInfo({
        ...newTeamPlayerInfo,
        positions: newTeamPlayerInfo.positions.filter(
          (pos) => pos !== position
        ),
      });
    }
  }

  const [errors, setErrors] = useState([]);

  async function addTeamPlayer() {
    const validationErrors = ValidateTeamPlayerModal(newTeamPlayerInfo);
    if (validationErrors.length > 0) setErrors(validationErrors);
    else {
      const newTeamPlayer = await CreateTeamPlayer(newTeamPlayerInfo);
      setCurrentUser({
        ...currentUser,
        team: {
          ...currentUser.team,
          players: [...currentUser.team.players, newTeamPlayer],
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
            onChange={(e) =>
              setNewTeamPlayerInfo({
                ...newTeamPlayerInfo,
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
            type="number"
            onChange={(e) =>
              setNewTeamPlayerInfo({
                ...newTeamPlayerInfo,
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
            type="number"
            onChange={(e) =>
              setNewTeamPlayerInfo({
                ...newTeamPlayerInfo,
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
            value={newTeamPlayerInfo.positions}
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

        <Button className="modal-button" onClick={(e) => addTeamPlayer()}>
          <AddIcon fontSize="small" className="icon" />
          Add
        </Button>
      </View>
    </View>
  );
}

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
} from "@aws-amplify/ui-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  usersRegisteredPlayersState,
  modalIsShownState,
  modalSlotState,
} from "../../State/GlobalState";
import { GetCurrentUsersPlayers, UpdatePlayer } from "../../State/Server";
import {useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "./AddPlayerModal.css";

export default function UpdatePlayerModal(props) {
  const [usersPlayers, setUsersPlayers] = useRecoilState(
    usersRegisteredPlayersState
  );
  const setModalIsShown = useSetRecoilState(modalIsShownState);
  const setModalSlot = useSetRecoilState(modalSlotState);

  const [playerInfo, setNewPlayerInfo] = useState({
    id: props.player.id,
    profileId: props.player.profileId,
    name: props.player.name,
    dob: props.player.dob,
    ageGroup: props.player.ageGroup,
    positions: props.player.positions,
    skillLevel: props.player.skillLevel,
  });

  const positions = [
    "GK",
    "LB",
    "CB",
    "RB",
    "LM",
    "CDM",
    "CM",
    "CAM",
    "RM",
    "LW",
    "RW",
    "CF",
    "ST",
  ];

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

  async function updatePlayer(event) {
    event.preventDefault();
    const newPlayer = await UpdatePlayer(playerInfo);
    setUsersPlayers(await GetCurrentUsersPlayers(newPlayer.profileId));
    setModalIsShown(false);
    setModalSlot(false);
  }

  return (
    <View className="content">
      <Heading className="card-header" level={5}>
        Player Information
      </Heading>
      <Divider />

      <View className="input-fields">
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="name">Player Name:</Label>
          <Input
            marginTop="5px"
            name="name"
            defaultValue={playerInfo.name}
            onChange={(e) =>
              setNewPlayerInfo({ ...playerInfo, name: e.target.value })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="dob">Date of Birth:</Label>
          <Input
            marginTop="5px"
            name="dob"
            type="date"
            defaultValue={playerInfo.dob}
            onChange={(e) =>
              setNewPlayerInfo({ ...playerInfo, dob: e.target.value })
            }
          />
        </Flex>

        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="ageGroup">Age Group:</Label>
          <SelectField
            marginTop="5px"
            labelHidden
            padding="0"
            name="ageGroup"
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
          <Label htmlFor="positions">Positions:</Label>
          <ToggleButtonGroup
            marginTop="5px"
            name="positions"
            direction="row"
            value={playerInfo.positions}
            onChange={(value) => togglePosition(value)}
          >
            {positions.map((position) => {
              return (
                <ToggleButton key={position} value={position} isFullWidth>
                  {position}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Flex>

        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="skillLevel">Skill Level:</Label>
          <SelectField
            marginTop="5px"
            labelHidden
            name="skillLevel"
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

        <Button className="modal-button" onClick={(e) => updatePlayer(e)}>
          <AddIcon fontSize="small" className="icon" />
          Save
        </Button>
      </View>
    </View>
  );
}

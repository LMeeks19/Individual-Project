import {
  View,
  Heading,
  Divider,
  Flex,
  Label,
  Input,
  SelectField,
  Autocomplete,
  Badge,
  Text,
  Button,
} from "@aws-amplify/ui-react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserState,
  usersRegisteredPlayersState,
  modalIsShownState,
  modalSlotState,
} from "../../State/GlobalState";
import { CreatePlayer } from "../../State/Server";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export default function AddPlayerModal() {
  const currentUser = useRecoilValue(currentUserState);
  const [usersPlayers, setUsersPlayers] = useRecoilState(
    usersRegisteredPlayersState
  );
  const setModalIsShown = useSetRecoilState(modalIsShownState);
  const setModalSlot = useSetRecoilState(modalSlotState);

  const [newPlayerInfo, setNewPlayerInfo] = useState({
    profileId: currentUser.id,
    name: null,
    dob: null,
    ageGroup: null,
    positions: [],
    skillLevel: null,
  });

  async function addPlayer(event) {
    event.preventDefault();
    const newPlayer = await CreatePlayer(newPlayerInfo);
    setUsersPlayers([...usersPlayers, newPlayer]);
    setModalIsShown(false);
    setModalSlot(false);
  }

  const [positions, setPositions] = useState([
    { label: "GK" },
    { label: "LB" },
    { label: "CB" },
    { label: "RB" },
    { label: "LM" },
    { label: "CM" },
    { label: "RM" },
    { label: "ST" },
  ]);

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

  function addPlayerPosition(option) {
    setNewPlayerInfo({
      ...newPlayerInfo,
      positions: [...newPlayerInfo.positions, option],
    });
    setPositions(positions.filter((pos) => pos.label !== option));
  }

  function removePlayerPosition(option) {
    setPositions([...positions, { label: option }]);
    setNewPlayerInfo({
      ...newPlayerInfo,
      positions: newPlayerInfo.positions.filter((pos) => pos !== option),
    });
  }

  return (
    <View className="content" as="form" onSubmit={(e) => addPlayer(e)}>
      <Heading className="card-header" level={5}>
        Player Information
      </Heading>
      <Divider />

      <View className="input-fields">
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="name">Name:</Label>
          <Input
            name="name"
            isRequired
            onChange={(e) =>
              setNewPlayerInfo({ ...newPlayerInfo, name: e.target.value })
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
              setNewPlayerInfo({ ...newPlayerInfo, dob: e.target.value })
            }
          />
        </Flex>
        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="ageGroup">Age Group:</Label>
          <SelectField
            name="ageGroup"
            isRequired
            onChange={(e) =>
              setNewPlayerInfo({
                ...newPlayerInfo,
                ageGroup: e.target.value,
              })
            }
          >
            <option value={null}>Please Select...</option>
            {ageGroups.map((ageGroup) => {
              return <option value={ageGroup}>{ageGroup}</option>;
            })}
          </SelectField>
        </Flex>

        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="positions">Positions:</Label>
          <Text name="positions">
            <Autocomplete
              name="positions"
              options={positions}
              hasSearchIcon={false}
              onSelect={(option) => addPlayerPosition(option.label)}
            />
          </Text>
        </Flex>

        <Flex direction="row">
          {newPlayerInfo.positions.map((newPlayerPos) => {
            return (
              <Badge
                backgroundColor="#008080"
                marginBottom="5px"
                key={newPlayerPos}
              >
                <Text marginTop="auto" marginBottom="auto" marginRight="5px">
                  {newPlayerPos}
                </Text>
                <View onClick={() => removePlayerPosition(newPlayerPos)}>
                  <CloseIcon cursor="pointer" fontSize="small" />
                </View>
              </Badge>
            );
          })}
        </Flex>

        <Flex direction="column" marginBottom="10px" gap="0">
          <Label htmlFor="skillLevel">Skill LeveL:</Label>
          <SelectField
            name="skillLevel"
            isRequired
            onChange={(e) =>
              setNewPlayerInfo({
                ...newPlayerInfo,
                skillLevel: e.target.value,
              })
            }
          >
            <option value={null}>Please Select...</option>
            {skillLevels.map((skillLevel) => {
              return <option value={skillLevel}>{skillLevel}</option>;
            })}
          </SelectField>
        </Flex>

        <Button className="modal-button" type="submit">
          <AddIcon fontSize="small" className="icon" />
          Add
        </Button>
      </View>
    </View>
  );
}

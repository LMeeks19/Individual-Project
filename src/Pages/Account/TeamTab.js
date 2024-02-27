import {
  Flex,
  Card,
  Heading,
  Text,
  Badge,
  Divider,
  View,
} from "@aws-amplify/ui-react";
import "./Account.css";
import { Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteTeamPlayer } from "../../Functions/Server";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { useRecoilState, useSetRecoilState } from "recoil";
import UpdateTeamPlayerModal from "../../Modals/AccountModals/UpdateTeamPlayerModal";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";

export function TeamDetails(props) {
  return (
    <View>
      {props.team.id !== undefined ? (
        <Flex className="details-card" wrap="wrap" gap="0">
          <Card className="crest">
            <Avatar variant="square" sx={{ width: "100%", height: "100%" }} />
          </Card>
          <Flex className="info-container">
            <View className="team-info">
              <Heading className="header" level={4}>
                Team Information
              </Heading>
              <Divider />
              <View className="info">
                <Text className="text">Name: {props.team.name}</Text>
                <Text className="text">League: {props.team.league}</Text>
                <Text className="text">Age Group: {props.team.ageGroup}</Text>
                <Text className="text">Location: {props.team.location}</Text>
              </View>
            </View>
            <View className="coach-info">
              <Heading className="header" level={4}>
                Contact Information
              </Heading>
              <Divider />
              <View className="info">
                <Text className="text">Email: {props.team.email}</Text>
                <Text className="text">
                  Phone Nmuber: {props.team.phoneNumber}
                </Text>
                <Text className="text">
                  Website:{" "}
                  <a target="_blank" rel="noreferrer" href={props.team.website}>
                    {props.team.website}
                  </a>
                </Text>
              </View>
            </View>
          </Flex>
        </Flex>
      ) : (
        <View
          marginTop="20px"
          marginBottom="20px"
          textAlign="center"
          backgroundColor="#008080"
          padding="15px"
          width="100%"
          borderRadius="15px"
          boxShadow="0 0 20px -4px #000"
        >
          <Text>No Team</Text>
        </View>
      )}
    </View>
  );
}

export function TeamRoster(props) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  async function deleteTeamPlayer(id) {
    const deletedId = await DeleteTeamPlayer(id);
    setCurrentUser({
      ...currentUser,
      team: {
        ...currentUser.team,
        players: currentUser.team.players.filter(
          (player) => player.id !== deletedId
        ),
      },
    });
  }

  return (
    <View>
      {currentUser.team.id !== undefined &&
      currentUser.team.players.length !== 0 ? (
        <Flex marginTop="20px" wrap="wrap">
          {props.players?.map((player) => {
            return (
              <Card key={player.id} className="card">
                <Card className="avatar-container">
                  <Avatar
                    variant="square"
                    sx={{ width: "100%", height: "100%" }}
                  />
                </Card>
                <Card className="details">
                  <Heading className="header" color="#fff" level={4}>
                    <Text>{player.name}</Text>
                    <Flex className="icons">
                      <EditIcon
                        className="icon"
                        onClick={() =>
                          openModal(
                            <UpdateTeamPlayerModal teamPlayer={player} />,
                            "Update Team Player"
                          )
                        }
                      />
                      <DeleteIcon
                        className="icon"
                        htmlColor="red"
                        onClick={() => openModal(<ConfirmDeleteModal deleteFunction={() => deleteTeamPlayer(player.id)} />, "Confirm Delete Team Player")}
                      />
                    </Flex>
                  </Heading>
                  <Text color="#fff">Age: {player.age}</Text>
                  <Text color="#fff">Number: {player.kitNumber}</Text>
                  <Flex wrap="wrap" gap="0">
                    <Text marginRight="4px" as="div" color="#fff">
                      Positions:
                    </Text>
                    {player.positions.map((position) => {
                      return (
                        <Badge
                          key={position}
                          marginRight="4px"
                          color="#fff"
                          backgroundColor="#404040"
                        >
                          {position}
                        </Badge>
                      );
                    })}
                  </Flex>
                </Card>
              </Card>
            );
          })}
        </Flex>
      ) : (
        <View
          marginTop="20px"
          textAlign="center"
          backgroundColor="#008080"
          padding="15px"
          width="100%"
          borderRadius="15px"
          boxShadow="0 0 20px -4px #000"
        >
          <Text>No Players</Text>
        </View>
      )}
    </View>
  );
}

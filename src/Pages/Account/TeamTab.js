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
import { Edit, Delete } from "@mui/icons-material";
import { DeleteTeamPlayer } from "../../Functions/Server";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { useRecoilState, useSetRecoilState } from "recoil";
import UpdateTeamPlayerModal from "../../Modals/AccountModals/UpdateTeamPlayerModal";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";

// This component is displayed when viewing the team tab on the accounts page it allows user to create a team to their account

export function TeamDetails(props) {
  return (
    <View>
      {props.team.id !== null ? (
        <Flex className="details-card" wrap="wrap" gap="0">
          <Flex className="info-container">
            <View className="team-info">
              <Heading className="header" level={4}>
                Team Information
              </Heading>
              <Divider />
              <View className="info">
                <Text className="text">Name: {props.team.name ?? "N/A"}</Text>
                <Text className="text">
                  League: {props.team.league ?? "N/A"}
                </Text>
                <Text className="text">
                  Age Group: {props.team.ageGroup ?? "N/A"}
                </Text>
                <Text className="text">
                  Location: {props.team.location ?? "N/A"}
                </Text>
              </View>
            </View>
            <View className="coach-info">
              <Heading className="header" level={4}>
                Contact Information
              </Heading>
              <Divider />
              <View className="info">
                <Text className="text">Email: {props.team.email ?? "N/A"}</Text>
                <Text className="text">
                  Phone Nmuber: {props.team.phoneNumber ?? "N/A"}
                </Text>
                <Text className="text">
                  Website:{" "}
                  {props.team.website !== null ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={props.team.website}
                    >
                      {props.team.website}
                    </a>
                  ) : (
                    "N/A"
                  )}
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

  async function deleteTeamPlayer(teamPlayer) {
    const deletedId = await DeleteTeamPlayer(teamPlayer);
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
      {currentUser.team.id !== null && currentUser.team.players.length !== 0 ? (
        <Flex marginTop="20px" wrap="wrap">
          {props.players?.map((player) => {
            return (
              <Card key={player.id} className="card">
                <Card className="details">
                  <Heading className="header" color="#f7f5ef" level={4}>
                    <Text>{player.name}</Text>
                    <Flex className="icons">
                      <Edit
                        className="icon"
                        onClick={() =>
                          openModal(
                            <UpdateTeamPlayerModal teamPlayer={player} />,
                            "Update Team Player"
                          )
                        }
                      />
                      <Delete
                        className="icon"
                        htmlColor="red"
                        onClick={() =>
                          openModal(
                            <ConfirmDeleteModal
                              deleteFunction={() => deleteTeamPlayer(player)}
                            />,
                            "Confirm Delete Team Player"
                          )
                        }
                      />
                    </Flex>
                  </Heading>
                  <Text color="#f7f5ef">Age: {player.age}</Text>
                  <Text color="#f7f5ef">Number: {player.kitNumber}</Text>
                  <Flex wrap="wrap" gap="0">
                    <Text marginRight="4px" as="div" color="#f7f5ef">
                      Positions:
                    </Text>
                    {player.positions.map((position) => {
                      return (
                        <Badge
                          key={position}
                          marginRight="4px"
                          color="#f7f5ef"
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

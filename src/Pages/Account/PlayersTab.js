import { useRecoilState, useSetRecoilState } from "recoil";
import "./Account.css";
import { modalState, currentUserState } from "../../Functions/GlobalState";
import { Card, View, Heading, Flex, Text, Badge } from "@aws-amplify/ui-react";

import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
  Edit,
} from "@mui/icons-material";
import { DeletePlayer } from "../../Functions/Server";
import UpdatePlayerModal from "../../Modals/AccountModals/UpdatePlayerModal";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";
import { formatDate } from "../../Functions/FormatDate";

export default function ViewRegisteredPlayers() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  function updateIsShown(registeredPlayerId) {
    let updatedList = [...currentUser.players].map((item) => {
      if (item.id === registeredPlayerId)
        return { ...item, isShown: !item.isShown };
      else return item;
    });

    setCurrentUser({
      ...currentUser,
      players: updatedList,
    });
  }

  async function deletePlayer(player) {
    const deletedId = await DeletePlayer(player);
    setCurrentUser({
      ...currentUser,
      players: currentUser.players.filter((player) => player.id !== deletedId),
    });
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <View>
      {currentUser.players.length === 0 ? (
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
      ) : (
        <View>
          {currentUser.players.map((player) => {
            return (
              <Card
                className={`registered-player-card ${
                  player.isShown ? "show" : ""
                }`}
                key={player.id}
              >
                <Flex
                  className="registered-player-heading"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Heading className="header" level={5}>
                    {player.name}
                  </Heading>
                  <Flex direction="row">
                    <Text>
                      <Edit
                        className="icon-button"
                        onClick={() =>
                          openModal(
                            <UpdatePlayerModal player={player} />,
                            "Update Player"
                          )
                        }
                      />
                    </Text>
                    <Text>
                      <Delete
                        className="icon-button delete"
                        onClick={() =>
                          openModal(
                            <ConfirmDeleteModal
                              deleteFunction={() =>
                                deletePlayer(player)
                              }
                            />,
                            "Confirm Delete Player"
                          )
                        }
                      />
                    </Text>
                    <Text>
                      {player.isShown ? (
                        <KeyboardArrowUp
                          className="icon-button"
                          onClick={() => updateIsShown(player.id)}
                        />
                      ) : (
                        <KeyboardArrowDown
                          className="icon-button"
                          onClick={() => updateIsShown(player.id)}
                        />
                      )}
                    </Text>
                  </Flex>
                </Flex>
                <View className="info">
                  <Text className="text">Name: {player.name}</Text>
                  <Text className="text">
                    Date of Birth: {formatDate(player.dob)}
                  </Text>
                  <Text className="text">
                    Age Group: {player.ageGroup}
                  </Text>
                  <Flex className="text">
                    <Text>Positions:</Text>
                    {player.positions.map((position) => {
                      return (
                        <Badge className="position-badge" key={position}>
                          {position}
                        </Badge>
                      );
                    })}
                  </Flex>
                  <Text className="text">
                    Skill Level: {player.skillLevel}
                  </Text>
                </View>
              </Card>
            );
          })}
        </View>
      )}
    </View>
  );
}

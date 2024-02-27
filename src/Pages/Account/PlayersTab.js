import { useRecoilState, useSetRecoilState } from "recoil";
import "./Account.css";
import { modalState, currentUserState } from "../../Functions/GlobalState";
import { Card, View, Heading, Flex, Text, Badge } from "@aws-amplify/ui-react";
import { format } from "date-fns";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeletePlayer } from "../../Functions/Server";
import UpdatePlayerModal from "../../Modals/AccountModals/UpdatePlayerModal";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";

export default function ViewRegisteredPlayers() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  function formatDate(date) {
    return format(new Date(date), "do MMMM yyyy");
  }

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

  async function deletePlayer(playerId) {
    const deletedId = await DeletePlayer(playerId);
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
          {currentUser.players.map((registeredPlayer) => {
            return (
              <Card
                className={`registered-player-card ${
                  registeredPlayer.isShown ? "show" : ""
                }`}
                key={registeredPlayer.id}
              >
                <Flex
                  className="registered-player-heading"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Heading className="header" level={5}>
                    {registeredPlayer.name}
                  </Heading>
                  <Flex direction="row">
                    <Text>
                      <EditIcon
                        className="icon-button"
                        onClick={() =>
                          openModal(
                            <UpdatePlayerModal player={registeredPlayer} />,
                            "Update Player"
                          )
                        }
                      />
                    </Text>
                    <Text>
                      <DeleteIcon
                        className="icon-button delete"
                        onClick={() =>
                          openModal(
                            <ConfirmDeleteModal
                              deleteFunction={() =>
                                deletePlayer(registeredPlayer.id)
                              }
                            />,
                            "Confirm Delete Player"
                          )
                        }
                      />
                    </Text>
                    <Text>
                      {registeredPlayer.isShown ? (
                        <KeyboardArrowUpIcon
                          className="icon-button"
                          onClick={() => updateIsShown(registeredPlayer.id)}
                        />
                      ) : (
                        <KeyboardArrowDownIcon
                          className="icon-button"
                          onClick={() => updateIsShown(registeredPlayer.id)}
                        />
                      )}
                    </Text>
                  </Flex>
                </Flex>
                <View className="info">
                  <Text className="text">Name: {registeredPlayer.name}</Text>
                  <Text className="text">
                    Date of Birth: {formatDate(registeredPlayer.dob)}
                  </Text>
                  <Text className="text">
                    Age Group: {registeredPlayer.ageGroup}
                  </Text>
                  <Flex className="text">
                    <Text>Positions:</Text>
                    {registeredPlayer.positions.map((position) => {
                      return (
                        <Badge className="position-badge" key={position}>
                          {position}
                        </Badge>
                      );
                    })}
                  </Flex>
                  <Text className="text">
                    Skill Level: {registeredPlayer.skillLevel}
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

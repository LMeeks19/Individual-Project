import { useRecoilState } from "recoil";
import "./Account.css";
import { usersRegisteredPlayersState } from "../../State/GlobalState";
import { Card, View, Heading, Flex, Text, Badge } from "@aws-amplify/ui-react";
import { format } from "date-fns";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeletePlayer } from "../../State/Server";

export default function ViewRegisteredPlayers() {
  const [usersRegisteredPlayers, setUsersRegisteredPlayers] = useRecoilState(
    usersRegisteredPlayersState
  );

  function formatDate(date) {
    return format(new Date(date), "do MMMM yyyy");
  }

  function updateIsShown(registeredPlayerId) {
    let updatedList = [...usersRegisteredPlayers].map((item) => {
      if (item.id === registeredPlayerId)
        return { ...item, isShown: !item.isShown };
      else return item;
    });

    setUsersRegisteredPlayers(updatedList);
  }

  async function deletePlayer(playerId) {
    await DeletePlayer(playerId);
    setUsersRegisteredPlayers(
      usersRegisteredPlayers.filter((player) => player.id !== playerId)
    );
  }

  return (
    <View>
      {usersRegisteredPlayers.length === 0 ? (
        <Card className="registered-player-card">
          <View className="registered-player-heading">
            <Heading textAlign="center" className="header" level={5}>
              No Registered Players
            </Heading>
          </View>
        </Card>
      ) : (
        <View>
          {usersRegisteredPlayers.map((registeredPlayer) => {
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
                        onClick={() => deletePlayer(registeredPlayer.id)}
                      />
                    </Text>
                    <Text>
                      <DeleteIcon
                        className="icon-button"
                        onClick={() => deletePlayer(registeredPlayer.id)}
                      />
                    </Text>
                    <Text display="flex" alignItems="center">
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

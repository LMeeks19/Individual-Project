import {
  Flex,
  Card,
  Heading,
  Text,
  Badge,
  Divider,
  View,
} from "@aws-amplify/ui-react";
import "./TeamTables.css";
import { Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function TeamDetails(props) {
  return (
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
            <Text className="text">
              League: {props.team.league}
            </Text>
            <Text className="text">
              Age Group: {props.team.ageGroup}
            </Text>
            <Text className="text">
              Location: {props.team.location}
            </Text>
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
              <a
                target="_blank"
                rel="noreferrer"
                href={props.team.website}
              >
                {props.team.website}
              </a>
            </Text>
          </View>
        </View>
      </Flex>
    </Flex>
  );
}

export function TeamRoster(props) {
  return (
    <Flex marginTop="20px" wrap="wrap">
      {props.players.map((player) => {
        <Card key={player.id} className="card">
          <Card className="avatar-container">
            <Avatar variant="square" sx={{ width: "100%", height: "100%" }} />
          </Card>
          <Card className="details">
            <Heading className="header" color="#fff" level={4}>
              <Text>{player.name}</Text>
              <Flex className="icons">
                <EditIcon className="icon" />
                <DeleteIcon className="icon" htmlColor="red" />
              </Flex>
            </Heading>
            <Text color="#fff">Age: {player.age}</Text>
            <Text color="#fff">Number: {player.kitNumber}</Text>
            <Flex wrap="wrap" gap="0">
              <Text marginRight="4px" as="div" color="#fff">
                Positions:
              </Text>
              {player.positions.map((position) => {
                <Badge
                  key={position}
                  marginRight="4px"
                  color="#fff"
                  backgroundColor="#404040"
                >
                  {position}
                </Badge>;
              })}
            </Flex>
          </Card>
        </Card>;
      })}
    </Flex>
  );
}

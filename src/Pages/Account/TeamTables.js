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
            <Text className="text">Name:</Text>
            <Text className="text">League:</Text>
            <Text className="text">Age Group:</Text>
            <Text className="text">Location:</Text>
            <Text className="text">Website:</Text>
          </View>
        </View>
        <View className="coach-info">
          <Heading className="header" level={4}>
            Coach Information
          </Heading>
          <Divider />
          <View className="info">
            <Text className="text">Name:</Text>
            <Text className="text">Email:</Text>
            <Text className="text">Phone Nmuber:</Text>
          </View>
        </View>
      </Flex>
    </Flex>
  );
}

export function TeamRoster(props) {
  return (
    <Flex marginTop="20px" wrap="wrap">
      <Card className="card">
        <Card className="avatar-container">
          <Avatar variant="square" sx={{ width: "100%", height: "100%" }} />
        </Card>
        <Card className="details">
          <Heading className="header" color="#fff" level={4}>
            <Text>Louie Meeks</Text>
            <Flex className="icons">
              <EditIcon className="icon" />
              <DeleteIcon className="icon" htmlColor="red" />
            </Flex>
          </Heading>
          <Text color="#fff">Age: 21</Text>
          <Text color="#fff">Number: 10</Text>
          <Flex wrap="wrap" gap="0">
            <Text marginRight="4px" as="div" color="#fff">
              Positions:
            </Text>
            <Badge marginRight="4px" color="#fff" backgroundColor="#404040">
              GK
            </Badge>
          </Flex>
        </Card>
      </Card>
    </Flex>
  );
}

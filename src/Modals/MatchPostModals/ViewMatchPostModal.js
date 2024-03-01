import { Divider, Flex, Heading, Text, View } from "@aws-amplify/ui-react";
import { format } from "date-fns";
import "./ViewMatchPostModal.css";

export default function ViewMatchPostModal(props) {
  function formatDate(date) {
    return format(new Date(date), "do MMMM yyyy H:mm a");
  }

  return (
    <View className="content">
      <Flex direction="row" justifyContent="space-around" gap="80px">
        <Flex width="50%" direction="column">
          <Heading level={4}>Post Details</Heading>
          <Divider />
          <Text>
            <b>Title:</b> {props.post.title}
          </Text>
          <Text>
            <b>CreatedBy:</b> {props.post.createdByName}
          </Text>
          <Text>
            <b>Created On:</b> {formatDate(props.post.createdAt)}
          </Text>
          {props.post.updatedAt !== props.post.createdAt ? <Text>
            <b>Last Updated On:</b> {formatDate(props.post.updatedAt)}
          </Text> : <></>}
          <Text>
            <b>Description:</b> {props.post.description}
          </Text>
        </Flex>
        <Flex width="50%" direction="column">
          <Heading level={4}>
            <b>Match Details</b>
          </Heading>
          <Divider />
          <Text>
            <b>Team:</b> {props.post.teamName}
          </Text>
          <Text>
            <b>Game Type:</b> {props.post.gameType}
          </Text>
          <Text>
            <b>Age Group:</b> {props.post.ageGroup}
          </Text>
          <Text>
            <b>Team Size:</b> {props.post.teamSize} a side
          </Text>
          <Text>
            <b>Limit Substitutions:</b> {props.post.substitutionLimit ? 'Yes' : 'No'}
          </Text>
          <Text>
            <b>Cards:</b> {props.post.cards ? 'Yes' : 'No'}
          </Text>
          <Text>
            <b>Half Length:</b> {props.post.halfLength} minutes 
          </Text>
          <Text>
            <b>Kick Off:</b> {formatDate(props.post.kickOff)}
          </Text>
          <Text>
            <b>Venue:</b> {props.post.street}, {props.post.townCity}, {props.post.county}, {props.post.postcode}
          </Text>
        </Flex>
      </Flex>
    </View>
  );
}

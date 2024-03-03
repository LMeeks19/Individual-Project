import {
  Flex,
  Heading,
  View,
  Text,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Chats.css";

export default function Chats() {
  return (
    <Flex height="100%" gap="0">
      <Flex className="chat-container-1" direction="column">
        <Text as="div" className="chat-title">
          <Heading level={3}>Chats</Heading>
          <AddCircleIcon className="icon" fontSize="large" />
        </Text>
        <View className="chat-list">
          <Flex className="chat-tile">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
          <Flex className="chat-tile">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
          <Flex className="chat-tile">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
          <Flex className="chat-tile">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
          <Flex className="chat-tile selected">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
          <Flex className="chat-tile">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
          <Flex className="chat-tile">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
          <Flex className="chat-tile">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
          <Flex className="chat-tile">
            <Flex direction="column" gap="0">
              <Heading level={4}>Louie Meeks</Heading>
              <Text>louiemeeks@icloud.com</Text>
            </Flex>
            <DeleteIcon className="icon delete" />
          </Flex>
        </View>
      </Flex>
      <Flex className="chat-container-2" direction="column">
        <View className="chat-current">
          <Text as="div">
            <Heading level={3}>Louie Meeks</Heading>
          </Text>
        </View>
        <View className="chat-log">
          <View className="chat-bubble sender">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          </View>
          <View className="chat-bubble sender">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          </View>
          <View className="chat-bubble reciever">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          </View>
          <View className="chat-bubble sender">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          </View>
          <View className="chat-bubble sender">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            scelerisque porta libero non ultrices. Mauris eget pellentesque
            erat. Pellentesque justo eros, ornare ut dictum a, congue in tortor.
            Vivamus ultricies magna ut urna congue dignissim. Etiam orci tellus,
            luctus ultrices nisi eget, vehicula pretium libero. Morbi tincidunt
            lacus id tincidunt laoreet. Sed rutrum rhoncus
          </View>
          <View className="chat-bubble reciever">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            scelerisque porta libero non ultrices. Mauris eget pellentesque
            erat. Pellentesque justo eros, ornare ut dictum a, congue in tortor.
          </View>
          <View className="chat-bubble sender">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            scelerisque porta libero non ultrices. Mauris eget pellentesque
            erat. Pellentesque justo eros, ornare ut dictum a, congue in tortor.
            Vivamus ultricies magna ut urna congue dignissim. Etiam orci tellus,
            luctus ultrices nisi eget, vehicula pretium libero. Morbi tincidunt
            lacus id tincidunt laoreet. Sed rutrum rhoncus elit, eu consequat
            dolor mattis quis.
          </View>
          <View className="chat-bubble reciever">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            scelerisque porta libero non ultrices. Mauris eget pellentesque
            erat. Pellentesque justo eros, ornare ut dictum a, congue in tortor.
            Vivamus ultricies magna ut urna congue dignissim. Etiam orci tellus,
            luctus ultrices nisi eget, vehicula pretium libero. Morbi tincidunt
            lacus id tincidunt laoreet. Sed rutrum rhoncus elit, eu consequat
            dolor mattis quis.
          </View>
          <View className="chat-bubble reciever">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            scelerisque porta libero non ultrices. Mauris eget pellentesque
            erat. Pellentesque justo eros, ornare ut dictum a, congue in tortor.
          </View>
          <View className="chat-bubble sender">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            scelerisque porta libero non ultrices. Mauris eget pellentesque
            erat. Pellentesque justo eros, ornare ut dictum a, congue in tortor.
          </View>
        </View>
        <Flex className="chat-message">
          <TextField width="100%" labelHidden />
          <SendIcon className="icon" fontSize="large" />
        </Flex>
      </Flex>
    </Flex>
  );
}

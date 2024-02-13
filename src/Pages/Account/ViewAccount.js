import {
  Button,
  Flex,
  Heading,
  Tabs,
  View,
  Text,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import "./Account.css";

import {
  ViewPersonalTable,
  ViewAddressTable,
  ViewSecurityTable,
  ViewSettingsTable,
} from "./ViewAccountTables";

import {
  CreateProfileModalIsShownState,
  UpdateProfileModalIsShownState,
  currentUserState,
} from "../../State/GlobalState";
import { useRecoilValue, useSetRecoilState } from "recoil";

import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";

export default function ViewAccount() {
  const currentUser = useRecoilValue(currentUserState);
  const { signOut } = useAuthenticator();

  const setCreateProfileModal = useSetRecoilState(
    CreateProfileModalIsShownState
  );
  const setUpdateProfileModal = useSetRecoilState(
    UpdateProfileModalIsShownState
  );

  function hasNoProfile(object) {
    return Object.values(object).some((v) => v === null);
  }

  return (
    <View className="page">
      <Flex className="heading" direction="row" justifyContent="space-between">
        <Heading level={3}>ACCOUNT</Heading>
        <Button className="custom-button" variation="primary" onClick={signOut}>
          <Text display="flex">
            <LogoutIcon fontSize="small" className="icon" />
            SignOut
          </Text>
        </Button>
      </Flex>
      <Tabs.Container defaultValue="1">
        <Tabs.List>
          <Tabs.Item className="account-tab" value="1">
            PROFILE
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="2">
            SECURITY
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="3">
            PLAYERS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="4">
            SETTINGS
          </Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="1">
          <Flex marginBottom="20px" justifyContent="space-between">
            <Heading level={2}>Profile</Heading>
            {!hasNoProfile(currentUser) ? (
              <Button
                className="custom-button"
                variation="primary"
                onClick={() => setUpdateProfileModal(true)}
              >
                <Text display="flex">
                  <EditIcon fontSize="small" className="icon" />
                  Edit
                </Text>
              </Button>
            ) : (
              <Button
                className="custom-button"
                variation="primary"
                onClick={() => setCreateProfileModal(true)}
              >
                <Text display="flex">
                  <EditIcon fontSize="small" className="icon" />
                  Create
                </Text>
              </Button>
            )}
          </Flex>

          <Heading level={4}>Personal</Heading>
          <ViewPersonalTable currentUser={currentUser} />
          <Heading level={4}>Address</Heading>
          <ViewAddressTable currentUser={currentUser} />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <View marginBottom="20px">
            <Heading level={2}>Security</Heading>
          </View>

          <Heading level={4}>Login</Heading>
          <ViewSecurityTable currentUser={currentUser} />
        </Tabs.Panel>

        <Tabs.Panel value="3">
          <View marginBottom="20px">
            <Heading level={2}>Players</Heading>
          </View>
          <Heading level={4}>Registered Players</Heading>
          Hello
        </Tabs.Panel>

        <Tabs.Panel value="4">
          <View marginBottom="20px">
            <Heading level={2}>Settings</Heading>
          </View>

          <Heading level={4}>Theme</Heading>
          <ViewSettingsTable />
        </Tabs.Panel>
      </Tabs.Container>
    </View>
  );
}

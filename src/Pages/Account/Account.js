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
} from "./ProfileTables";
import ViewRegisteredPlayers from "./RegisteredPlayers";

import {
  currentUserState,
  modalIsShownState,
  modalSlotState,
} from "../../Functions/GlobalState";
import { useRecoilValue, useSetRecoilState } from "recoil";

import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import UpdateProfileModal from "../../Components/Modals/UpdateProfileModal";
import CreateProfileModal from "../../Components/Modals/CreateProfileModal";
import AddPlayerModal from "../../Components/Modals/AddPlayerModal";

export default function Profile() {
  const currentUser = useRecoilValue(currentUserState);
  const { signOut } = useAuthenticator();

  const setModalIsShown = useSetRecoilState(modalIsShownState);
  const setModalSlot = useSetRecoilState(modalSlotState);

  function openModal(component, title) {
    setModalSlot({ component: component, title: title });
    setModalIsShown(true);
  }

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
        <Tabs.List justifyContent="space-around">
          <Tabs.Item className="account-tab" value="1" width="100%">
            PROFILE
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="2" width="100%">
            SECURITY
          </Tabs.Item>
          {currentUser.accountType === "COACH" ? (
            <Tabs.Item className="account-tab" value="3" width="100%">
              TEAM
            </Tabs.Item>
          ) : (
            <></>
          )}
          <Tabs.Item className="account-tab" value="4" width="100%">
            PLAYERS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="5" width="100%">
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
                onClick={() =>
                  openModal(<UpdateProfileModal />, "Update Profile")
                }
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
                onClick={() =>
                  openModal(<CreateProfileModal />, "Create Profile")
                }
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

        <Tabs.Panel value="4">
          <Flex
            className="heading"
            direction="row"
            justifyContent="space-between"
          >
            <Heading level={2}>Players</Heading>
            <Button
              className="custom-button"
              variation="primary"
              onClick={() => openModal(<AddPlayerModal />, "Add Player")}
            >
              <Text display="flex">
                <AddIcon className="icon" />
                Add
              </Text>
            </Button>
          </Flex>
          <Heading level={4}>Registered Players</Heading>
          <ViewRegisteredPlayers />
        </Tabs.Panel>

        <Tabs.Panel value="5">
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

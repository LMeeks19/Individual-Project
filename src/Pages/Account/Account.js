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

import { currentUserState, modalState } from "../../Functions/GlobalState";
import { useRecoilState, useSetRecoilState } from "recoil";

import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import UpdateProfileModal from "../../Components/Modals/UpdateProfileModal";
import CreateProfileModal from "../../Components/Modals/CreateProfileModal";
import AddPlayerModal from "../../Components/Modals/AddPlayerModal";
import { TeamDetails, TeamRoster } from "./TeamTables";
import UpdateTeamModal from "../../Components/Modals/UpdateTeamModal";
import { DeleteTeam } from "../../Functions/Server";

export default function Profile() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const { signOut } = useAuthenticator();

  const setModal = useSetRecoilState(modalState);

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  async function deleteTeam(id) {
    try {
      await DeleteTeam(id);
      setCurrentUser({ ...currentUser, team: null });
    } catch (e) {}
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
        <Tabs.List spacing="equal" wrap="wrap">
          <Tabs.Item className="account-tab" value="1">
            PROFILE
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="2">
            SECURITY
          </Tabs.Item>
          {currentUser.accountType === "COACH" ||
          currentUser.accountType === "ADMIN" ? (
            <Tabs.Item className="account-tab" value="3">
              TEAM
            </Tabs.Item>
          ) : (
            <></>
          )}
          {currentUser.accountType === "PARENT" ||
          currentUser.accountType === "ADMIN" ? (
            <Tabs.Item className="account-tab" value="4">
              PLAYERS
            </Tabs.Item>
          ) : (
            <></>
          )}
          <Tabs.Item className="account-tab" value="5">
            SETTINGS
          </Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="1">
          <Flex marginBottom="20px" justifyContent="space-between">
            <Heading level={2}>My Profile</Heading>
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

        {currentUser.accountType === "COACH" ||
        currentUser.accountType === "ADMIN" ? (
          <Tabs.Panel value="3">
            <Flex marginBottom="20px" justifyContent="space-between">
              <Heading level={2}>My Team</Heading>
              <Button
                className="custom-button delete"
                variation="primary"
                onClick={() => deleteTeam(currentUser.team.id)}
              >
                <Text display="flex">
                  <DeleteIcon fontSize="small" className="icon" />
                  Delete Team
                </Text>
              </Button>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading level={4}>Details</Heading>
              <Button
                className="custom-button"
                variation="primary"
                onClick={() => openModal(<UpdateTeamModal />, "Update Team")}
              >
                <Text display="flex">
                  <EditIcon fontSize="small" className="icon" />
                  Edit
                </Text>
              </Button>
            </Flex>
            <TeamDetails team={currentUser.team} />
            <Heading level={4}>Roster</Heading>
            <Flex marginTop="20px" wrap="wrap">
              <TeamRoster players={currentUser.team.players} />
            </Flex>
          </Tabs.Panel>
        ) : (
          <></>
        )}

        {currentUser.accountType === "PARENT" ||
        currentUser.accountType === "ADMIN" ? (
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
            <ViewRegisteredPlayers />
          </Tabs.Panel>
        ) : (
          <></>
        )}

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

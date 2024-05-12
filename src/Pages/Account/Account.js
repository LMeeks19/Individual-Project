import {
  Button,
  Flex,
  Heading,
  Tabs,
  View,
  Text,
  useAuthenticator,
  Divider,
} from "@aws-amplify/ui-react";
import "./Account.css";
import {
  ViewPersonalTable,
  ViewAddressTable,
  ViewSecurityTable,
  ViewSettingsTable,
} from "./ProfileTab";
import ViewRegisteredPlayers from "./PlayersTab";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Logout, Edit, Add, Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import UpdateProfileModal from "../../Modals/AccountModals/UpdateProfileModal";
import CreateProfileModal from "../../Modals/AccountModals/CreateProfileModal";
import CreatePlayerModal from "../../Modals/AccountModals/CreatePlayerModal";
import { TeamDetails, TeamRoster } from "./TeamTab";
import UpdateTeamModal from "../../Modals/AccountModals/UpdateTeamModal";
import { DeleteTeam } from "../../Functions/Server";
import CreateTeamModal from "../../Modals/AccountModals/CreateTeamModal";
import CreateTeamPlayerModal from "../../Modals/AccountModals/CreateTeamPlayerModal";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";
import { AccountType } from "../../Functions/Enums";

// This page implements the profie page, This page displayes a variety of tabs related to the users account where they can create, update all data but only delete certain parts

export default function Profile() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const { signOut } = useAuthenticator();
  const setModal = useSetRecoilState(modalState);
  const accountTypes = new AccountType();

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  async function deleteTeam(team) {
    try {
      await DeleteTeam(team);
      setCurrentUser({ ...currentUser, team: { id: null, players: [] } });
    } catch (e) {}
  }

  function getDeleteTeamTooltipMessage() {
    if (currentUser.team.players.length > 0)
      return "Remove all team players first";
    return "Create Team";
  }

  function getTeamAddTooltipMessage() {
    if (hasNoProfile())
      return "Create a Profile first"
    return "Create Team"
  }

  function getPlayersAddTooltipMessage() {
    if (hasNoProfile())
      return "Create a Profile first"
    return "Add Player"
  }

  function hasNoProfile() {
    return Object.values(currentUser).some((v) => v === null);
  }

  return (
    <View className="page">
      <Flex className="heading" direction="row" justifyContent="space-between">
        <Heading level={2}>ACCOUNT</Heading>
        <Button className="custom-button" variation="primary" onClick={signOut}>
          <Text display="flex">
            <Logout fontSize="small" className="icon" />
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
          {currentUser.accountType === accountTypes.COACH ||
          currentUser.accountType === accountTypes.ADMIN ? (
            <Tabs.Item className="account-tab" value="3">
              TEAM
            </Tabs.Item>
          ) : (
            <></>
          )}

          <Tabs.Item className="account-tab" value="4">
            PLAYERS
          </Tabs.Item>

          <Tabs.Item className="account-tab" value="5">
            SETTINGS
          </Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="1">
          <Flex marginBottom="20px" justifyContent="space-between">
            <Heading level={3}>My Profile</Heading>
            {!hasNoProfile() ? (
              <Button
                className="custom-button"
                variation="primary"
                onClick={() =>
                  openModal(<UpdateProfileModal />, "Update Profile")
                }
              >
                <Text display="flex">
                  <Edit fontSize="small" className="icon" />
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
                  <Edit fontSize="small" className="icon" />
                  Create
                </Text>
              </Button>
            )}
          </Flex>

          <Heading level={4}>Personal</Heading>
          <Divider marginTop="10px" />
          <ViewPersonalTable currentUser={currentUser} />
          <Heading level={4}>Address</Heading>
          <Divider marginTop="10px" />
          <ViewAddressTable currentUser={currentUser} />
        </Tabs.Panel>

        <Tabs.Panel value="2">
          <Heading marginBottom="20px" level={3}>
            Security
          </Heading>

          <Heading level={4}>Login</Heading>
          <Divider marginTop="10px" />
          <ViewSecurityTable currentUser={currentUser} />
        </Tabs.Panel>

        {currentUser.accountType === accountTypes.COACH ||
        currentUser.accountType === accountTypes.ADMIN ? (
          <Tabs.Panel value="3">
            <Flex marginBottom="20px" justifyContent="space-between">
              <Heading level={3}>My Team</Heading>
              {currentUser.team.id !== null ? (
                <Tooltip title={getDeleteTeamTooltipMessage()} arrow>
                  <span>
                    <Button
                      className="custom-button delete"
                      variation="primary"
                      disabled={currentUser.team.players.length > 0}
                      onClick={() =>
                        openModal(
                          <ConfirmDeleteModal
                            deleteFunction={() => deleteTeam(currentUser.team)}
                          />,
                          "Confirm Delete Team"
                        )
                      }
                    >
                      <Text display="flex">
                        <Delete fontSize="small" className="icon" />
                        Delete Team
                      </Text>
                    </Button>
                  </span>
                </Tooltip>
              ) : (
                <Tooltip title={getTeamAddTooltipMessage()} arrow>
                  <span>
                    <Button
                      className="custom-button"
                      variation="primary"
                      disabled={hasNoProfile()}
                      onClick={() =>
                        openModal(<CreateTeamModal />, "Create Team")
                      }
                    >
                      <Text display="flex">
                        <Add fontSize="small" className="icon" />
                        Create Team
                      </Text>
                    </Button>
                  </span>
                </Tooltip>
              )}
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading level={4}>Details</Heading>
              {currentUser.team.id !== null ? (
                <Button
                  className="custom-button"
                  variation="primary"
                  onClick={() => openModal(<UpdateTeamModal />, "Update Team")}
                >
                  <Text display="flex">
                    <Edit fontSize="small" className="icon" />
                    Edit
                  </Text>
                </Button>
              ) : (
                <></>
              )}
            </Flex>
            <Divider marginTop="10px" />
            <TeamDetails team={currentUser.team} />
            <Flex justifyContent="space-between" alignItems="center">
              <Heading level={4}>Roster</Heading>
              {currentUser.team.id !== null ? (
                <Button
                  className="custom-button"
                  variation="primary"
                  onClick={() =>
                    openModal(
                      <CreateTeamPlayerModal team={currentUser.team} />,
                      "Add Team Player"
                    )
                  }
                >
                  <Text display="flex">
                    <Add fontSize="small" className="icon" />
                    Add
                  </Text>
                </Button>
              ) : (
                <></>
              )}
            </Flex>
            <Divider marginTop="10px" />
            <TeamRoster players={currentUser.team.players} />
          </Tabs.Panel>
        ) : (
          <></>
        )}

        <Tabs.Panel value="4">
          <Heading marginBottom="20px" level={3}>
            Players
          </Heading>

          <Flex justifyContent="space-between" alignItems="center">
            <Heading level={4}>Registered Players</Heading>
            <Tooltip title={getPlayersAddTooltipMessage()} arrow>
              <span>
                <Button
                  className="custom-button"
                  variation="primary"
                  disabled={hasNoProfile()}
                  onClick={() => openModal(<CreatePlayerModal />, "Add Player")}
                >
                  <Text display="flex">
                    <Add className="icon" />
                    Add
                  </Text>
                </Button>
              </span>
            </Tooltip>
          </Flex>
          <Divider marginTop="10px" />
          <ViewRegisteredPlayers />
        </Tabs.Panel>

        <Tabs.Panel value="5">
          <Heading marginBottom="20px" level={3}>
            Settings
          </Heading>

          <Heading level={4}>Theme</Heading>
          <Divider marginTop="10px" />
          <ViewSettingsTable />
        </Tabs.Panel>
      </Tabs.Container>
    </View>
  );
}

import {
  Divider,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  View,
  Badge,
} from "@aws-amplify/ui-react";
import "./ViewPlayerPostModal.css";
import {
  Close,
  Done,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Message,
  Replay,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserState,
  playerPostsState,
  modalState,
  activeNavbarTabState,
} from "../../Functions/GlobalState";
import { useNavigate } from "react-router-dom";
import {
  RemovePlayerPostInterestedUser,
  RemovePlayerPostRegisteredPlayer,
  SelectPlayerPostPlayer,
  UnselectPlayerPostPlayer,
  CreateEvent,
} from "../../Functions/Server";
import ConfirmModal from "../ConfirmModal";
import { formatDateTime } from "../../Functions/FormatDate";
import { createSelectedForPlayerPostNotification } from "../../Functions/NotificationMethods";

export default function ViewPlayerPostModal(props) {
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  const [post, setPost] = useState(props.post);
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);
  const setActiveNavbarTab = useSetRecoilState(activeNavbarTabState);

  function updateIsShown(id, field) {
    let updatedList = [...post.registeredPlayers].map((item) => {
      if (item.id === id && field === "parent")
        return { ...item, isParentShown: !item.isParentShown };
      else if (item.id === id && field === "player")
        return { ...item, isPlayerShown: !item.isPlayerShown };
      else return item;
    });

    setPost({
      ...post,
      registeredPlayers: updatedList,
    });
  }

  async function acceptPlayer(registeredPlayerId) {
    const updatedPlayerPost = await SelectPlayerPostPlayer(
      post,
      registeredPlayerId
    );
    setPost(updatedPlayerPost);
    let updatedPlayerPosts = [...playerPosts].map((post) => {
      if (post.id === updatedPlayerPost.id) {
        return updatedPlayerPost;
      }
      return post;
    });
    let interestedUsersIds = updatedPlayerPost.interestedUsers
      .filter((iu) => iu.profileId !== currentUser.id)
      .map((iu) => {
        return iu.profileId;
      });
    createSelectedForPlayerPostNotification(
      interestedUsersIds,
      updatedPlayerPost.name
    );
    setPlayerPosts(updatedPlayerPosts);

    if (
      !updatedPlayerPost.isActive &&
      updatedPlayerPost.numOfPlayersNeeded ===
        updatedPlayerPost.selectedPlayers.length
    ) {
      let associtedUsersProfileIDs = [
        updatedPlayerPost.createdByProfileID,
        ...updatedPlayerPost.registeredPlayers
          .filter((rp) => updatedPlayerPost.selectedPlayers.includes(rp.id))
          .map((rp) => {
            return rp.player.profileID;
          }),
      ];
      await CreateEvent({
        createdByProfileId: updatedPlayerPost.createdByProfileID,
        associtedUsersProfileIDs: [...new Set(associtedUsersProfileIDs)],
        organiserName: updatedPlayerPost.createdByName,
        location: `${updatedPlayerPost.street}, ${updatedPlayerPost.townCity}, ${updatedPlayerPost.county}, ${updatedPlayerPost.postcode}`,
        date: updatedPlayerPost.kickOff,
      });
    }
  }

  async function undoPlayerSelection(registeredPlayerId) {
    const updatedPlayerPost = await UnselectPlayerPostPlayer(
      post,
      registeredPlayerId
    );
    setPost(updatedPlayerPost);
    let updatedPlayerPosts = [...playerPosts].map((post) => {
      if (post.id === updatedPlayerPost.id) {
        return updatedPlayerPost;
      }
      return post;
    });
    let interestedUsersIds = updatedPlayerPost.interestedUsers
      .filter((iu) => iu.profileId !== currentUser.id)
      .map((iu) => {
        return iu.profileId;
      });
    createSelectedForPlayerPostNotification(
      interestedUsersIds,
      updatedPlayerPost.name
    );
    setPlayerPosts(updatedPlayerPosts);
  }

  async function rejectPlayer(registeredPlayerId) {
    const removedRegisteredPlayer = await RemovePlayerPostRegisteredPlayer(
      registeredPlayerId
    );
    let updatedRegisteredPlayers = post.registeredPlayers.filter(
      (registeredPlayer) => registeredPlayer.id !== removedRegisteredPlayer.id
    );

    let removedInterestedUserIds = [...post.interestedUsers].map(
      async (interestedUser) => {
        if (
          updatedRegisteredPlayers.some(
            (rp) => rp.player.profileID === interestedUser.profileId
          )
        ) {
          return;
        }
        return await RemovePlayerPostInterestedUser(interestedUser.id);
      }
    );

    let updatedPlayerPost = {
      ...post,
      interestedUsers: post.interestedUsers.filter(
        (iu) => !removedInterestedUserIds.includes(iu.id)
      ),
      registeredPlayers: updatedRegisteredPlayers,
    };
    setPost(updatedPlayerPost);

    let updatedPlayerPosts = [...playerPosts].map((playerPost) => {
      if (playerPost.id === updatedPlayerPost.id) {
        return updatedPlayerPost;
      }
      return post;
    });
    setPlayerPosts(updatedPlayerPosts);
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <View className="content">
      <Flex direction="row" justifyContent="space-evenly" gap="80px">
        <Flex width="50%" direction="column">
          <Heading level={4}>Player Post Details</Heading>
          <Divider />
          <Text>
            <b>Title:</b> {post.title}
          </Text>
          <Text>
            <b>CreatedBy:</b> {post.createdByName}
          </Text>
          {post.updatedAt !== post.createdAt ? (
            <Text>
              <b>Last Updated On:</b> {formatDateTime(post.updatedAt)}
            </Text>
          ) : (
            <Text>
              <b>Created On:</b> {formatDateTime(post.createdAt)}
            </Text>
          )}
          <Text>
            <b>Description:</b> {post.description}
          </Text>
        </Flex>
        <Flex width="50%" direction="column">
          <Heading level={4}>
            <b>Player Details</b>
          </Heading>
          <Divider />
          <Text>
            <b>Positions Needed:</b>
            {post.positionsNeeded.map((position) => {
              return (
                <Badge marginLeft="5px" marginRight="5px" key={position}>
                  {position}
                </Badge>
              );
            })}
          </Text>
          <Text>
            <b>No. Players Needed:</b> {post.numOfPlayersNeeded}
          </Text>
          <Text>
            <b>Age Group:</b> {post.ageGroup}
          </Text>
          <Text>
            <b>Skill Level:</b> {post.skillLevel}
          </Text>
          <Text>
            <b>Kick Off:</b> {formatDateTime(post.kickOff)}
          </Text>
          <Text>
            <b>Venue:</b> {post.street}, {post.townCity}, {post.county},
            {post.postcode}
          </Text>
        </Flex>
      </Flex>
      {post.createdByProfileID === currentUser.id ? (
        <Flex width="100%" direction="column" marginTop="40px">
          <Heading level={4}>Interested Parents</Heading>
          <Divider />
          <Table className="table" size="small" variation="striped">
            <TableHead>
              {post.registeredPlayers?.length > 0 ? (
                <TableRow>
                  <TableCell as="th">Parent</TableCell>
                  <TableCell as="th">Player</TableCell>
                  <TableCell as="th">Actions</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell textAlign="center" colSpan={4}>
                    No Parents Interested
                  </TableCell>
                </TableRow>
              )}
            </TableHead>
            {post.registeredPlayers?.map((registeredPlayer) => {
              return (
                <TableBody key={registeredPlayer.id}>
                  <TableRow>
                    <TableCell
                      backgroundColor={
                        post.selectedPlayers.includes(registeredPlayer.id)
                          ? "#D4AF37 "
                          : registeredPlayer.isCoachShown
                          ? "#008080"
                          : ""
                      }
                      opacity={
                        !post.selectedPlayers.includes(registeredPlayer.id) &&
                        post.selectedPlayers.length === post.numOfPlayersNeeded
                          ? "75%"
                          : ""
                      }
                      fontWeight={registeredPlayer.isCoachShown ? "bold" : ""}
                    >
                      <Tooltip
                        title={
                          registeredPlayer.isParentShown
                            ? "Collapse Parent"
                            : "Expand Parent"
                        }
                        onClick={() =>
                          updateIsShown(registeredPlayer.id, "parent")
                        }
                        arrow
                      >
                        <Flex
                          className="icon"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {
                            post.interestedUsers.find(
                              (iu) =>
                                iu.profileId ===
                                registeredPlayer.player.profileID
                            ).profile.name
                          }
                          {registeredPlayer.isParentShown ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </Flex>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      backgroundColor={
                        post.selectedPlayers.includes(registeredPlayer.id)
                          ? "#D4AF37"
                          : registeredPlayer.isTeamShown
                          ? "#008080"
                          : ""
                      }
                      opacity={
                        !post.selectedPlayers.includes(registeredPlayer.id) &&
                        post.selectedPlayers.length === post.numOfPlayersNeeded
                          ? "75%"
                          : ""
                      }
                      fontWeight={registeredPlayer.isTeamShown ? "bold" : ""}
                    >
                      <Tooltip
                        title={
                          registeredPlayer.isPlayerShown
                            ? "Collapse Player"
                            : "Expand Player"
                        }
                        onClick={() =>
                          updateIsShown(registeredPlayer.id, "player")
                        }
                        arrow
                      >
                        <Flex
                          className="icon"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {registeredPlayer.player.name}
                          {registeredPlayer.isPlayerShown ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </Flex>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      backgroundColor={
                        post.selectedPlayers.includes(registeredPlayer.id)
                          ? "#D4AF37 "
                          : ""
                      }
                      opacity={
                        !post.selectedPlayers.includes(registeredPlayer.id) &&
                        post.selectedPlayers.length === post.numOfPlayersNeeded
                          ? "75%"
                          : ""
                      }
                    >
                      {post.isActive ? (
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          gap="10px"
                        >
                          <Tooltip title="Message" arrow>
                            <Message
                              className="icon"
                              onClick={() => {
                                setModal({
                                  component: null,
                                  title: null,
                                  isShown: false,
                                });
                                setActiveNavbarTab("3");
                                navigate("/messages");
                              }}
                            />
                          </Tooltip>
                          {!post.selectedPlayers.includes(
                            registeredPlayer.id
                          ) ? (
                            <Tooltip title="Accept" arrow>
                              <Done
                                className="icon green"
                                onClick={() =>
                                  openModal(
                                    <ConfirmModal
                                      function={() =>
                                        acceptPlayer(registeredPlayer.id)
                                      }
                                    />,
                                    "Confirm Player Selection"
                                  )
                                }
                              />
                            </Tooltip>
                          ) : (
                            <></>
                          )}
                          {!post.selectedPlayers.includes(
                            registeredPlayer.id
                          ) ? (
                            <Tooltip title="Reject" arrow>
                              <Close
                                className="icon red"
                                onClick={() =>
                                  rejectPlayer(registeredPlayer.id)
                                }
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Undo Selection" arrow>
                              <Replay
                                className="icon"
                                onClick={() =>
                                  undoPlayerSelection(registeredPlayer.id)
                                }
                              />
                            </Tooltip>
                          )}
                        </Flex>
                      ) : (
                        <Flex justifyContent="center" alignItems="center">
                          No Actions
                        </Flex>
                      )}
                    </TableCell>
                  </TableRow>
                  {registeredPlayer.isParentShown ? (
                    <>
                      <TableRow
                        as="th"
                        backgroundColor={
                          post.selectedPlayers.includes(registeredPlayer.id)
                            ? "#D4AF37 "
                            : "#008080"
                        }
                        opacity={
                          !post.selectedPlayers.includes(registeredPlayer.id) &&
                          post.selectedPlayers.length ===
                            post.numOfPlayersNeeded
                            ? "75%"
                            : ""
                        }
                        fontWeight="bold"
                      >
                        <TableCell fontWeight="bold">Username</TableCell>
                        <TableCell fontWeight="bold">Email</TableCell>
                        <TableCell fontWeight="bold">Phone Number</TableCell>
                      </TableRow>
                      <TableRow
                        opacity={
                          !post.selectedPlayers.includes(registeredPlayer.id) &&
                          post.selectedPlayers.length ===
                            post.numOfPlayersNeeded
                            ? "75%"
                            : ""
                        }
                      >
                        <TableCell>{}</TableCell>
                        <TableCell>
                          {
                            post.interestedUsers.find(
                              (iu) =>
                                iu.profileId ===
                                registeredPlayer.player.profileID
                            ).profile.email
                          }
                        </TableCell>
                        <TableCell>
                          {
                            post.interestedUsers.find(
                              (iu) =>
                                iu.profileId ===
                                registeredPlayer.player.profileID
                            ).profile.phoneNumber
                          }
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <></>
                  )}
                  {registeredPlayer.isPlayerShown ? (
                    <>
                      <TableRow
                        as="th"
                        backgroundColor={
                          post.selectedPlayers.includes(registeredPlayer.id)
                            ? "#D4AF37 "
                            : "#008080"
                        }
                        opacity={
                          !post.selectedPlayers.includes(registeredPlayer.id) &&
                          post.selectedPlayers.length ===
                            post.numOfPlayersNeeded
                            ? "75%"
                            : ""
                        }
                        fontWeight="bold"
                      >
                        <TableCell fontWeight="bold">Age Group</TableCell>
                        <TableCell fontWeight="bold">Skill Level</TableCell>
                        <TableCell fontWeight="bold">Positions</TableCell>
                      </TableRow>
                      <TableRow
                        opacity={
                          !post.selectedPlayers.includes(registeredPlayer.id) &&
                          post.selectedPlayers.length ===
                            post.numOfPlayersNeeded
                            ? "75%"
                            : ""
                        }
                      >
                        <TableCell>
                          {registeredPlayer.player.ageGroup}
                        </TableCell>
                        <TableCell>
                          {registeredPlayer.player.skillLevel}
                        </TableCell>
                        <TableCell>
                          {registeredPlayer.player.positions.map((position) => {
                            return <Badge key={position}>{position}</Badge>;
                          })}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <></>
                  )}
                </TableBody>
              );
            })}
          </Table>
        </Flex>
      ) : (
        <></>
      )}
    </View>
  );
}

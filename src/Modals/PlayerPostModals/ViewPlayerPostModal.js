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
} from "@aws-amplify/ui-react";
import { format } from "date-fns";
import "./ViewPlayerPostModal.css";
import {
  Close,
  Done,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Message,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserState,
  playerPostsState,
  modalState,
} from "../../Functions/GlobalState";
import { useNavigate } from "react-router-dom";
import {
  RemovePlayerPostInterestedUser,
  SelectPlayerPostPlayer,
} from "../../Functions/Server";
import ConfirmModal from "../ConfirmModal";

export default function ViewPlayerPostModal(props) {

  // TODO: Update Modal

  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalState);
  const [post, setPost] = useState(props.post);
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);

  function formatDateTime(date) {
    return format(new Date(date), "do MMMM yyyy @ H:mm a");
  }

  function updateIsShown(id, field) {}

  async function acceptCoach(interestedUserId) {}

  async function rejectCoach(interestedUserId) {}

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <View className="content">
      <Flex direction="row" justifyContent="space-evenly" gap="80px">
        <Flex width="50%" direction="column">
          <Heading level={4}>Post Details</Heading>
          <Divider />
          <Text>
            <b>Title:</b> {post.title}
          </Text>
          <Text>
            <b>CreatedBy:</b> {post.createdByName}
          </Text>
          <Text>
            <b>Created On:</b> {formatDateTime(post.createdAt)}
          </Text>
          {post.updatedAt !== post.createdAt ? (
            <Text>
              <b>Last Updated On:</b> {formatDateTime(post.updatedAt)}
            </Text>
          ) : (
            <></>
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
            <b>Team:</b> {post.teamName}
          </Text>
          <Text>
            <b>Game Type:</b> {post.gameType}
          </Text>
          <Text>
            <b>Age Group:</b> {post.ageGroup}
          </Text>
          <Text>
            <b>Team Size:</b> {post.teamSize} a side
          </Text>
          <Text>
            <b>Limit Substitutions:</b> {post.substitutionLimit ? "Yes" : "No"}
          </Text>
          <Text>
            <b>Cards:</b> {post.cards ? "Yes" : "No"}
          </Text>
          <Text>
            <b>Half Length:</b> {post.halfLength} minutes
          </Text>
          <Text>
            <b>Kick Off:</b> {formatDateTime(post.kickOff)}
          </Text>
          <Text>
            <b>Venue:</b> {post.street}, {post.townCity}, {post.county},{" "}
            {post.postcode}
          </Text>
        </Flex>
      </Flex>
      {post.createdByProfileID === currentUser.id ? (
        <Flex width="100%" direction="column" marginTop="40px">
          <Heading level={4}>
            {post.selectedOpponent !== null && !post.isActive
              ? "Selected Opponent"
              : "Interested Coaches"}
          </Heading>
          <Divider />
          <Table className="table" size="small" variation="striped">
            <TableHead>
              {post.interestedUsers?.length > 0 ? (
                <TableRow>
                  <TableCell as="th">Coach</TableCell>
                  <TableCell as="th">Team</TableCell>
                  <TableCell as="th">Actions</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell textAlign="center" colSpan={4}>
                    No Coaches Interested
                  </TableCell>
                </TableRow>
              )}
            </TableHead>
            {post.interestedUsers?.map((interestedUser) => {
              return (
                <TableBody key={interestedUser.id}>
                  <TableRow>
                    <TableCell
                      backgroundColor={
                        post.selectedOpponent !== null
                          ? "#D4AF37 "
                          : interestedUser.isCoachShown
                          ? "#008080"
                          : ""
                      }
                      opacity={
                        post.selectedOpponent !== null &&
                        post.selectedOpponent !== interestedUser.id
                          ? "75%"
                          : ""
                      }
                      fontWeight={interestedUser.isCoachShown ? "bold" : ""}
                    >
                      <Tooltip
                        title={
                          interestedUser.isCoachShown
                            ? "Collapse Coach"
                            : "Expand Coach"
                        }
                        onClick={() =>
                          updateIsShown(interestedUser.id, "coach")
                        }
                        arrow
                      >
                        <Flex
                          className="icon"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {interestedUser.profile.name}
                          {interestedUser.isCoachShown ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </Flex>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      backgroundColor={
                        post.selectedOpponent !== null
                          ? "#D4AF37 "
                          : interestedUser.isTeamShown
                          ? "#008080"
                          : ""
                      }
                      opacity={
                        post.selectedOpponent !== null &&
                        post.selectedOpponent !== interestedUser.id
                          ? "75%"
                          : ""
                      }
                      fontWeight={interestedUser.isTeamShown ? "bold" : ""}
                    >
                      <Tooltip
                        title={
                          interestedUser.isTeamShown
                            ? "Collapse Team"
                            : "Expand Team"
                        }
                        onClick={() => updateIsShown(interestedUser.id, "team")}
                        arrow
                      >
                        <Flex
                          className="icon"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {interestedUser.profile.team.items[0].name}
                          {interestedUser.isTeamShown ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </Flex>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      backgroundColor={
                        post.selectedOpponent !== null ? "#D4AF37 " : ""
                      }
                      opacity={
                        post.selectedOpponent !== null &&
                        post.selectedOpponent !== interestedUser.id
                          ? "75%"
                          : ""
                      }
                    >
                      {post.selectedOpponent === null ? (
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
                                navigate("/messages");
                              }}
                            />
                          </Tooltip>

                          <Tooltip title="Accept" arrow>
                            <Done
                              className="icon green"
                              onClick={() =>
                                openModal(
                                  <ConfirmModal
                                    function={() =>
                                      acceptCoach(interestedUser.id)
                                    }
                                  />,
                                  "Confirm"
                                )
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Reject" arrow>
                            <Close
                              className="icon red"
                              onClick={() => rejectCoach(interestedUser.id)}
                            />
                          </Tooltip>
                        </Flex>
                      ) : (
                        <Flex justifyContent="center" alignItems="center">
                          No Actions
                        </Flex>
                      )}
                    </TableCell>
                  </TableRow>
                  {interestedUser.isCoachShown ? (
                    <>
                      <TableRow
                        as="th"
                        backgroundColor={
                          post.selectedOpponent !== null
                            ? "#D4AF37 "
                            : "#008080"
                        }
                        opacity={
                          post.selectedOpponent !== null &&
                          post.selectedOpponent !== interestedUser.id
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
                          post.selectedOpponent !== null &&
                          post.selectedOpponent !== interestedUser.id
                            ? "75%"
                            : ""
                        }
                      >
                        <TableCell>{interestedUser.profile.username}</TableCell>
                        <TableCell>{interestedUser.profile.email}</TableCell>
                        <TableCell>
                          {interestedUser.profile.phoneNumber}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <></>
                  )}
                  {interestedUser.isTeamShown ? (
                    <>
                      <TableRow
                        as="th"
                        backgroundColor={
                          post.selectedOpponent !== null
                            ? "#D4AF37 "
                            : "#008080"
                        }
                        opacity={
                          post.selectedOpponent !== null &&
                          post.selectedOpponent !== interestedUser.id
                            ? "75%"
                            : ""
                        }
                        fontWeight="bold"
                      >
                        <TableCell fontWeight="bold">League</TableCell>
                        <TableCell fontWeight="bold">Age Group</TableCell>
                        <TableCell fontWeight="bold">Location</TableCell>
                      </TableRow>
                      <TableRow
                        opacity={
                          post.selectedOpponent !== null &&
                          post.selectedOpponent !== interestedUser.id
                            ? "75%"
                            : ""
                        }
                      >
                        <TableCell>
                          {interestedUser.profile.team.items[0].league}
                        </TableCell>
                        <TableCell>
                          {interestedUser.profile.team.items[0].ageGroup}
                        </TableCell>
                        <TableCell>
                          {interestedUser.profile.team.items[0].location}
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

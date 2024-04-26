import {
  Divider,
  Flex,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Text,
} from "@aws-amplify/ui-react";
import { CircularProgress, TablePagination, Tooltip } from "@mui/material";
import {
  modalState,
  matchPostsState,
  activeNavbarTabState,
  currentUserState,
} from "../../Functions/GlobalState";
import { useState } from "react";
import {
  AddMatchPostInterestedUser,
  DeleteMatchPost,
  RemoveMatchPostInterestedUser,
} from "../../Functions/Server";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import ViewMatchPostModal from "../../Modals/MatchPostModals/ViewMatchPostModal";
import UpdateMatchPostModal from "../../Modals/MatchPostModals/UpdateMatchPostModal";
import "./MatchPosts.css";
import "../../Components/Animations.css";
import { useNavigate } from "react-router-dom";
import {
  Message,
  Edit,
  Delete,
  Visibility,
  Replay,
  ThumbUpOffAlt,
  ThumbUpAlt,
} from "@mui/icons-material";
import { AccountType } from "../../Functions/Enums";
import { formatDateTimeRelative } from "../../Functions/FormatDate";
import { createMatchPostDeletedNotification } from "../../Functions/NotificationMethods";

export default function MatchPostsTab(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const setModal = useSetRecoilState(modalState);
  const [matchPosts, setMatchPosts] = useRecoilState(matchPostsState);
  const navigate = useNavigate();
  const setActiveNavbarTab = useSetRecoilState(activeNavbarTabState);
  const currentUser = useRecoilValue(currentUserState);
  const accountTypes = new AccountType();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function deleteMatchPost(matchPost) {
    const deletedMatchPostId = await DeleteMatchPost(matchPost);
    setMatchPosts(matchPosts.filter((post) => post.id !== deletedMatchPostId));
    let interestedUsersIds = [...matchPost.interestedUsers].map((iu) => {
      if (iu.profileId !== currentUser.id) return iu.profileId;
    });
    createMatchPostDeletedNotification(interestedUsersIds, matchPost.title)
  }

  async function registerInterest(profileId, matchPostId) {
    let addedInterestedUser = await AddMatchPostInterestedUser(
      profileId,
      matchPostId
    );
    let updatedPosts = matchPosts.map((post) => {
      if (post.id === addedInterestedUser.matchPostId) {
        return {
          ...post,
          interestedUsers: [...post.interestedUsers, addedInterestedUser],
        };
      }
      return post;
    });
    setMatchPosts(updatedPosts);
  }

  async function unRegisterInterest(interestedUserId) {
    let removedInterestedUser = await RemoveMatchPostInterestedUser(
      interestedUserId
    );
    let updatedPosts = matchPosts.map((post) => {
      if (post.id === removedInterestedUser.matchPostId) {
        return {
          ...post,
          interestedUsers: post.interestedUsers.filter(
            (interestedUser) => interestedUser.id !== removedInterestedUser.id
          ),
        };
      }
      return post;
    });
    setMatchPosts(updatedPosts);
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <Table className="match-posts-table" variation="striped">
      <TableHead width="100%">
        <TableRow>
          <th className="title">Title</th>
          <th className="description">Description</th>
          <th className="created-on">Created On</th>
          <th className="actions">Actions</th>
        </TableRow>
      </TableHead>

      {props.matchPosts.length === 0 || props.isLoading ? (
        <TableBody width="100%">
          <TableRow>
            <td colSpan="4">
              {!props.isLoading ? (
                <Text textAlign="center">No Posts</Text>
              ) : (
                <Flex justifyContent="center" alignItems="center">
                  <Text fontSize="1rem" opacity="75%">
                    Loading
                  </Text>
                  <CircularProgress />
                </Flex>
              )}
            </td>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody width="100%">
          {props.matchPosts
            .sort((a, b) => a.title.localeCompare(b.title))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post) => {
              return (
                <TableRow className="pointer" key={post.id}>
                  <td className="title">
                    <Text>{post.title}</Text>
                  </td>
                  <td className="description">
                    <Text>{post.description}</Text>
                  </td>
                  <td className="created-on">
                    <Text>{formatDateTimeRelative(post.createdAt)}</Text>
                  </td>
                  <td className="actions">
                    {post.isActive ? (
                      <Text as="div">
                        {post.createdByProfileID === props.currentUser.id ? (
                          <Flex justifyContent="center">
                            <Tooltip title="View Match Post Details" arrow>
                              <Visibility
                                className="icon"
                                onClick={() =>
                                  openModal(
                                    <ViewMatchPostModal post={post} />,
                                    "Match Post Details"
                                  )
                                }
                              />
                            </Tooltip>
                            <Divider orientation="vertical" />
                            <Tooltip title="Update Match Post Details" arrow>
                              <Edit
                                className="icon"
                                onClick={() =>
                                  openModal(
                                    <UpdateMatchPostModal post={post} />,
                                    "Update Match Post Details"
                                  )
                                }
                              />
                            </Tooltip>
                            <Divider orientation="vertical" />
                            {post.interestedUsers.length > 0 ? (
                              <Tooltip
                                title="Remove all interested coaches first"
                                arrow
                              >
                                <Delete className="icon delete disabled" />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Delete Match Post" arrow>
                                <Delete
                                  className="icon delete"
                                  onClick={() =>
                                    openModal(
                                      <ConfirmDeleteModal
                                        deleteFunction={() =>
                                          deleteMatchPost(post)
                                        }
                                      />,
                                      "Confirm Match Post Delete"
                                    )
                                  }
                                />
                              </Tooltip>
                            )}
                          </Flex>
                        ) : (
                          <Flex justifyContent="center">
                            <Tooltip title="View Match Post Details" arrow>
                              <Visibility
                                className="icon"
                                onClick={() =>
                                  openModal(
                                    <ViewMatchPostModal post={post} />,
                                    "Match Post Details"
                                  )
                                }
                              />
                            </Tooltip>
                            <Divider orientation="vertical" />
                            {!post.interestedUsers.some(
                              (interestedUser) =>
                                interestedUser.profileId ===
                                props.currentUser.id
                            ) ? (
                              <Tooltip title="Register Interest" arrow>
                                <ThumbUpOffAlt
                                  className="icon"
                                  onClick={() =>
                                    registerInterest(
                                      props.currentUser.id,
                                      post.id
                                    )
                                  }
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Unregister Interest" arrow>
                                <ThumbUpAlt
                                  className="icon"
                                  onClick={() =>
                                    unRegisterInterest(
                                      post.interestedUsers.find(
                                        (interestedUser) =>
                                          interestedUser.profileId ===
                                          props.currentUser.id
                                      ).id
                                    )
                                  }
                                />
                              </Tooltip>
                            )}
                            <Divider orientation="vertical" />
                            <Tooltip title="Message" arrow>
                              <Message
                                className="icon"
                                onClick={() => {
                                  setActiveNavbarTab("3");
                                  navigate("/messages");
                                }}
                              />
                            </Tooltip>
                          </Flex>
                        )}
                      </Text>
                    ) : (
                      <Text as="div">
                        <Flex justifyContent="center">
                          <Tooltip title="View Match Post Details" arrow>
                            <Visibility
                              className="icon"
                              onClick={() =>
                                openModal(
                                  <ViewMatchPostModal post={post} />,
                                  "Match Post Details"
                                )
                              }
                            />
                          </Tooltip>
                        </Flex>
                      </Text>
                    )}
                  </td>
                </TableRow>
              );
            })}
          <TableRow>
            <TablePagination
              sx={{
                color: "#f7f5ef",
                borderBottom: "transparent",
                backgroundColor: "#008080",
              }}
              rowsPerPageOptions={[8, 16, 32, 64, 128, props.matchPosts.length]
                .sort((a, b) => a - b)
                .filter((a) => a <= props.matchPosts.length)}
              count={props.matchPosts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}

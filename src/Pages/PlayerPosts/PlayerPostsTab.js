import {
  Divider,
  Flex,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Text,
  View,
} from "@aws-amplify/ui-react";
import { CircularProgress, TablePagination, Tooltip } from "@mui/material";
import { modalState, playerPostsState } from "../../Functions/GlobalState";
import { useState } from "react";
import { formatRelative } from "date-fns";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";
import { useSetRecoilState, useRecoilState } from "recoil";
import "./PlayerPosts.css";
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

export default function PlayerPostsTab(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const setModal = useSetRecoilState(modalState);
  const [playerPosts, setPlayerPosts] = useRecoilState(playerPostsState);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function formatDate(date) {
    let formattedDate = formatRelative(new Date(date), new Date(), {});
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  async function deletePlayerPost(playerPostId) {
    // TODO:
  }

  async function reActivatePlayerPost(playerPostId) {
    // TODO:
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  async function registerInterest(profileId, postId) {
    // TODO:
  }

  async function unRegisterInterest(interestedUserId) {
    // TODO:
  }

  return (
    <Table className="player-posts-table" variation="striped">
      <TableHead width="100%">
        <TableRow>
          <th className="title">Title</th>
          <th className="description">Description</th>
          <th className="created-on">Created On</th>
          <th className="actions">Actions</th>
        </TableRow>
      </TableHead>

      {props.playerPosts.length === 0 || props.isLoading ? (
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
          {props.playerPosts
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
                    <Text>{formatDate(post.createdAt)}</Text>
                  </td>
                  <td className="actions">
                    {post.isActive ? (
                      <Text as="div">
                        {post.createdByProfileID === props.currentUser.id ? (
                          <Flex justifyContent="center">
                            <Flex gap="4px" className="icon">
                              <Tooltip title="View Player Post Details" arrow>
                                <Visibility
                                // TODO: OnClick Modal View
                                />
                              </Tooltip>
                            </Flex>
                            <Divider orientation="vertical" />
                            <Flex gap="4px" className="icon">
                              <Tooltip title="Update Player Post Details" arrow>
                                <Edit
                                // TODO OnClick Modal Edit
                                />
                              </Tooltip>
                            </Flex>
                            <Divider orientation="vertical" />
                            <Flex gap="4px" className="icon delete">
                              <Tooltip title="Delete Player Post" arrow>
                                <Delete
                                  onClick={() =>
                                    openModal(
                                      <ConfirmDeleteModal
                                        deleteFunction={() =>
                                          deletePlayerPost(post.id)
                                        }
                                      />,
                                      "Confirm Player Post Delete"
                                    )
                                  }
                                />
                              </Tooltip>
                            </Flex>
                          </Flex>
                        ) : (
                          <Flex justifyContent="center">
                            <Flex gap="4px" className="icon">
                              <Tooltip title="View Player Post Details" arrow>
                                <Visibility
                                // TODO: OnClick Modal View
                                />
                              </Tooltip>
                            </Flex>
                            <Divider orientation="vertical" />
                            {!post.interestedUsers.some(
                              (interestedUser) =>
                                interestedUser.profileId ===
                                props.currentUser.id
                            ) ? (
                              <Flex gap="4px" className="icon">
                                <Tooltip title="Register Interest" arrow>
                                  <ThumbUpOffAlt
                                    onClick={() =>
                                      registerInterest(
                                        props.currentUser.id,
                                        post.id
                                      )
                                    }
                                  />
                                </Tooltip>
                              </Flex>
                            ) : (
                              <Flex gap="4px" className="icon">
                                <Tooltip title="Unregister Interest" arrow>
                                  <ThumbUpAlt
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
                              </Flex>
                            )}
                            <Divider orientation="vertical" />
                            <Flex gap="4px" className="icon">
                              <Tooltip title="Message" arrow>
                                <Message
                                  onClick={() => navigate("/messages")}
                                />
                              </Tooltip>
                            </Flex>
                          </Flex>
                        )}
                      </Text>
                    ) : (
                      <Text as="div">
                        <Flex justifyContent="center">
                          <Flex gap="4px" className="icon">
                            <Tooltip title="View PLayer Post Details" arrow>
                              <Visibility
                              // TODO: OnClick Modal View
                              />
                            </Tooltip>
                          </Flex>
                          {post.createdByProfileID === props.currentUser.id ? (
                            <>
                              <Divider orientation="vertical" />
                              <Flex gap="4px" className="icon">
                                <Tooltip title="Reactivate Player Post" arrow>
                                  <Replay
                                    onClick={() =>
                                      reActivatePlayerPost(post.id)
                                    }
                                  />
                                </Tooltip>
                              </Flex>
                            </>
                          ) : (
                            <></>
                          )}
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
              rowsPerPageOptions={[8, 16, 32, 64, 128, props.playerPosts.length]
                .sort((a, b) => a - b)
                .filter((a) => a <= props.playerPosts.length)}
              count={props.playerPosts.length}
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

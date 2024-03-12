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
import { TablePagination, Tooltip } from "@mui/material";
import { modalState, matchPostsState } from "../../Functions/GlobalState";
import { useState } from "react";
import { formatRelative } from "date-fns";
import {
  AddMatchPostInterestedUser,
  DeleteMatchPost,
  RemoveMatchPostInterestedUser,
  ReactivateMatchPost,
} from "../../Functions/Server";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";
import { useSetRecoilState, useRecoilState } from "recoil";
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

export default function PostsTab(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const setModal = useSetRecoilState(modalState);
  const [posts, setPosts] = useRecoilState(matchPostsState);
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

  async function deleteMatchPost(matchPostId) {
    const deletedMatchPostId = await DeleteMatchPost(matchPostId);
    setPosts(posts.filter((post) => post.id !== deletedMatchPostId));
  }

  async function reActivateMatchPost(matchPostId) {
    const updatedMatchPost = await ReactivateMatchPost(matchPostId);
    let updatedMatchPosts = [...posts].map((post) => {
      if (post.id === updatedMatchPost.id) {
        return updatedMatchPost;
      }
      return post;
    });
    setPosts(updatedMatchPosts);
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  async function RegisterInterest(profileId, postId) {
    let addedInterestedUser = await AddMatchPostInterestedUser(
      profileId,
      postId
    );
    let updatedPosts = posts.map((post) => {
      if (post.id === addedInterestedUser.matchPostId) {
        return {
          ...post,
          interestedUsers: [...post.interestedUsers, addedInterestedUser],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  }

  async function UnRegisterInterest(interestedUserId) {
    let removedInterestedUser = await RemoveMatchPostInterestedUser(
      interestedUserId
    );
    let updatedPosts = posts.map((post) => {
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
    setPosts(updatedPosts);
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

      {props.posts.length === 0 || props.isLoading ? (
        <TableBody width="100%">
          <TableRow>
            <td colSpan="4">
              {!props.isLoading ? (
                <Text textAlign="center">No Posts</Text>
              ) : (
                <Flex justifyContent="center" alignItems="center">
                  <Text fontSize="1rem">Loading</Text>
                  <View className="loader"></View>
                </Flex>
              )}
            </td>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody width="100%">
          {props.posts
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
                              <Tooltip title="View Match Post Details" arrow>
                                <Visibility
                                  onClick={() =>
                                    openModal(
                                      <ViewMatchPostModal post={post} />,
                                      "View Match Post Details"
                                    )
                                  }
                                />
                              </Tooltip>
                            </Flex>
                            <Divider orientation="vertical" />
                            <Flex gap="4px" className="icon">
                              <Tooltip title="Update Match Post Details" arrow>
                                <Edit
                                  onClick={() =>
                                    openModal(
                                      <UpdateMatchPostModal post={post} />,
                                      "Update Match Post Details"
                                    )
                                  }
                                />
                              </Tooltip>
                            </Flex>
                            <Divider orientation="vertical" />
                            <Flex gap="4px" className="icon delete">
                              <Tooltip title="Delete Match Post" arrow>
                                <Delete
                                  onClick={() =>
                                    openModal(
                                      <ConfirmDeleteModal
                                        deleteFunction={() =>
                                          deleteMatchPost(post.id)
                                        }
                                      />,
                                      "Confirm Match Post Delete"
                                    )
                                  }
                                />
                              </Tooltip>
                            </Flex>
                          </Flex>
                        ) : (
                          <Flex justifyContent="center">
                            <Flex gap="4px" className="icon">
                              <Tooltip title="View Match Post Details" arrow>
                                <Visibility
                                  onClick={() =>
                                    openModal(
                                      <ViewMatchPostModal post={post} />,
                                      "View Match Post Details"
                                    )
                                  }
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
                                      RegisterInterest(
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
                                      UnRegisterInterest(
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
                            <Tooltip title="View Match Post Details" arrow>
                              <Visibility
                                onClick={() =>
                                  openModal(
                                    <ViewMatchPostModal post={post} />,
                                    "View Match Post Details"
                                  )
                                }
                              />
                            </Tooltip>
                          </Flex>
                          {post.createdByProfileID === props.currentUser.id ? (
                            <>
                              <Divider orientation="vertical" />
                              <Flex gap="4px" className="icon">
                                <Tooltip title="Reactivate Post" arrow>
                                  <Replay
                                    onClick={() => reActivateMatchPost(post.id)}
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
                color: "#f9f1f1",
                borderBottom: "transparent",
                backgroundColor: "#008080",
              }}
              rowsPerPageOptions={[8, 16, 32, 64, 128, props.posts.length]
                .sort((a, b) => a - b)
                .filter((a) => a <= props.posts.length)}
              count={props.posts.length}
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

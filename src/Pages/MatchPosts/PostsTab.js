import {
  Divider,
  Flex,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Text,
} from "@aws-amplify/ui-react";
import { TablePagination, Tooltip } from "@mui/material";
import { modalState, matchPostsState } from "../../Functions/GlobalState";
import { useState } from "react";
import { formatRelative } from "date-fns";
import { DeleteMatchPost } from "../../Functions/Server";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";
import { useSetRecoilState, useRecoilState } from "recoil";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayIcon from "@mui/icons-material/Replay";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import { UpdateMatchPost } from "../../Functions/Server";
import ViewMatchPostModal from "../../Modals/MatchPostModals/ViewMatchPostModal";
import UpdateMatchPostModal from "../../Modals/MatchPostModals/UpdateMatchPostModal";
import "./MatchPosts.css";

// TODO: View, Create, Update Modals

export default function PostsTab(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const setModal = useSetRecoilState(modalState);
  const [posts, setPosts] = useRecoilState(matchPostsState);

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

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  async function toggleInterestedUsers(post, userId) {
    let updatedPosts = posts.map((curPost) => {
      if (curPost.id === post.id) {
        if (curPost.interestedUsers.includes(userId)) {
          return {
            ...curPost,
            interestedUsers: curPost.interestedUsers.filter(
              (id) => id !== userId
            ),
          };
        } else {
          return {
            ...curPost,
            interestedUsers: [...curPost.interestedUsers, userId],
          };
        }
      }
      return curPost;
    });
    // await UpdateMatchPost(updatedPosts.find((p) => p.id === post.id));
    setPosts(updatedPosts);
  }

  return (
    <Table className="table" variation="striped">
      <TableHead width="100%">
        <TableRow>
          <th className="title">Title</th>
          <th className="description">Description</th>
          <th className="created-on">Created On</th>
          <th className="actions">Actions</th>
        </TableRow>
      </TableHead>

      {props.posts.length === 0 ? (
        <TableBody width="100%">
          <TableRow>
            <td colSpan="4">
              <Text textAlign="center">No Posts</Text>
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
                                <VisibilityIcon
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
                                <EditIcon
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
                                <DeleteIcon
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
                                <VisibilityIcon
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
                            {!post.interestedUsers.includes(
                              props.currentUser.id
                            ) ? (
                              <Flex gap="4px" className="icon">
                                <Tooltip title="Register Interest" arrow>
                                  <ThumbUpOffAltIcon
                                    onClick={() =>
                                      toggleInterestedUsers(
                                        post,
                                        props.currentUser.id
                                      )
                                    }
                                  />
                                </Tooltip>
                              </Flex>
                            ) : (
                              <Flex gap="4px" className="icon">
                                <Tooltip title="Unregister Interest" arrow>
                                  <ThumbUpAltIcon
                                    onClick={() =>
                                      toggleInterestedUsers(
                                        post,
                                        props.currentUser.id
                                      )
                                    }
                                  />
                                </Tooltip>
                              </Flex>
                            )}
                          </Flex>
                        )}
                      </Text>
                    ) : (
                      <Text as="div">
                        <Flex justifyContent="center">
                          <Flex gap="4px" className="icon">
                            <Tooltip title="View Match Post Details" arrow>
                              <VisibilityIcon
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
                                  <ReplayIcon />
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

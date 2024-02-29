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
import { format } from "date-fns";
import { DeleteMatchPost } from "../../Functions/Server";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";
import { useSetRecoilState, useRecoilState } from "recoil";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayIcon from "@mui/icons-material/Replay";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { UpdateMatchPost } from "../../Functions/Server";
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
    return format(new Date(date), "d/MM/yyyy H:mm:ss");
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
    await UpdateMatchPost(updatedPosts.find((p) => p.id === post.id))
    setPosts(updatedPosts);
  }

  return (
    <Table className="table" variation="striped">
      <TableHead>
        <TableRow>
          <th>Title</th>
          <th>Description</th>
          <th>Location</th>
          <th>Postcode</th>
          <th>Team</th>
          <th>Created By</th>
          <th>Created On</th>
          <th>Actions</th>
        </TableRow>
      </TableHead>

      {props.posts.length === 0 ? (
        <TableBody>
          <TableRow>
            <td colSpan="8">
              <Text>No Posts</Text>
            </td>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {props.posts
            .sort((a, b) => a.title.localeCompare(b.title))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post) => {
              return (
                <TableRow className="pointer" key={post.id}>
                  <td>
                    <Text>{post.title}</Text>
                  </td>
                  <td>
                    <Text>{post.description}</Text>
                  </td>
                  <td>
                    <Text>
                      {post.street}, {post.townCity}, {post.county}
                    </Text>
                  </td>
                  <td>
                    <Text>{post.postcode}</Text>
                  </td>
                  <td>
                    <Text>{post.team}</Text>
                  </td>
                  <td>
                    <Text>{post.createdByName}</Text>
                  </td>
                  <td>
                    <Text>{formatDate(post.createdAt)}</Text>
                  </td>
                  <td>
                    {!post.isClosed ? (
                      <Text as="div">
                        {post.createdByProfileID === props.currentUser.id ? (
                          <Flex justifyContent="center">
                            <Flex gap="4px" className="icon">
                              <Tooltip title="View Post Details" arrow>
                                <VisibilityIcon />
                              </Tooltip>
                            </Flex>
                            <Divider orientation="vertical" />
                            <Flex gap="4px" className="icon">
                              <Tooltip title="Edit Post Details" arrow>
                                <EditIcon />
                              </Tooltip>
                            </Flex>
                            <Divider orientation="vertical" />
                            <Flex gap="4px" className="icon delete">
                              <Tooltip title="Delete Post" arrow>
                                <DeleteIcon
                                  onClick={() =>
                                    openModal(
                                      <ConfirmDeleteModal
                                        deleteFunction={() =>
                                          deleteMatchPost(post.id)
                                        }
                                      />,
                                      "Confirm Delete Player"
                                    )
                                  }
                                />
                              </Tooltip>
                            </Flex>
                          </Flex>
                        ) : (
                          <Flex justifyContent="center">
                            <Flex gap="4px" className="icon">
                              <Tooltip title="View Post Details" arrow>
                                <VisibilityIcon />
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
                            <Tooltip title="View Post Details" arrow>
                              <VisibilityIcon />
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

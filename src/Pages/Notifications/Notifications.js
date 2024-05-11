import {
  Heading,
  View,
  Flex,
  Text,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Divider,
  Button,
} from "@aws-amplify/ui-react";
import { MenuItem, Select, Tooltip } from "@mui/material";
import { formatDateTimeRelative } from "../../Functions/FormatDate";
import { useRecoilState } from "recoil";
import { notificationsState } from "../../Functions/GlobalState";
import { Delete, MarkEmailRead, MarkEmailUnread } from "@mui/icons-material";
import {
  DeleteNotification,
  MarkNotificationAsRead,
} from "../../Functions/Server";
import { useEffect, useState } from "react";
import "./Notifications.css";

// This page implements the notifications page, This page allows users to view their notifications.
// Users can then also mark all or individual notifications as read, 
// filter between read and unread and none and also delete notifications

export default function Notifications() {
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const filterTypes = {
    NONE: "None",
    READ: "Read",
    UNREAD: "Unread",
  };
  const [filterValue, setFilterValue] = useState(filterTypes.NONE);
  const [activeNotifications, setActiveNotifications] = useState(notifications);

  useEffect(() => {
    function filterActiveNotifications() {
      if (filterValue === filterTypes.NONE) {
        setActiveNotifications(notifications);
      } else if (filterValue === filterTypes.READ) {
        let newActiveNotifications = notifications.filter(
          (notification) => notification.isRead
        );
        setActiveNotifications(newActiveNotifications);
      } else if (filterValue === filterTypes.UNREAD) {
        let newActiveNotifications = notifications.filter(
          (notification) => !notification.isRead
        );
        setActiveNotifications(newActiveNotifications);
      }
    }
    filterActiveNotifications();
  }, [filterValue, notifications]);

  async function markNotificationAsRead(notificationId) {
    let updatedNotification = await MarkNotificationAsRead(notificationId);
    let updatedNotifications = notifications.map((notification) => {
      if (notification.id === updatedNotification.id)
        return updatedNotification;
      return notification;
    });
    setNotifications(updatedNotifications);
  }

  async function markAllNotificationAsRead() {
    let updatedNotifications = notifications
      .filter((notification) => !notification.isRead)
      .map(async (notification) => {
        let updatedNotification = await MarkNotificationAsRead(notification.id);
        return updatedNotification
      });
    setNotifications(updatedNotifications);
  }

  async function deleteNotification(notificationId) {
    let deletedNotificationId = await DeleteNotification(notificationId);
    let updatedNotifications = notifications.filter(
      (notification) => notification.id !== deletedNotificationId
    );
    setNotifications(updatedNotifications);
  }

  return (
    <Flex className="page" direction="column">
      <Flex
        marginBottom="20px"
        justifyContent="space-between"
        alignItems="center"
        wrap="wrap"
      >
        <Heading level={3}>Notifications</Heading>
        <Flex gap="20px">
          <Text
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="large"
          >
            Filter:
          </Text>
          <Select
            style={{
              border: "none",
              backgroundColor: "#008080",
              color: "#f9f9f9",
              width: "150px",
            }}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <MenuItem value={filterTypes.NONE}>{filterTypes.NONE}</MenuItem>
            <MenuItem value={filterTypes.UNREAD}>{filterTypes.UNREAD}</MenuItem>
            <MenuItem value={filterTypes.READ}>{filterTypes.READ}</MenuItem>
          </Select>
          <Button
            backgroundColor="#008080"
            border="none"
            disabled={activeNotifications.every(
              (notification) => notification.isRead
            )}
            onClick={() => markAllNotificationAsRead()}
          >
            <Tooltip
              title={
                activeNotifications.length === 0
                  ? "No notifications to mark as read"
                  : activeNotifications.every(
                      (notification) => notification.isRead
                    )
                  ? "All notifications have been marked as read"
                  : "Mark all notifications as read"
              }
              arrow
            >
              <Text style={{ cursor: "inherit", color: "inherit" }}>
                Mark all as Read
              </Text>
            </Tooltip>
          </Button>
        </Flex>
      </Flex>
      <Flex className="notifications">
        <Flex className="notifications-container">
          <View className="notifications-table-container">
            <Table className="notifications-table" variation="striped">
              <TableHead>
                <TableRow>
                  <th>Message</th>
                  <th>Date Received</th>
                  <th>Actions</th>
                </TableRow>
              </TableHead>
              {activeNotifications.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <td colSpan="3">
                      <Flex justifyContent="center" alignItems="center">
                        <Text fontSize="1rem" opacity="75%">
                          No Notifications
                        </Text>
                      </Flex>
                    </td>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {activeNotifications.map((notification) => {
                    return (
                      <TableRow key={notification.id}>
                        <td>
                          <Text>{notification.message}</Text>
                        </td>
                        <td>
                          <Text>
                            {formatDateTimeRelative(notification.createdAt)}
                          </Text>
                        </td>
                        <td>
                          <Text as="div">
                            <Flex justifyContent="center">
                              {notification.isRead ? (
                                <MarkEmailRead className="icon read" />
                              ) : (
                                <Tooltip title="Mark as Read" arrow>
                                  <MarkEmailUnread
                                    className="icon"
                                    onClick={() =>
                                      markNotificationAsRead(notification.id)
                                    }
                                  />
                                </Tooltip>
                              )}
                              <Divider orientation="vertical" />
                              <Tooltip title="Delete Notification">
                                <Delete
                                  className="icon delete"
                                  onClick={() =>
                                    deleteNotification(notification.id)
                                  }
                                />
                              </Tooltip>
                            </Flex>
                          </Text>
                        </td>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </View>
        </Flex>
      </Flex>
    </Flex>
  );
}

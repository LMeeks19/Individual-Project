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
import { Tooltip } from "@mui/material";
import { formatDateTimeRelative } from "../../Functions/FormatDate";
import { useRecoilState } from "recoil";
import { notificationsState } from "../../Functions/GlobalState";
import "./Notifications.css";
import { Delete, MarkEmailRead, MarkEmailUnread } from "@mui/icons-material";
import {
  DeleteNotification,
  MarkNotificationAsRead,
} from "../../Functions/Server";

export default function Notifications() {
  const [notifications, setNotifications] = useRecoilState(notificationsState);

  async function markNotificationAsRead(notificationId) {
    let updatedNotification = await MarkNotificationAsRead(notificationId);
    let updatedNotifications = [...notifications].map((notification) => {
      if (notification.id === updatedNotification.id)
        return updatedNotification;
      return notification;
    });
    setNotifications([...updatedNotifications]);
  }

  async function markAllNotificationAsRead() {
    let updatedNotifications = [...notifications].map(async (notification) => {
      return await MarkNotificationAsRead(notification.id);
    });
    setNotifications([...updatedNotifications]);
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
      >
        <Heading level={3}>Notifications</Heading>
        <Button
          backgroundColor="#008080"
          border="none"
          disabled={notifications.every((notification) => notification.isRead)}
          onClick={() => markAllNotificationAsRead()}
        >
          <Tooltip
            title={
              notifications.length === 0
                ? "No notifications to mark as read"
                : notifications.every((notification) => notification.isRead)
                ? "All notifications have been marked as read"
                : "Mark all notifications as read"
            }
            arrow
          >
            Mark all as Read
          </Tooltip>
        </Button>
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
              {notifications.length === 0 ? (
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
                  {notifications.map((notification) => {
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

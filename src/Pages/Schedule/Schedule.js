import {
  Flex,
  View,
  Heading,
  Text,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import "./Schedule.css";
import Calendar from "react-calendar";
import { formatDayOfWeekDate, formatTime } from "../../Functions/FormatDate";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserState,
  eventsState,
  modalState,
} from "../../Functions/GlobalState";
import { GetEvents, UpdateEventStatus } from "../../Functions/Server";
import { EventStatus } from "../../Functions/Enums";
import { ChangeCircle } from "@mui/icons-material";
import ConfirmModal from "../../Modals/ConfirmModal";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useRecoilState(eventsState);
  const setModal = useSetRecoilState(modalState);
  const currentUser = useRecoilValue(currentUserState);
  const eventStatus = new EventStatus();

  useEffect(() => {
    async function getEvents() {
      setIsLoading(true);
      if (currentUser.id !== null) {
        const selectedDateEvents = await GetEvents(
          selectedDate,
          currentUser.id
        );
        setEvents(
          selectedDateEvents.sort((a, b) => a.date.localeCompare(b.date))
        );
      }
      setIsLoading(false);
    }
    getEvents();
  }, [selectedDate]);

  async function updateEventStatus(event) {
    setIsLoading(true);
    const status =
      event.status === eventStatus.SCHEDULED
        ? eventStatus.CANCELLED
        : eventStatus.SCHEDULED;
    const updatedEvent = await UpdateEventStatus(event.id, status);
    const updatedEvents = [...events].map((event) => {
      if (event.id === updatedEvent.id) {
        return updatedEvent;
      }
      return event;
    });
    setEvents(updatedEvents);
    setIsLoading(false);
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <Flex className="page" direction="column">
      <Flex
        marginBottom="20px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading level={3}>Schedule</Heading>
      </Flex>
      <Flex className="schedule" gap="40px">
        <Flex className="calendar-container">
          <Calendar
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
          />
        </Flex>
        <Flex className="events-container">
          <Text level={5} className="header">
            {formatDayOfWeekDate(selectedDate)} Events
          </Text>
          <View className="events">
            <Table className="events-table" variation="striped">
              <TableHead>
                <TableRow>
                  <th>Organiser</th>
                  <th>Location</th>
                  <th>Time</th>
                  <th>Status</th>
                </TableRow>
              </TableHead>
              {isLoading || events.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <td colSpan="4">
                      {isLoading ? (
                        <Flex justifyContent="center" alignItems="center">
                          <Text fontSize="1rem" opacity="75%">
                            Loading
                          </Text>
                          <CircularProgress />
                        </Flex>
                      ) : (
                        <Flex justifyContent="center" alignItems="center">
                          <Text fontSize="1rem" opacity="75%">
                            No Events Scheduled
                          </Text>
                        </Flex>
                      )}
                    </td>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {events.map((event) => {
                    return (
                      <TableRow
                        className={
                          event.status === eventStatus.CANCELLED &&
                          event.createdByProfileId !== currentUser.id
                            ? "event-disabled"
                            : ""
                        }
                      >
                        <td>
                          <Text>{event.organiserName}</Text>
                        </td>
                        <td>
                          <Text>{event.location}</Text>
                        </td>
                        <td>
                          <Text>{formatTime(event.date)}</Text>
                        </td>
                        <td>
                          <Flex
                            justifyContent="center"
                            alignItems="center"
                            gap="10px"
                          >
                            <Text
                              color={
                                event.status === eventStatus.CANCELLED
                                  ? "red"
                                  : "green"
                              }
                            >
                              {event.status}
                            </Text>
                            {event.createdByProfileId === currentUser.id ? (
                              <Text display="flex">
                                <Tooltip title="Update Event Status" arrow>
                                  <ChangeCircle
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      openModal(
                                        <ConfirmModal
                                          function={() => updateEventStatus(event)}
                                        />,
                                        "Confirm Status Change"
                                      )
                                    }
                                  />
                                </Tooltip>
                              </Text>
                            ) : (
                              <></>
                            )}
                          </Flex>
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

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
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import "./Schedule.css";
import Calendar from "react-calendar";
import { formatDate, formatTime } from "../../Functions/FormatDate";
import { useRecoilState } from "recoil";
import { eventsState } from "../../Functions/GlobalState";
import { GetEvents } from "../../Functions/Server";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useRecoilState(eventsState);

  useEffect(() => {
    async function getEvents() {
      setIsLoading(true);
      const selectedDateEvents = await GetEvents(selectedDate);
      setEvents(
        selectedDateEvents.sort((a, b) => a.date.localeCompare(b.date))
      );
      setIsLoading(false);
    }
    getEvents();
  }, [selectedDate]);

  function onDateChange(selectedDate) {
    setSelectedDate(selectedDate);
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
            onChange={(date) => onDateChange(date)}
            value={selectedDate}
          />
        </Flex>
        <Flex className="events-container">
          <Text level={5} className="header">
            {formatDate(selectedDate)} Events
          </Text>
          <View className="events">
            <Table className="events-table" variation="striped">
              <TableHead>
                <TableRow>
                  <th>Opposing Coach</th>
                  <th>Location</th>
                  <th>Time</th>
                </TableRow>
              </TableHead>
              {isLoading || events.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <td colSpan="3">
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
                      <TableRow>
                        <td>
                          <Text>{event.opposingCoach}</Text>
                        </td>
                        <td>
                          <Text>{event.location}</Text>
                        </td>
                        <td>
                          <Text>{formatTime(event.date)}</Text>
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

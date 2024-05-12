import "@aws-amplify/ui-react/styles.css";
import React, { useEffect, useState } from "react";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  modalState,
  notificationsState,
} from "../Functions/GlobalState";
import NavBar from "../Components/NavBar";
import NavRouter from "../Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import {
  GetProfile,
  GetPlayersByProfileId,
  GetTeamByProfileId,
  GetNotificationsByProfileId,
} from "../Functions/Server";
import "./Page.css";
import WarningMessage from "../Components/Warning-Message";
import Modal from "../Modals/Modal";
import { SnackbarProvider } from "notistack";
import PreLoadScreen from "../Components/PreLoadScreen";
import { onCreateNotification } from "../graphql/subscriptions";
import { generateClient } from "aws-amplify/api";
import SnackbarAlert from "../Components/Snackbar";

// This is the base template that all other pages are based off of and contains the initial api calls to get the currenct user

export default function Page() {
  const modal = useRecoilValue(modalState);
  const { user } = useAuthenticator();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const client = generateClient();

  useEffect(() => {
    async function fetchUser() {
      setCurrentUser({
        ...(await GetProfile(user)),
        players: await GetPlayersByProfileId(user.userId),
        team: await GetTeamByProfileId(user.userId),
      });
      setNotifications(await GetNotificationsByProfileId(user.userId));
      setIsLoading(false);
    }
    fetchUser();
    getNotifications();
  }, []);

  useEffect(() => {
    async function getNotifications() {
      setIsLoading(true);
      const sub = client
        .graphql({
          query: onCreateNotification,
        })
        .subscribe({
          next: async ({ data }) => {
            if (data.onCreateNotification.toProfileId === currentUser.id) {
              let newNotifications = [
                ...notifications,
                ...[data.onCreateNotification],
              ];
              setNotifications(newNotifications);
              new SnackbarAlert().info(
                `Notification Recieved: ${data.onCreateNotification.message}`
              );
            }
          },
          error: (error) => console.log(error),
        });
      setIsLoading(false);
    }
    getNotifications();
  }, [notifications]);

  if (isLoading) {
    return <PreLoadScreen />;
  } else {
    return (
      <SnackbarProvider
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Router>
          {modal.isShown ? <Modal /> : <></>}
          <View className={`layout ${modal.isShown ? "page-disabled" : ""}`}>
            <NavBar />
            <View className="container">
              <WarningMessage />
              <NavRouter />
            </View>
          </View>
        </Router>
      </SnackbarProvider>
    );
  }
}

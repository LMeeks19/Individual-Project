import "@aws-amplify/ui-react/styles.css";
import React, { useEffect, useState } from "react";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentUserState, modalState } from "../Functions/GlobalState";
import NavBar from "../Components/NavBar";
import NavRouter from "../Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import {
  GetProfile,
  GetPlayersByProfileId,
  GetTeamByProfileId,
} from "../Functions/Server";
import "./Page.css";
import WarningMessage from "../Components/Warning-Message";
import Modal from "../Modals/Modal";
import { SnackbarProvider } from "notistack";
import PreLoadScreen from "../Components/PreLoadScreen";

export default function Page() {
  const modal = useRecoilValue(modalState);
  const { user } = useAuthenticator();
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    async function fetchUser() {
      setCurrentUser({
        ...(await GetProfile(user)),
        players: await GetPlayersByProfileId(user.userId),
        team: await GetTeamByProfileId(user.userId),
      });
      setIsLoading(false);
    }
    fetchUser();
  }, []);

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

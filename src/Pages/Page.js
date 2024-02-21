import "@aws-amplify/ui-react/styles.css";
import React, { useEffect } from "react";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  warningIsShownState,
  modalState,
} from "../Functions/GlobalState";
import NavBar from "../Components/NavBar";
import NavRouter from "../Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import {
  FetchCurrentUser,
  GetCurrentUsersPlayers,
  GetTeamByProfileId,
} from "../Functions/Server";
import "./Page.css";
import WarningMessage from "../Components/Warning-Message";
import Modal from "../Components/Modals/Modal";

export default function Page() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const warningIsShown = useRecoilValue(warningIsShownState);
  const modal = useRecoilValue(modalState);

  const { user } = useAuthenticator();

  useEffect(() => {
    async function fetchUser() {
      setCurrentUser({
        ...await FetchCurrentUser(user),
        players: await GetCurrentUsersPlayers(user.userId),
        team: await GetTeamByProfileId(user.userId),
      });

      console.log(currentUser);
    }
    fetchUser();
  }, []);

  return (
    <Router>
      {modal.isShown ? <Modal /> : <></>}
      <View className={`layout ${modal.isShown ? "disabled" : ""}`}>
        <NavBar />
        <View className="container">
          {Object.values(currentUser).some((v) => v === null) &&
          warningIsShown ? (
            <WarningMessage />
          ) : (
            <></>
          )}
          <NavRouter />
        </View>
      </View>
    </Router>
  );
}

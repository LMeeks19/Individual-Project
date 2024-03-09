import "@aws-amplify/ui-react/styles.css";
import React, { useEffect } from "react";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import { useRecoilState, useRecoilValue } from "recoil";
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

export default function Page() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const modal = useRecoilValue(modalState);
  const { user } = useAuthenticator();

  useEffect(() => {
    async function fetchUser() {
      setCurrentUser({
        ...(await GetProfile(user)),
        players: await GetPlayersByProfileId(user.userId),
        team: await GetTeamByProfileId(user.userId),
      });
    }
    fetchUser();
  }, []);

  return (
    <Router>
      {modal.isShown ? <Modal /> : <></>}
      <View className={`layout ${modal.isShown ? "disabled" : ""}`}>
        <NavBar />
        <View className="container">
          <WarningMessage currentUser={currentUser} />
          <NavRouter />
        </View>
      </View>
    </Router>
  );
}

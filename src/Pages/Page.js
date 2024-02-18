import "@aws-amplify/ui-react/styles.css";
import React, { useEffect } from "react";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserState,
  usersRegisteredPlayersState,
  warningIsShownState,
  modalIsShownState,
} from "../Functions/GlobalState";
import NavBar from "../Components/NavBar";
import NavRouter from "../Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import { FetchCurrentUser, GetCurrentUsersPlayers } from "../Functions/Server";
import "./Page.css";
import WarningMessage from "../Components/Warning-Message";
import Modal from "../Components/Modals/Modal";

export default function Page() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const warningIsShown = useRecoilValue(warningIsShownState);
  const modalIsShown = useRecoilValue(modalIsShownState);
  const setUsersRegisteredPlayers = useSetRecoilState(
    usersRegisteredPlayersState
  );

  const { user } = useAuthenticator();

  useEffect(() => {
    async function fetchUser() {
      setCurrentUser(await FetchCurrentUser(user));
      setUsersRegisteredPlayers(await GetCurrentUsersPlayers(user.userId));
    }
    fetchUser();
  }, []);

  return (
    <Router>
      {modalIsShown ? <Modal /> : <></>}
      <View className={`layout ${modalIsShown ? "disabled" : ""}`}>
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

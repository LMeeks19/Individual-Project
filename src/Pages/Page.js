import "@aws-amplify/ui-react/styles.css";
import React, { useEffect } from "react";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, warningIsShownState } from "../State/GlobalState";
import NavBar from "../Components/NavBar";
import NavRouter from "../Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import { FetchCurrentUser } from "../State/Server";
import "./Page.css";
import WarningMessage from "../Components/Warning-Message";

export default function Page() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const warningIsShown = useRecoilValue(warningIsShownState);
  const { user } = useAuthenticator();

  useEffect(() => {
    async function fetchData() {
      setCurrentUser(await FetchCurrentUser(user));
    }
    fetchData();
  }, []);

  return (
    <Router>
      <View className="layout">
        <NavBar />
        <View className="container">
          {currentUser === null && warningIsShown ? <WarningMessage /> : <></>}
          <NavRouter />
        </View>
      </View>
    </Router>
  );
}

import "@aws-amplify/ui-react/styles.css";
import React, { useEffect } from "react";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CreateProfileModalIsShownState,
  UpdateProfileModalIsShownState,
  currentUserState,
  warningIsShownState,
} from "../State/GlobalState";
import NavBar from "../Components/NavBar";
import NavRouter from "../Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import { FetchCurrentUser } from "../State/Server";
import "./Page.css";
import WarningMessage from "../Components/Warning-Message";
import CreateProfileModal from "../Components/Modals/CreateProfileModal";
import UpdateProfileModal from "../Components/Modals/UpdateProfileModal";

export default function Page() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const warningIsShown = useRecoilValue(warningIsShownState);
  const createProfileModalIsShown = useRecoilValue(
    CreateProfileModalIsShownState
  );
  const updateProfileModalIsShown = useRecoilValue(
    UpdateProfileModalIsShownState
  );
  const { user } = useAuthenticator();

  useEffect(() => {
    async function fetchData() {
      setCurrentUser(await FetchCurrentUser(user));
    }
    fetchData();
  }, []);

  return (
    <Router>
      {createProfileModalIsShown ? <CreateProfileModal /> : <></>}
      {updateProfileModalIsShown ? <UpdateProfileModal /> : <></>}
      <View className={`layout ${(createProfileModalIsShown || updateProfileModalIsShown) ? "disabled" : ""}`}>
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

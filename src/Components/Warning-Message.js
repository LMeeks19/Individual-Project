import "./Warning-Message.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  warningIsShownState,
} from "../Functions/GlobalState";
import { Alert, IconButton } from "@mui/material";
import { Close, Warning } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Implementation of the warning message that is displayed when a users has no profile

export default function WarningMessage() {
  const [warningIsShown, setWarningIsShown] =
    useRecoilState(warningIsShownState);
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  return (
    <Alert
      className={`warning ${
        Object.values(currentUser).some((value) => value === null) &&
        warningIsShown && !window.location.href.endsWith("/messages")
          ? ""
          : "hide"
      }`}
      severity="warning"
      variant="filled"
      icon={<Warning fontSize="inherit" />}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={() => {
            setWarningIsShown(false);
          }}
        >
          <Close fontSize="inerit" />
        </IconButton>
      }
    >
      Various features will be unavailable until a <a href="" onClick={() => navigate("/account")}>profile</a> has been created</Alert>
  );
}

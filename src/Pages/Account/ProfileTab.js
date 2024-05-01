import React from "react";

import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  Button,
} from "@aws-amplify/ui-react";
import "./Account.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState, themeState } from "../../Functions/GlobalState";

import { MdLightMode, MdDarkMode } from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import UpdatePasswordModal from "../../Modals/AccountModals/UpdatePasswordModal";
import { Edit } from "@mui/icons-material";
import UpdateEmailModal from "../../Modals/AccountModals/UpdateEmailModal";
import { AccountType } from "../../Functions/Enums";
import { Tooltip } from "@mui/material";
import { formatDate } from "../../Functions/FormatDate";

// This file contains a variert if tables that eill be displayed when viewing certain parts of the account page

export function ViewPersonalTable(props) {

  return (
    <Table
      boxShadow="0 0 20px -4px #000"
      marginTop="20px"
      marginBottom="20px"
      highlightOnHover={false}
    >
      <TableBody>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Name</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.name ?? "N/A"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Date of Birth</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser.dob !== null
              ? formatDate(props.currentUser.dob)
              : "N/A"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Phone Number</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.phoneNumber ?? "N/A"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Account Type</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.accountType ?? "N/A"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ViewAddressTable(props) {
  return (
    <Table
      boxShadow="0 0 20px -4px #000"
      marginTop="20px"
      marginBottom="20px"
      highlightOnHover={false}
    >
      <TableBody>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Street</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.street ?? "N/A"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Town/City</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.townCity ?? "N/A"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">County</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.county ?? "N/A"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Postcode</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.postcode ?? "N/A"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ViewSecurityTable(props) {
  const accountTypes = new AccountType();
  const setModal = useSetRecoilState(modalState);

  function changePasswordTooltipMessage() {
    if (props.currentUser.accountType === accountTypes.NONE)
      return "Please create a profile first"
    return "Change password"
  }

  function openModal(component, title) {
    setModal({ component: component, title: title, isShown: true });
  }

  return (
    <Table
      boxShadow="0 0 20px -4px #000"
      marginTop="20px"
      marginBottom="20px"
      highlightOnHover={false}
    >
      <TableBody>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Username</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.username ?? "N/A"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Email</TableCell>
          <TableCell className="account-table-cell data">
            {props.currentUser?.email ?? "N/A"}
            {props.currentUser.accountType === accountTypes.NONE ? (
              <></>
            ) : (
              <Edit
                className="table-icon"
                fontSize="small"
                htmlColor="#f9f1f1"
                onClick={() => openModal(<UpdateEmailModal />, "Update Email")}
              />
            )}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Password</TableCell>
          <TableCell className="account-table-cell">
            <Tooltip title={changePasswordTooltipMessage()} arrow>
              <Button
                fontSize="medium"
                fontWeight="normal"
                border="none"
                padding="0 5px"
                disabled={props.currentUser.accountType === accountTypes.NONE}
                onClick={() =>
                  openModal(<UpdatePasswordModal />, "Update Password")
                }
              >
                Change Password
              </Button>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ViewSettingsTable() {
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <Card
      backgroundColor="#008080"
      padding="20px"
      borderRadius="15px"
      marginTop="20px"
      boxShadow="0px 0px 20px -4px #000"
    >
      <ToggleButtonGroup
        value={theme}
        height="20px"
        justifyContent="center"
        onChange={(value) => setTheme(value)}
        isExclusive
        isSelectionRequired
      >
        <ToggleButton value="light" width="100%">
          <MdLightMode />
        </ToggleButton>
        <ToggleButton value="dark" width="100%">
          <MdDarkMode />
        </ToggleButton>
        <ToggleButton value="system" width="100%">
          <VscColorMode />
        </ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
}

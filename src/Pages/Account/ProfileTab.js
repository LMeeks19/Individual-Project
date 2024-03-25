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

import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import { format } from "date-fns";
import ChangePasswordModal from "../../Modals/AccountModals/ChangePasswordModal";

export function ViewPersonalTable(props) {
  function formatDate(date) {
    return format(new Date(date), "do MMMM yyyy");
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
          <TableCell className="account-table-cell">Name</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.name ?? ""}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Date of Birth</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser.dob}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Phone Number</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.phoneNumber ?? ""}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Account Type</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.accountType ?? ""}
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
            {props.currentUser?.street ?? ""}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Town/City</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.townCity ?? ""}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">County</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.county ?? ""}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Postcode</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.postcode ?? ""}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ViewSecurityTable(props) {
  const setModal = useSetRecoilState(modalState);

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
            {props.currentUser?.username ?? ""}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Email</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.email ?? ""}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Password</TableCell>
          <TableCell className="account-table-cell">
            <Button
              fontSize="medium"
              fontWeight="normal"
              border="none"
              padding="0 5px"
              onClick={() =>
                openModal(<ChangePasswordModal />, "Change Password")
              }
            >
              Change Password
            </Button>
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

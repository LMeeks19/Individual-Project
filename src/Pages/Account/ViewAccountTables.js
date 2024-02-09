import React from "react";

import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  ToggleButtonGroup,
  ToggleButton,
} from "@aws-amplify/ui-react";
import "./Account.css";
import { useRecoilState } from "recoil";
import { themeState } from "../../State/GlobalState";

import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";

export function ViewPersonalTable(props) {

  return (
    <Table
      marginTop="20px"
      marginBottom="20px"
      className="account-table"
      highlightOnHover={false}
    >
      <TableBody>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Username</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.username ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Name</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.name ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Date of Birth</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.dob ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Email</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.email ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Phone Number</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.phoneNumber ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Account Type</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.accountType ?? "Undefined"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ViewAddressTable(props) {
  return (
    <Table
      marginTop="20px"
      marginBottom="20px"
      className="account-table"
      highlightOnHover={false}
    >
      <TableBody>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Name/Number</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.buildingNameNumber ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Street</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.street ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Town/City</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.townCity ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">County</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.county ?? "Undefined"}
          </TableCell>
        </TableRow>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Postcode</TableCell>
          <TableCell className="account-table-cell">
            {props.currentUser?.postcode ?? "Undefined"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ViewSecurityTable(props) {
  return (
    <Table
      marginTop="20px"
      marginBottom="20px"
      className="account-table"
      highlightOnHover={false}
    >
      <TableBody>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Password</TableCell>
          <TableCell className="account-table-cell"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function ViewSettingsTable() {
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <Table
      marginTop="20px"
      marginBottom="20px"
      className="account-table"
      highlightOnHover={false}
    >
      <TableBody>
        <TableRow className="account-table-row">
          <TableCell className="account-table-cell">Mode</TableCell>
          <TableCell className="account-table-cell">
            <ToggleButtonGroup
              value={theme}
              height="20px"
              justifyContent="center"
              onChange={(value) => setTheme(value)}
              isExclusive
              isSelectionRequired
            >
              <ToggleButton value="light">
                <MdLightMode />
              </ToggleButton>
              <ToggleButton value="dark">
                <MdDarkMode />
              </ToggleButton>
              <ToggleButton value="system">
                <VscColorMode />
              </ToggleButton>
            </ToggleButtonGroup>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

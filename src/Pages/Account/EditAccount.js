import {
  Button,
  Flex,
  Heading,
  Tabs,
  View,
  Text,
  useAuthenticator,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Input,
} from "@aws-amplify/ui-react";
import "./Account.css";

import { useState, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";

import { currentUserState } from "../../State/GlobalState";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import {
  UpdateProfile,
  FetchCurrentUser,
} from "../../State/Server";

export default function EditAccount() {
  const { signOut } = useAuthenticator();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [tempCurrentUser, setTempCurrentUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setCurrentUser(await FetchCurrentUser(currentUser));
      setTempCurrentUser(currentUser);
    }
    fetchData();
  }, []);

  const saveProfileUpdate = async () => {
    setCurrentUser(await UpdateProfile(tempCurrentUser));
  };

  return (
    <View className="page">
      <Flex className="heading" direction="row" justifyContent="space-between">
        <Heading level={3}>ACCOUNT</Heading>
        <Button className="custom-button" variation="primary" onClick={signOut}>
          <Text display="flex">
            <LogoutIcon fontSize="small" className="icon" />
            <Text marginLeft="5px">SignOut</Text>
          </Text>
        </Button>
      </Flex>
      <Tabs.Container defaultValue="1">
        <Tabs.List>
          <Tabs.Item className="account-tab" value="1">
            PROFILE
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="2">
            SECURITY
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="3">
            PLAYERS
          </Tabs.Item>
          <Tabs.Item className="account-tab" value="4">
            SETTINGS
          </Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="1">
          <Flex marginBottom="20px" justifyContent="space-between">
            <Heading level={2}>Profile</Heading>
            <Flex justifyContent="flex-end">
              <Link className="link" to={"/view-account"} component={Link}>
                <Button className="custom-button" variation="primary" onClick={saveProfileUpdate}>
                  <Text display="flex">
                    <SaveIcon fontSize="small" className="icon" />
                    <Text marginLeft="5px">Save</Text>
                  </Text>
                </Button>
              </Link>
              <Link className="link" to={"/view-account"} component={Link}>
                <Button className="custom-button" variation="primary">
                  <Text display="flex">
                    <CloseIcon fontSize="small" className="icon" />
                    <Text marginLeft="5px">Cancel</Text>
                  </Text>
                </Button>
              </Link>
            </Flex>
          </Flex>

          <Heading level={4}>Personal</Heading>
          <Table
            marginTop="20px"
            marginBottom="20px"
            className="account-table"
            highlightOnHover={false}
          >
            <TableBody>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">Username</TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.username}
                    isReadOnly
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">Name</TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.name}
                    onChange={(e) => setTempCurrentUser({...tempCurrentUser, name: e.target.value})}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">
                  Date of Birth
                </TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.dob}
                    onChange={(e) => setTempCurrentUser({...tempCurrentUser, dob: e.target.value})}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">Email</TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.email}
                    isReadOnly
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">
                  Phone Number
                </TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.phoneNumber}
                    onChange={(e) => setTempCurrentUser({...tempCurrentUser, phoneNumber: e.target.value})}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">
                  Account Type
                </TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.accountType}
                    isReadOnly
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Heading level={4}>Address</Heading>
          <Table
            marginTop="20px"
            marginBottom="20px"
            className="account-table"
            highlightOnHover={false}
          >
            <TableBody>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">
                  Name/Number
                </TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.buildingNameNumber}
                    onChange={(e) => setTempCurrentUser({...tempCurrentUser, buildingNameNumber: e.target.value})}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">Street</TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.street}
                    onChange={(e) => setTempCurrentUser({...tempCurrentUser, street: e.target.value})}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">Town/City</TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.townCity}
                    onChange={(e) => setTempCurrentUser({...tempCurrentUser, townCity: e.target.value})}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">County</TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.county}
                    onChange={(e) => setTempCurrentUser({...tempCurrentUser, county: e.target.value})}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="account-table-row">
                <TableCell className="account-table-cell">Postcode</TableCell>
                <TableCell className="account-table-cell ">
                  <Input
                    className="account-table-cell-input"
                    variation="quiet"
                    defaultValue={currentUser.postcode}
                    onChange={(e) => setTempCurrentUser({...tempCurrentUser, postcode: e.target.value})}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Tabs.Panel>
      </Tabs.Container>
    </View>
  );
}

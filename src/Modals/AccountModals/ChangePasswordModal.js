import { View, Flex, Button, Grid, PasswordField } from "@aws-amplify/ui-react";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { useEffect, useState } from "react";
import { updatePassword } from "aws-amplify/auth";

export default function ChangePasswordModal() {
  const setModal = useSetRecoilState(modalState);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [hasMatchError, setHasMatchError] = useState(false);
  const [hasFormatError, setHasFormatError] = useState(false);
  const snackbarAlert = new SnackbarAlert();

  async function changeUserPassword() {
    try {
      await updatePassword({ oldPassword, newPassword }).then(() =>
        snackbarAlert.success("Password successfully changed")
      );
    } catch (e) {
      snackbarAlert.error(e.message);
    }
    setModal({ component: null, title: null, isShown: false });
  }

  return (
    <View overflow="auto" padding="40px">
      <Grid
        as="form"
        rowGap="15px"
        columnGap="15px"
        onSubmit={(event) => {
          event.preventDefault();
          changeUserPassword();
        }}
      >
        <PasswordField
          label="Current Password"
          placeholder="Enter your current password"
          isRequired={true}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <PasswordField
          label="New Password"
          autoComplete="new-password"
          descriptiveText="Required format: at least 1 uppercase, 1 lowercase, 1 symbol, minimum of 8 characters"
          placeholder="Enter your new password"
          isRequired={true}
          value={newPassword}
          onChange={(e) => {
            let passwordRegex = new RegExp(
              /^(?!\s)(?![\s\S]*\s$)(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W])[a-zA-Z0-9\W\s()-]{8,}$/
            );
            if (
              !passwordRegex.test(e.target.value) &&
              e.target.value.length >= 5
            ) {
              setHasFormatError(true);
            } else {
              setHasFormatError(false);
            }
            if (e.target.value === "") {
              setHasFormatError(false);
            }
            setNewPassword(e.target.value);
          }}
          hasError={hasFormatError}
          errorMessage="Your password does not match the required format"
        />
        <PasswordField
          label="Confirm New Password"
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          isRequired={true}
          value={confirmNewPassword}
          onChange={(e) => {
            if (e.target.value !== newPassword) {
              setHasMatchError(true);
            } else {
              setHasMatchError(false);
            }
            setConfirmNewPassword(e.target.value);
          }}
          hasError={hasMatchError}
          errorMessage="Your new passwords do not match"
        />

        <Flex justifyContent="space-between">
          <Button
            children="Clear"
            type="reset"
            onClick={(event) => {
              event.preventDefault();
              setOldPassword("");
              setNewPassword("");
              setConfirmNewPassword("");
              setHasMatchError(false);
              setHasFormatError(false);
            }}
            disabled={
              oldPassword === "" &&
              newPassword === "" &&
              confirmNewPassword === ""
            }
          ></Button>
          <Flex gap="15px">
            <Button
              children="Submit"
              type="submit"
              variation="primary"
              disabled={
                hasFormatError ||
                hasMatchError ||
                oldPassword === "" ||
                newPassword === "" ||
                confirmNewPassword === ""
              }
            ></Button>
          </Flex>
        </Flex>
      </Grid>
    </View>
  );
}

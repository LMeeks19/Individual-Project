import { View, Flex, Button, Grid, PasswordField } from "@aws-amplify/ui-react";
import { useSetRecoilState } from "recoil";
import { modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { useState } from "react";
import { updatePassword } from "aws-amplify/auth";

export default function UpdatePasswordModal() {
  const setModal = useSetRecoilState(modalState);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [hasMatchError, setHasMatchError] = useState(false);
  const [hasFormatError, setHasFormatError] = useState(false);
  const snackbarAlert = new SnackbarAlert();

  const isSubmitDisabled = hasFormatError || hasMatchError || oldPassword === "" || newPassword === "" || confirmNewPassword === "";
  const isResetDisabled = oldPassword === "" && newPassword === "" && confirmNewPassword === "";

  function resetFormValues() {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setHasMatchError(false);
    setHasFormatError(false);
  }

  async function submitFormValues() {
    try {
      await updatePassword({ oldPassword, newPassword }).then(() =>
        snackbarAlert.success("Password successfully changed")
      );
    } catch (error) {
      snackbarAlert.error(error.message);
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
          submitFormValues();
        }}
      >
        <PasswordField
          label="Current Password"
          placeholder="Enter your current password"
          isRequired={true}
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
        <PasswordField
          label="New Password"
          autoComplete="new-password"
          descriptiveText="Required format: at least 1 uppercase, 1 lowercase, 1 symbol, minimum of 8 characters"
          placeholder="Enter your new password"
          isRequired={true}
          value={newPassword}
          onChange={(event) => {
            let passwordRegex = new RegExp(
              /^(?!\s)(?![\s\S]*\s$)(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W])[a-zA-Z0-9\W\s()-]{8,}$/
            );
            if (
              !passwordRegex.test(event.target.value) &&
              event.target.value.length >= 5
            ) {
              setHasFormatError(true);
            } else {
              setHasFormatError(false);
            }
            if (event.target.value === "") {
              setHasFormatError(false);
            }
            setNewPassword(event.target.value);
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
          onChange={(event) => {
            if (event.target.value !== newPassword) {
              setHasMatchError(true);
            } else {
              setHasMatchError(false);
            }
            setConfirmNewPassword(event.target.value);
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
              resetFormValues();
            }}
            disabled={isResetDisabled}
          ></Button>
          <Flex gap="15px">
            <Button
              children="Submit"
              type="submit"
              variation="primary"
              disabled={isSubmitDisabled}
            ></Button>
          </Flex>
        </Flex>
      </Grid>
    </View>
  );
}

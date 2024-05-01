import { View, Flex, Button, Grid, TextField } from "@aws-amplify/ui-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState } from "../../Functions/GlobalState";
import SnackbarAlert from "../../Components/Snackbar";
import { useState } from "react";
import {
  updateUserAttributes,
  confirmUserAttribute,
} from "aws-amplify/auth";
import { currentUserState } from "../../Functions/GlobalState";
import { GetProfileEmails, UpdateProfileEmail } from "../../Functions/Server";

// This component is used in the modal to update an email

export default function UpdateEmailModal() {
  const setModal = useSetRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [newEmail, setNewEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [showConfirmCodeUI, setShowConfrirmCodeUI] = useState(false);
  const snackbarAlert = new SnackbarAlert();

  function resetEmailFormValues() {
    setNewEmail("");
    setHasError(false);
  }

  async function submitFormValues(resend = false) {
    try {
      const emails = await GetProfileEmails(newEmail);
      console.log(emails.length);
      if (emails.length === 0) {
        await updateUserAttributes({
          userAttributes: {
            email: newEmail,
          },
        })
          .then(() => setShowConfrirmCodeUI(true))
          .then(() => {
            if (resend) {
              snackbarAlert.info(
                `Confirmation code was resent to: ${newEmail}`
              );
            } else {
              snackbarAlert.info(`Confirmation code was sent to: ${newEmail}`);
            }
          });
      } else {
        setErrorMessage("This email is already tied to another account");
        setHasError(true);
      }
    } catch (error) {
      snackbarAlert.error(error.message);
    }
  }

  async function handleConfirmUserAttribute() {
    try {
      await confirmUserAttribute({
        userAttributeKey: "email",
        confirmationCode: confirmCode,
      })
        .then(() => UpdateProfileEmail(currentUser.id, newEmail))
        .then(() => setCurrentUser({ ...currentUser, email: newEmail }))
        .then(() => snackbarAlert.success("Email successfully updated"))
        .then(() => setModal({ component: null, title: null, isShown: false }));
    } catch (error) {
      snackbarAlert.error(error.message);
    }
  }

  return (
    <View overflow="auto" padding="40px">
      {showConfirmCodeUI ? (
        <Grid
          as="form"
          rowGap="15px"
          columnGap="15px"
          onSubmit={(event) => {
            event.preventDefault();
            handleConfirmUserAttribute();
          }}
        >
          <TextField
            label="New Email"
            autoComplete="off"
            placeholder="Enter your confitmation code"
            descriptiveText={`Confirmation code was sent to: ${newEmail}`}
            isRequired={true}
            value={confirmCode}
            onChange={(event) => setConfirmCode(event.target.value)}
          />
          <Flex justifyContent="space-between">
            <Button
              children="Clear"
              type="reset"
              onClick={(event) => {
                event.preventDefault();
                setConfirmCode("");
              }}
              disabled={confirmCode === ""}
            />
            <Flex gap="15px">
              <Button
                children="Resend"
                variation="primary"
                onClick={(event) => {
                  event.preventDefault();
                  submitFormValues(true);
                }}
              />
            </Flex>
            <Flex gap="15px">
              <Button
                children="Confirm"
                type="submit"
                variation="primary"
                disabled={confirmCode === ""}
              />
            </Flex>
          </Flex>
        </Grid>
      ) : (
        <Grid
          as="form"
          rowGap="15px"
          columnGap="15px"
          onSubmit={(event) => {
            event.preventDefault();
            submitFormValues();
          }}
        >
          <TextField
            label="New Email"
            autoComplete="off"
            type="email"
            placeholder="Enter your new Email"
            isRequired={true}
            value={newEmail}
            onChange={(event) => {
              let emailRegex = new RegExp(
                /^(?!.*[^\S])(?!.*([._\-+]){2,})([a-zA-Z0-9][\s\S]{0,62}[a-zA-Z0-9])(@)([a-zA-Z0-9][\s\S]{0,251}[a-zA-Z0-9])(\.)(com|net|gov|edu|co\.uk|gov\.uk|ac\.uk)$/
              );
              if (!emailRegex.test(event.target.value)) {
                setHasError(true);
                setErrorMessage(
                  "Your password does not match the required format"
                );
              } else {
                setHasError(false);
              }
              if (event.target.value === "") {
                setHasError(false);
              }
              setNewEmail(event.target.value);
            }}
            hasError={hasError}
            errorMessage={errorMessage}
          />
          <Flex justifyContent="space-between">
            <Button
              children="Clear"
              type="reset"
              onClick={(event) => {
                event.preventDefault();
                resetEmailFormValues();
              }}
              disabled={newEmail === ""}
            />
            <Flex gap="15px">
              <Button
                children="Submit"
                type="submit"
                variation="primary"
                disabled={hasError || newEmail === ""}
              />
            </Flex>
          </Flex>
        </Grid>
      )}
    </View>
  );
}

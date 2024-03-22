import { Divider, Heading, View } from "@aws-amplify/ui-react";

import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { ProfileUpdateForm } from "../../ui-components";
import SnackbarAlert from "../../Components/Snackbar";

export default function UpdateProfileModal() {
  const setModal = useSetRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Profile Information
      </Heading>
      <Divider marginBottom="20px" />
      <ProfileUpdateForm
        padding="0"
        profile={{
          id: currentUser.id,
          username: currentUser.username,
          name: currentUser.name,
          dob: currentUser.dob,
          email: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
          accountType: currentUser.accountType,
          street: currentUser.street,
          townCity: currentUser.townCity,
          county: currentUser.county,
          postcode: currentUser.postcode,
        }}
        onSuccess={(data) => {
          setCurrentUser({
            ...currentUser,
            name: data.name,
            dob: data.dob,
            phoneNumber: data.phoneNumber,
            street: data.street,
            townCity: data.townCity,
            county: data.county,
            postcode: data.postcode,
          });
          new SnackbarAlert().success("Profile successfully updated");
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(error) => {
          new SnackbarAlert().error(
            "Unable to update Profile, please try again"
          );
        }}
      />
    </View>
  );
}

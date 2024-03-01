import { View, Heading, Divider } from "@aws-amplify/ui-react";
import { ProfileCreateForm } from "../../ui-components";
import { currentUserState, modalState } from "../../Functions/GlobalState";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function CreateProfileModal() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setModal = useSetRecoilState(modalState);

  return (
    <View overflow="auto" padding="40px">
      <Heading level={5} marginBottom="10px">
        Profile Information
      </Heading>
      <Divider marginBottom="20px" />
      <ProfileCreateForm
        onSubmit={(fields) => {
          const updatedFields = fields;
          updatedFields.id = currentUser.id;
          updatedFields.username = currentUser.username;
          updatedFields.email = currentUser.email;
          console.log(currentUser);
          return updatedFields;
        }}
        onSuccess={(data) => {
          setCurrentUser({
            id: data.id,
            username: data.username,
            name: data.name,
            dob: data.dob,
            email: data.email,
            phoneNumber: data.phoneNumber,
            accountType: data.accountType,
            street: data.street,
            townCity: data.townCity,
            county: data.county,
            postcode: data.postcode,
          });
          setModal({ component: null, title: null, isShown: false });
        }}
        onError={(error) => {
          // TODO: Error Message
        }}
      />
    </View>
  );
}

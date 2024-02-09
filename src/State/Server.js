import { generateClient } from "aws-amplify/api";
import { getProfile } from "../graphql/queries";
import {
  createProfile as createProfileMutation,
  updateProfile as updateProfileMutation,
} from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";

export async function FetchCurrentUser(user) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: getProfile,
    variables: { id: "33536d35-fb18-4f0d-8124-7ec32cc2ee8f" },
  });
  return apiData.data.getProfile;
}

export async function CreateProfile(user) {
  const client = generateClient();

  const loggedInUser = await fetchUserAttributes();
  const data = {
    id: `${user.userId}`,
    name: `${loggedInUser.name}`,
    dob: `${user.dob}`,
    username: `${user.username}`,
    email: `${loggedInUser.email}`,
    phoneNumber: `${user.phoneNumber}`,
    accountType: `${user.accountType}`,
    buildingNameNumber: `${user.buildingNameNumber}`,
    street: `${user.street}`,
    townCity: `${user.townCity}`,
    county: `${user.county}`,
    postcode: `${user.postcode}`,
  };
  var apidata = await client.graphql({
    query: createProfileMutation,
    variables: { input: data },
  });

  return apidata.data.createProfile;
}

export async function UpdateProfile(data) {
  const client = generateClient();

  const updatedProfile = await client.graphql({
    query: updateProfileMutation,
    variables: {
      input: {
        id: data.id,
        name: data.name,
        dob: data.dob,
        buildingNameNumber: data.buildingNameNumber,
        street: data.street,
        townCity: data.townCity,
        county: data.county,
        postcode: data.postcode,
        phoneNumber: data.phoneNumber,
      },
    },
  });

  return updatedProfile.data.updateProfile;
}

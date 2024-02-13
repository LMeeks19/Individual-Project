import { generateClient } from "aws-amplify/api";
import { getProfile } from "../graphql/queries";
import {
  createProfile as createProfileMutation,
  updateProfile as updateProfileMutation,
} from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";

export async function FetchCurrentUser(user) {
  const client = generateClient();
  const authenticationAttributes = fetchUserAttributes();


  const apiData = await client.graphql({
    query: getProfile,
    variables: { id: user.userId },
  });

  if (apiData.data.getProfile === null) {
    return {
      id: user.userId,
      username: user.username,
      email: (await authenticationAttributes).email,
      dob: null,
      phoneNumber: null,
      accountType: null,
      street: null,
      townCity: null,
      county: null,
      postcode: null,
    };
  }

  return apiData.data.getProfile;
}

export async function CreateProfile(data) {
  const client = generateClient();

  const createdProfile = await client.graphql({
    query: createProfileMutation,
    variables: {
      input: {
        id: data.id,
        name: data.name,
        dob: data.dob,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        accountType: data.accountType,
        street: data.street,
        townCity: data.townCity,
        county: data.county,
        postcode: data.postcode,
      },
    },
  });

  return createdProfile.data.createProfile;
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

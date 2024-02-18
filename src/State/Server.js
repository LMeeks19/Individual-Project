import { generateClient } from "aws-amplify/api";
import {
  getProfile,
  listProfiles,
  getPlayer as getPlayerQuery,
  listPlayers as listPlayersQuery,
  getPlayersByProfileId as getPlayersByProfileIdQuery,
} from "../graphql/queries";
import {
  createProfile as createProfileMutation,
  updateProfile as updateProfileMutation,
  deleteProfile as deleteProfileMutation,
  createPlayer as createPlayerMutation,
  updatePlayer as updatePlayerMutation,
  deletePlayer as deletePlayerMutation,
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

export async function DeleteProfile(id) {
  const client = generateClient();

  const deletedProfile = await client.graphql({
    query: deleteProfileMutation,
    variables: {
      input: {
        id: { id },
      },
    },
  });

  return deletedProfile.data.deleteProfile;
}

export async function GetAllProfiles() {
  const client = generateClient();

  const allProfiles = await client.graphql({
    query: listProfiles,
  });

  return allProfiles.data.listProfiles;
}

export async function CreatePlayer(data) {
  const client = generateClient();

  const newPlayer = await client.graphql({
    query: createPlayerMutation,
    variables: {
      input: {
        profileId: data.profileId,
        name: data.name,
        dob: data.dob,
        ageGroup: data.ageGroup,
        positions: data.positions,
        skillLevel: data.skillLevel,
      },
    },
  });

  return newPlayer.data.createPlayer;
}

export async function UpdatePlayer(data) {
  const client = generateClient();

  const updatedPlayer = await client.graphql({
    query: updatePlayerMutation,
    variables: {
      input: {
        id: data.id,
        profileId: data.profileId,
        name: data.name,
        dob: data.dob,
        ageGroup: data.ageGroup,
        positions: data.positions,
        skillLevel: data.skillLevel,
      },
    },
  });

  return updatedPlayer.data.updatePlayer;
}

export async function DeletePlayer(id) {
  const client = generateClient();

  await client.graphql({
    query: deletePlayerMutation,
    variables: {
      input: {
        id: id,
      },
    },
  });
}

export async function GetAllPlayers() {
  const client = generateClient();

  const allPlayers = await client.graphql({
    query: listPlayersQuery,
  });

  return allPlayers.data.listPlayers;
}

export async function GetPlayer(id) {
  const client = generateClient();

  const onePlayer = await client.graphql({
    query: getPlayerQuery,
    variables: { id: { id } },
  });

  return onePlayer.data.getPlayer;
}

export async function GetCurrentUsersPlayers(profileId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: getPlayersByProfileIdQuery,
    variables: { profileId: profileId },
  });

  return apiData.data.playersByProfileId.items;
}

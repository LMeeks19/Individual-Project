import { generateClient } from "aws-amplify/api";
import {
  getProfile,
  playersByProfileID,
  teamsByProfileID, 
  teamPlayersByTeamID,
} from "../graphql/queries";
import {
  createProfile as createProfileMutation,
  updateProfile as updateProfileMutation,
  deleteProfile as deleteProfileMutation,
  createPlayer as createPlayerMutation,
  updatePlayer as updatePlayerMutation,
  deletePlayer as deletePlayerMutation,
  createTeam as createTeamMutation,
  updateTeam as updateTeamMutation,
  deleteTeam as deleteTeamMutation,
  createTeamPlayer as createTeamPlayerMutation,
  updateTeamPlayer as updateTeamPlayerMutation,
  deleteTeamPlayer as deleteTeamPlayerMutation,
} from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";

export async function GetProfile(user) {
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
      players: [],
      team: []
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
        players: [],
        team: []
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

export async function CreatePlayer(data) {
  const client = generateClient();

  const newPlayer = await client.graphql({
    query: createPlayerMutation,
    variables: {
      input: {
        profileID: data.profileId,
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
        profileID: data.profileId,
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

export async function GetPlayersByProfileId(profileId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: playersByProfileID,
    variables: { profileID: profileId },
  });

  return apiData.data.playersByProfileID.items;
}

export async function CreateTeam(data) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: createTeamMutation,
    variables: {
      input: {
        id: data.id,
        profileID: data.profileId,
        name: data.name,
        league: data.league,
        ageGroup: data.ageGroup,
        location: data.location,
        email: data.email,
        phoneNumber: data.phoneNumber,
        website: data.website,
      },
    },
  });

  return apiData.data.createTeam;
}

export async function UpdateTeam(data) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: updateTeamMutation,
    variables: {
      input: {
        id: data.id,
        profileID: data.profileId,
        name: data.name,
        league: data.league,
        ageGroup: data.ageGroup,
        location: data.location,
        email: data.email,
        phoneNumber: data.phoneNumber,
        website: data.website,
      },
    },
  });

  return apiData.data.updateTeam;
}

export async function DeleteTeam(recordId) {
  const client = generateClient();

  const apidata = await client.graphql({
    query: deleteTeamMutation,
    variables: {
      input: {
        id: recordId,
      },
    },
  });

  return apidata.data.deleteTeam;
}

export async function GetTeamByProfileId(profileId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: teamsByProfileID,
    filter: { profileID: profileId },
  });

  return apiData.data.teamsByProfileID.items[0];
}

export async function CreateTeamPlayer(data) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: createTeamPlayerMutation,
    variables: {
      input: {
        id: data.id,
        teamID: data.teamId,
        name: data.name,
        age: data.age,
        kitNumber: data.kitNumber,
        positions: data.positions,
      },
    },
  });

  return apiData.data.createTeamPlayer;
}

export async function UpdateTeamPlayer(data) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: updateTeamPlayerMutation,
    variables: {
      input: {
        id: data.id,
        teamID: data.teamId,
        name: data.name,
        age: data.age,
        kitNumber: data.kitNumber,
        positions: data.positions,
      },
    },
  });

  return apiData.data.updateTeamPlayer;
}

export async function DeleteTeamPlayer(id) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: deleteTeamPlayerMutation,
    variables: {
      input: {
        id: id,
      },
    },
  });

  return apiData.data.deleteTeamPlayer;
}

export async function GetTeamPlayersByTeamId(teamId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: teamPlayersByTeamID,
    variables: { teamID: teamId },
  });

  return apiData.data.teamPlayersByTeamID.items;
}

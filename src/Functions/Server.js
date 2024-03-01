import { generateClient } from "aws-amplify/api";
import {
  getProfile,
  playersByProfileID,
  teamsByProfileID,
  teamPlayersByTeamID,
  listMatchPosts,
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
  createMatchPost as createMatchPostMutation,
  updateMatchPost as updateMatchPostMutation,
  deleteMatchPost as deleteMatchPostMutation,
} from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";

export async function GetProfile(user) {
  const client = generateClient();
  const authenticationAttributes = fetchUserAttributes();

  const apiData = await client.graphql({
    query: getProfile,
    variables: { id: user.userId },
  });

  const data = apiData.data.getProfile;

  return {
    id: data === null ? user.userId : data.id,
    name: data?.name,
    dob: data?.dob,
    username: data === null ? user.username : data.username,
    email: data === null ? (await authenticationAttributes).email : data.email,
    phoneNumber: data?.phoneNumber,
    accountType: data?.accountType,
    street: data?.street,
    townCity: data?.townCity,
    county: data?.county,
    postcode: data?.postcode,
  };
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

export async function DeletePlayer(id) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: deletePlayerMutation,
    variables: {
      input: {
        id: id,
      },
    },
  });

  return apiData.data.deletePlayer.id;
}

export async function GetPlayersByProfileId(profileId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: playersByProfileID,
    variables: { profileID: profileId },
  });

  return apiData.data.playersByProfileID.items;
}

export async function DeleteTeam(team) {
  const client = generateClient();

  team.players.forEach((player) => DeleteTeamPlayer(player.id));

  await client.graphql({
    query: deleteTeamMutation,
    variables: {
      input: {
        id: team.id,
      },
    },
  });
}

export async function GetTeamByProfileId(profileId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: teamsByProfileID,
    variables: { profileID: profileId },
  });

  const team = apiData.data.teamsByProfileID.items[0];

  return {
    id: team?.id,
    profileId: team?.profileID,
    name: team?.name,
    league: team?.league,
    ageGroup: team?.ageGroup,
    location: team?.location,
    email: team?.email,
    phoneNumber: team?.phoneNumber,
    website: team?.website,
    players: team?.players?.items,
  };
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

  return apiData.data.deleteTeamPlayer.id;
}

export async function GetTeamPlayersByTeamId(teamId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: teamPlayersByTeamID,
    variables: { teamID: teamId },
  });

  return apiData.data.teamPlayersByTeamID.items;
}

export async function GetMatchPosts() {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listMatchPosts,
  });

  let data = apiData.data.listMatchPosts.items;

  data.forEach((post) => (post.interestedUsers = post.interestedUsers.items));
  return data;
}

export async function DeleteMatchPost(id) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: deleteMatchPostMutation,
    variables: {
      input: {
        id: id,
      },
    },
  });

  return apiData.data.deleteMatchPost.id;
}

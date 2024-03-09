import { generateClient } from "aws-amplify/api";
import {
  getProfile,
  playersByProfileID,
  teamsByProfileID,
  teamPlayersByTeamID,
  listMatchPosts,
  listChats,
  listChatMessages,
} from "../graphql/queries";
import {
  deleteProfile as deleteProfileMutation,
  deletePlayer as deletePlayerMutation,
  deleteTeam as deleteTeamMutation,
  deleteTeamPlayer as deleteTeamPlayerMutation,
  deleteMatchPost as deleteMatchPostMutation,
  createChatMessage as createChatMessageMutation,
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
    id: team?.id ?? null,
    profileId: team?.profileID ?? null,
    name: team?.name ?? null,
    league: team?.league ?? null,
    ageGroup: team?.ageGroup ?? null,
    location: team?.location ?? null,
    email: team?.email ?? null,
    phoneNumber: team?.phoneNumber ?? null,
    website: team?.website ?? null,
    players: team?.players?.items ?? [],
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

export async function GetChatsByProfileId(id) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listChats,
    variables: { filter: { userIDs: { contains: id } } },
  });

  let chats = apiData.data.listChats.items;

  chats.forEach((chat) => {
    chat.users = chat.users.items.map((user) => user.profile);
    chat.messages = []
  });
  return chats;
}

export async function CreateChatMessage(chatId, senderId, message) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: createChatMessageMutation,
    variables: {
      input: {
        chatID: chatId,
        senderUserID: senderId,
        message: message,
      },
    },
  });

  return apiData.data.createChatMessage;
}

export async function GetChatMessages(chatId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listChatMessages,
    variables: { filter: { chatID: { eq: chatId } } },
  });

  return apiData.data.listChatMessages.items;
}

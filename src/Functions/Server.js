import { generateClient } from "aws-amplify/api";
import {
  getProfile,
  playersByProfileID,
  teamsByProfileID,
  teamPlayersByTeamID,
  listMatchPosts,
  listChats,
  listChatMessages,
  listPlayerPosts,
} from "../graphql/queries";
import {
  deleteProfile as deleteProfileMutation,
  deletePlayer as deletePlayerMutation,
  deleteTeam as deleteTeamMutation,
  deleteTeamPlayer as deleteTeamPlayerMutation,
  deleteMatchPost as deleteMatchPostMutation,
  createChatMessage as createChatMessageMutation,
  createProfileMatchPost,
  deleteProfileMatchPost,
  updateMatchPost,
  deleteChat,
  deleteProfileChat,
  updateChat,
  deleteProfilePlayerPost,
  deletePlayerPost,
  updatePlayerPost,
  createProfilePlayerPost,
  createPlayerPlayerPost,
  deletePlayerPlayerPost,
} from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";

// Profile API Calls
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
        id: id,
      },
    },
  });

  return deletedProfile.data.deleteProfile;
}

// Player API Calls
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

// Team API Calls
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

// Team Player API Calls
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

// Match Post API Calls
export async function GetMatchPosts() {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listMatchPosts,
  });

  let data = apiData.data.listMatchPosts.items;

  data.forEach((post) => (post.interestedUsers = post.interestedUsers.items));
  return data;
}

export async function DeleteMatchPost(matchPost) {
  const client = generateClient();

  matchPost.interestedUsers.forEach(async (interestedUser) => {
    await client.graphql({
      query: deleteProfileMatchPost,
      variables: {
        input: {
          id: interestedUser.id,
        },
      },
    });
  });

  const apiData = await client.graphql({
    query: deleteMatchPostMutation,
    variables: {
      input: {
        id: matchPost.id,
      },
    },
  });

  return apiData.data.deleteMatchPost.id;
}

export async function AddMatchPostInterestedUser(profileId, matchPostId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: createProfileMatchPost,
    variables: {
      input: {
        profileId: profileId,
        matchPostId: matchPostId,
      },
    },
  });

  return apiData.data.createProfileMatchPost;
}

export async function RemoveMatchPostInterestedUser(interestedUserId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: deleteProfileMatchPost,
    variables: {
      input: {
        id: interestedUserId,
      },
    },
  });

  return apiData.data.deleteProfileMatchPost;
}

export async function SelectMatchPostOpponent(matchPostId, interestedUserId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: updateMatchPost,
    variables: {
      input: {
        id: matchPostId,
        selectedOpponent: interestedUserId,
        isActive: false,
      },
    },
  });

  let data = apiData.data.updateMatchPost;
  data.interestedUsers = data.interestedUsers.items;
  return data;
}

export async function ReactivateMatchPost(matchPostId, interestedUserId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: updateMatchPost,
    variables: {
      input: {
        id: matchPostId,
        selectedOpponent: null,
        isActive: true,
      },
    },
  });

  let data = apiData.data.updateMatchPost;
  data.interestedUsers = data.interestedUsers.items;
  return data;
}

// Chat API Calls
export async function GetChatsByProfileId(id) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listChats,
    variables: { filter: { userIDs: { contains: id } } },
  });

  let chats = apiData.data.listChats.items;

  chats.forEach((chat) => {
    chat.users = chat.users.items.map((user) => user.profile);
    chat.messages = [];
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

export async function DeleteChat(chat, currentUserId) {
  const client = generateClient();
  let updatedChat = [];

  chat.users.forEach(async (user) => {
    if (user.profileId === currentUserId) {
      const deletedUserId = await client.graphql({
        query: deleteProfileChat,
        variables: {
          input: {
            id: user.id,
          },
        },
      }).data.deleteProfileChat.id;

      updatedChat = await client.graphql({
        query: updateChat,
        variables: {
          input: {
            id: chat.id,
            user: chat.users.filter((user) => user.id !== deletedUserId),
          },
        },
      }).data.updateChat;
    }
  });

  if (updatedChat.users.length === 0) {
    const apiData = await client.graphql({
      query: deleteChat,
      variables: {
        input: {
          id: chat.id,
        },
      },
    });
    return apiData.data.deleteChat.id;
  }
  return null;
}

// Player Post API Calls
export async function GetPlayerPosts() {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listPlayerPosts,
  });

  let data = apiData.data.listPlayerPosts.items;

  data.forEach((playerPost) => {
    playerPost.interestedUsers = playerPost.interestedUsers.items;
    playerPost.registeredPlayers = playerPost.registeredPlayers.items;
  });
  return data;
}

export async function DeletePlayerPost(playerPost) {
  const client = generateClient();

  playerPost.interestedUsers.forEach(async (interestedUser) => {
    await client.graphql({
      query: deleteProfilePlayerPost,
      variables: {
        input: {
          id: interestedUser.id,
        },
      },
    });
  });

  const apiData = await client.graphql({
    query: deletePlayerPost,
    variables: {
      input: {
        id: playerPost.id,
      },
    },
  });

  return apiData.data.deletePlayerPost.id;
}

export async function AddPlayerPostInterestedUser(profileId, playerPostId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: createProfilePlayerPost,
    variables: {
      input: {
        profileId: profileId,
        playerPostId: playerPostId,
      },
    },
  });

  return apiData.data.createProfilePlayerPost;
}

export async function AddPlayerPostRegisteredPlayer(playerId, playerPostId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: createPlayerPlayerPost,
    variables: {
      input: {
        playerId: playerId,
        playerPostId: playerPostId,
      },
    },
  });

  return apiData.data.createProfilePlayerPost;
}

export async function RemovePlayerPostRegisteredPlayer(registeredPlayerId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: deletePlayerPlayerPost,
    variables: {
      input: {
        id: registeredPlayerId,
      },
    },
  });

  return apiData.data.deletePlayerPlayerPost;
}

export async function RemovePlayerPostInterestedUser(interestedUserId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: deleteProfilePlayerPost,
    variables: {
      input: {
        id: interestedUserId,
      },
    },
  });

  return apiData.data.deleteProfilePlayerPost.id;
}

export async function SelectPlayerPostPlayer(playerPost, selectedPlayerId) {
  const client = generateClient();

  let selectedPlayers = [...playerPost.selectedPlayers, selectedPlayerId];

  const apiData = await client.graphql({
    query: updatePlayerPost,
    variables: {
      input: {
        id: playerPost.id,
        selectedPlayers: selectedPlayers,
        isActive:
          playerPost.numOfPlayersNeeded === selectedPlayers.length
            ? false
            : true,
      },
    },
  });

  let data = apiData.data.updatePlayerPost;
  data.interestedUsers = data.interestedUsers.items;
  data.registeredPlayers = data.registeredPlayers.items;
  return data;
}

export async function UnselectPlayerPostPlayer(playerPost, selectedPlayerId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: updatePlayerPost,
    variables: {
      input: {
        id: playerPost.id,
        selectedPlayers: playerPost.selectedPlayers.filter(
          (id) => id !== selectedPlayerId
        ),
        isActive: true,
      },
    },
  });

  let data = apiData.data.updatePlayerPost;
  data.interestedUsers = data.interestedUsers.items;
  data.registeredPlayers = data.registeredPlayers.items;
  return data;
}

export async function ReactivatePlayerPost(playerPostId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: updatePlayerPost,
    variables: {
      input: {
        id: playerPostId,
        selectedPlayers: [],
        isActive: true,
      },
    },
  });

  let data = apiData.data.updatePlayerPost;
  data.interestedUsers = data.interestedUsers.items;
  data.registeredPlayers = data.registeredPlayers.items;
  return data;
}

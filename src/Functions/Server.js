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
  listEmailProfiles,
  listEvents,
} from "../graphql/queries";
import {
  deletePlayer,
  deleteTeam,
  deleteTeamPlayer,
  deleteMatchPost,
  createChatMessage,
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
  updateProfileEmail,
} from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";
import SnackbarAlert from "../Components/Snackbar";
import { formatDefaultDate } from "./FormatDate";

// Profile API Calls
export async function GetProfile(user) {
  const client = generateClient();
  const authenticationAttributes = fetchUserAttributes();

  const apiData = await client.graphql({
    query: getProfile,
    variables: { id: user.userId },
  });

  const profile = apiData.data.getProfile;

  return {
    id: profile === null ? user.userId : profile.id,
    name: profile === null ? null : profile.name,
    dob: profile === null ? null : profile.dob,
    username: profile === null ? user.username : profile.username,
    email:
      profile === null ? (await authenticationAttributes).email : profile.email,
    phoneNumber: profile === null ? null : profile.phoneNumber,
    accountType: profile === null ? null : profile.accountType,
    street: profile === null ? null : profile.street,
    townCity: profile === null ? null : profile.townCity,
    county: profile === null ? null : profile.county,
    postcode: profile === null ? null : profile.postcode,
  };
}

export async function GetProfileEmails(newEmail) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listEmailProfiles,
    variables: {
      filter: { email: { eq: newEmail } },
    },
  });

  return apiData.data.listProfiles.items;
}

export async function UpdateProfileEmail(currentUserId, newEmail) {
  const client = generateClient();

  try {
    await client.graphql({
      query: updateProfileEmail,
      variables: {
        input: {
          id: currentUserId,
          email: newEmail,
        },
      },
    });
  } catch (error) {
    new SnackbarAlert().error("Unable to update email, please try again");
  }
}

// Player API Calls
export async function DeletePlayer(player) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: deletePlayer,
      variables: {
        input: {
          id: player.id,
        },
      },
    });
    new SnackbarAlert().success(`Player: ${player.name} successfully deleted`);
    return apiData.data.deletePlayer.id;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to delete Player, please try again later"
    );
    return null;
  }
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

  try {
    await client.graphql({
      query: deleteTeam,
      variables: {
        input: {
          id: team.id,
        },
      },
    });
    new SnackbarAlert().success("Team successfully deleted");
  } catch (e) {
    new SnackbarAlert().error("Unable to delete Team, please try again later");
  }
}

export async function GetTeamByProfileId(profileId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: teamsByProfileID,
    variables: { profileID: profileId },
  });

  const team = apiData.data.teamsByProfileID.items[0] ?? null;

  return {
    id: team !== null ? team.id : null,
    profileId: team !== null ? team.profileID : null,
    name: team !== null ? team.name : null,
    league: team !== null ? team.league : null,
    ageGroup: team !== null ? team.ageGroup : null,
    location: team !== null ? team.location : null,
    email: team !== null ? team.email : null,
    phoneNumber: team !== null ? team.phoneNumber : null,
    website: team !== null ? team.website : null,
    players: team !== null ? team.players.items : [],
  };
}

// Team Player API Calls
export async function DeleteTeamPlayer(teamPlayer) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: deleteTeamPlayer,
      variables: {
        input: {
          id: teamPlayer.id,
        },
      },
    });
    new SnackbarAlert().success(
      `Team Player ${teamPlayer.name} Successfully deleted`
    );
    return apiData.data.deleteTeamPlayer.id;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to delete Team Player, please try again later"
    );
    return null;
  }
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

export async function GetUsersMatchPosts(profileId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listMatchPosts,
    variables: { filter: { createdByProfileID: { eq: profileId } } },
  });

  let data = apiData.data.listMatchPosts.items;

  data.forEach((post) => (post.interestedUsers = post.interestedUsers.items));
  return data;
}

export async function DeleteMatchPost(matchPost) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: deleteMatchPost,
      variables: {
        input: {
          id: matchPost.id,
        },
      },
    });
    new SnackbarAlert().success("Match Post successfully deleted");
    return apiData.data.deleteMatchPost.id;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to delete Match Post, please try again later"
    );
    return null;
  }
}

export async function AddMatchPostInterestedUser(profileId, matchPostId) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: createProfileMatchPost,
      variables: {
        input: {
          profileId: profileId,
          matchPostId: matchPostId,
        },
      },
    });
    new SnackbarAlert().success("Match Posts interest successfully registered");
    return apiData.data.createProfileMatchPost;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to register interest in this Match Post, please try again later"
    );
    return {};
  }
}

export async function RemoveMatchPostInterestedUser(interestedUserId) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: deleteProfileMatchPost,
      variables: {
        input: {
          id: interestedUserId,
        },
      },
    });
    new SnackbarAlert().success(
      "Match Posts interest successfully unregistered"
    );
    return apiData.data.deleteProfileMatchPost;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to unregister interest in this Match Post, please try again later"
    );
    return {};
  }
}

export async function SelectMatchPostOpponent(matchPostId, interestedUserId) {
  const client = generateClient();

  try {
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
    new SnackbarAlert().success("Match Post opponent successfully selected");
    return data;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to select opponent for this Match Post, please try again later"
    );
    return {};
  }
}

export async function ReactivateMatchPost(matchPostId) {
  const client = generateClient();
  try {
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
    new SnackbarAlert().success("Match Post successfully reactivated");
    return data;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to reactivate this Match Post, please try again later"
    );
    return {};
  }
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
    chat.users = chat.users.items;
    chat.messages = [];
  });
  return chats;
}

export async function CreateChatMessage(chatId, senderId, message) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: createChatMessage,
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
    playerPost.selectedPlayers = playerPost.selectedPlayers ?? [];
  });
  return data;
}

export async function GetUsersPlayerPosts(profileId) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listPlayerPosts,
    variables: { filter: { createdByProfileID: { eq: profileId } } },
  });

  let data = apiData.data.listPlayerPosts.items;

  data.forEach((playerPost) => {
    playerPost.interestedUsers = playerPost.interestedUsers.items;
    playerPost.registeredPlayers = playerPost.registeredPlayers.items;
    playerPost.selectedPlayers = playerPost.selectedPlayers ?? [];
  });
  return data;
}

export async function DeletePlayerPost(playerPost) {
  const client = generateClient();

  try {
    playerPost.registeredPlayers.forEach(async (registeredPlayers) => {
      await client.graphql({
        query: deletePlayerPlayerPost,
        variables: {
          input: {
            id: registeredPlayers.id,
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
    new SnackbarAlert().success("Player Post successfully deleted");
    return apiData.data.deletePlayerPost.id;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to delete Player Post, please try again later"
    );
    return null;
  }
}

export async function AddPlayerPostInterestedUser(profileId, playerPostId) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: createProfilePlayerPost,
      variables: {
        input: {
          profileId: profileId,
          playerPostId: playerPostId,
        },
      },
    });
    new SnackbarAlert().success("Player Post interest successfully registered");
    return apiData.data.createProfilePlayerPost;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to register interest in this Player Post, please try again later"
    );
    return {};
  }
}

export async function AddPlayerPostRegisteredPlayer(playerId, playerPostId) {
  const client = generateClient();
  try {
    const apiData = await client.graphql({
      query: createPlayerPlayerPost,
      variables: {
        input: {
          playerId: playerId,
          playerPostId: playerPostId,
        },
      },
    });
    new SnackbarAlert().success("Player successfully registered");
    return apiData.data.createProfilePlayerPost;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to register player for this Player Post, please try again later"
    );
    return {};
  }
}

export async function RemovePlayerPostRegisteredPlayer(registeredPlayerId) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: deletePlayerPlayerPost,
      variables: {
        input: {
          id: registeredPlayerId,
        },
      },
    });
    new SnackbarAlert().success("Player successfully unregistered");
    return apiData.data.deletePlayerPlayerPost;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to unregister player for this Player Post, please try again later"
    );
    return {};
  }
}

export async function RemovePlayerPostInterestedUser(interestedUserId) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: deleteProfilePlayerPost,
      variables: {
        input: {
          id: interestedUserId,
        },
      },
    });
    new SnackbarAlert().success(
      "Player Post interest successfully unregistered"
    );
    return apiData.data.deleteProfilePlayerPost.id;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to unregister interest in this Player Post, please try again later"
    );
    return {};
  }
}

export async function SelectPlayerPostPlayer(playerPost, selectedPlayerId) {
  const client = generateClient();

  try {
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
    new SnackbarAlert().success("Player successfully selected");
    return data;
  } catch (e) {
    new SnackbarAlert().error("Unable to select Player, please try agian");
    return {};
  }
}

export async function UnselectPlayerPostPlayer(playerPost, selectedPlayerId) {
  const client = generateClient();

  try {
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
    new SnackbarAlert().success("Player successfully unselected");
    return data;
  } catch (e) {
    new SnackbarAlert().error("Unable to unselect Player, please try agian");
    return {};
  }
}

export async function ReactivatePlayerPost(playerPostId) {
  const client = generateClient();

  try {
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
    new SnackbarAlert().success("Player Post successfully reactivated");
    return data;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to reactivate Player Post, please try agian"
    );
    return {};
  }
}

// Schedule API Calls
export async function GetEvents(dateTime) {
  const client = generateClient();

  let date = formatDefaultDate(dateTime);

  const apiData = await client.graphql({
    query: listEvents,
    variables: {
      filter: { date: { contains: date } },
    },
  });

  return apiData.data.listEvents.items;
}

//TODO: Create Events;

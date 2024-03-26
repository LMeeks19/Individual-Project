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
  listProfiles,
  listEmailProfiles,
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
  updateProfile,
  updateProfileEmail,
} from "../graphql/mutations";
import { fetchUserAttributes } from "aws-amplify/auth";
import SnackbarAlert from "../Components/Snackbar";

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

  try {
    const deletedProfile = await client.graphql({
      query: deleteProfileMutation,
      variables: {
        input: {
          id: id,
        },
      },
    });

    new SnackbarAlert().success("Profile successfully deleted");
    return deletedProfile.data.deleteProfile;
  } catch (e) {
    new SnackbarAlert().error(
      "Unable to delete Profile, please try again later"
    );
    return {};
  }
}

// Player API Calls
export async function DeletePlayer(id) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
      query: deletePlayerMutation,
      variables: {
        input: {
          id: id,
        },
      },
    });
    new SnackbarAlert().success("Player successfully deleted");
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
    team.players.forEach((player) => DeleteTeamPlayer(player.id));

    await client.graphql({
      query: deleteTeamMutation,
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

  try {
    const apiData = await client.graphql({
      query: deleteTeamPlayerMutation,
      variables: {
        input: {
          id: id,
        },
      },
    });
    new SnackbarAlert().success("Team Player Successfully deleted");
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

export async function DeleteMatchPost(matchPost) {
  const client = generateClient();

  try {
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

  try {
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
      new SnackbarAlert().success("Chat successfully deleted");
      return apiData.data.deleteChat.id;
    }
    new SnackbarAlert().success("Chat successfully deleted");
  } catch (e) {
    new SnackbarAlert().error("Unable to delete Chat, please try again later");
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

  try {
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

export async function GetProfileEmails(newEmail) {
  const client = generateClient();

  const apiData = await client.graphql({
    query: listEmailProfiles,
    variables: {
      filter: { email: { eq: newEmail } },
    },
  });

  return apiData.data.listProfiles.items
}

export async function UpdateProfileEmail(currentUserId, newEmail) {
  const client = generateClient();

  try {
    const apiData = await client.graphql({
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

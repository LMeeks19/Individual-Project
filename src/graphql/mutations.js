/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTeamPlayer = /* GraphQL */ `
  mutation CreateTeamPlayer(
    $input: CreateTeamPlayerInput!
    $condition: ModelTeamPlayerConditionInput
  ) {
    createTeamPlayer(input: $input, condition: $condition) {
      id
      name
      age
      kitNumber
      positions
      teamID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTeamPlayer = /* GraphQL */ `
  mutation UpdateTeamPlayer(
    $input: UpdateTeamPlayerInput!
    $condition: ModelTeamPlayerConditionInput
  ) {
    updateTeamPlayer(input: $input, condition: $condition) {
      id
      name
      age
      kitNumber
      positions
      teamID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTeamPlayer = /* GraphQL */ `
  mutation DeleteTeamPlayer(
    $input: DeleteTeamPlayerInput!
    $condition: ModelTeamPlayerConditionInput
  ) {
    deleteTeamPlayer(input: $input, condition: $condition) {
      id
      name
      age
      kitNumber
      positions
      teamID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      league
      ageGroup
      location
      email
      phoneNumber
      website
      profileID
      players {
        items {
          id
          name
          age
          kitNumber
          positions
          teamID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      associatedMatchPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          gameType
          ageGroup
          teamSize
          substitutionLimit
          cards
          halfLength
          kickOff
          street
          townCity
          county
          postcode
          isActive
          teamID
          teamName
          selectedOpponent
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      name
      league
      ageGroup
      location
      email
      phoneNumber
      website
      profileID
      players {
        items {
          id
          name
          age
          kitNumber
          positions
          teamID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      associatedMatchPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          gameType
          ageGroup
          teamSize
          substitutionLimit
          cards
          halfLength
          kickOff
          street
          townCity
          county
          postcode
          isActive
          teamID
          teamName
          selectedOpponent
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      name
      league
      ageGroup
      location
      email
      phoneNumber
      website
      profileID
      players {
        items {
          id
          name
          age
          kitNumber
          positions
          teamID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      associatedMatchPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          gameType
          ageGroup
          teamSize
          substitutionLimit
          cards
          halfLength
          kickOff
          street
          townCity
          county
          postcode
          isActive
          teamID
          teamName
          selectedOpponent
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
      id
      name
      dob
      ageGroup
      positions
      skillLevel
      profileID
      registeredPlayerPosts {
        items {
          id
          playerId
          playerPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
      id
      name
      dob
      ageGroup
      positions
      skillLevel
      profileID
      registeredPlayerPosts {
        items {
          id
          playerId
          playerPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
      id
      name
      dob
      ageGroup
      positions
      skillLevel
      profileID
      registeredPlayerPosts {
        items {
          id
          playerId
          playerPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
      id
      username
      name
      dob
      email
      accountType
      street
      townCity
      county
      postcode
      phoneNumber
      players {
        items {
          id
          name
          dob
          ageGroup
          positions
          skillLevel
          profileID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      team {
        items {
          id
          name
          league
          ageGroup
          location
          email
          phoneNumber
          website
          profileID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      matchPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          gameType
          ageGroup
          teamSize
          substitutionLimit
          cards
          halfLength
          kickOff
          street
          townCity
          county
          postcode
          isActive
          teamID
          teamName
          selectedOpponent
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedMatchPosts {
        items {
          id
          profileId
          matchPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      playerPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          ageGroup
          positionsNeeded
          numOfPlayersNeeded
          skillLevel
          kickOff
          street
          townCity
          county
          postcode
          isActive
          selectedPlayers
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedPlayerPosts {
        items {
          id
          profileId
          playerPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      chats {
        items {
          id
          profileId
          chatId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      username
      name
      dob
      email
      accountType
      street
      townCity
      county
      postcode
      phoneNumber
      players {
        items {
          id
          name
          dob
          ageGroup
          positions
          skillLevel
          profileID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      team {
        items {
          id
          name
          league
          ageGroup
          location
          email
          phoneNumber
          website
          profileID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      matchPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          gameType
          ageGroup
          teamSize
          substitutionLimit
          cards
          halfLength
          kickOff
          street
          townCity
          county
          postcode
          isActive
          teamID
          teamName
          selectedOpponent
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedMatchPosts {
        items {
          id
          profileId
          matchPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      playerPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          ageGroup
          positionsNeeded
          numOfPlayersNeeded
          skillLevel
          kickOff
          street
          townCity
          county
          postcode
          isActive
          selectedPlayers
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedPlayerPosts {
        items {
          id
          profileId
          playerPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      chats {
        items {
          id
          profileId
          chatId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
      id
      username
      name
      dob
      email
      accountType
      street
      townCity
      county
      postcode
      phoneNumber
      players {
        items {
          id
          name
          dob
          ageGroup
          positions
          skillLevel
          profileID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      team {
        items {
          id
          name
          league
          ageGroup
          location
          email
          phoneNumber
          website
          profileID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      matchPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          gameType
          ageGroup
          teamSize
          substitutionLimit
          cards
          halfLength
          kickOff
          street
          townCity
          county
          postcode
          isActive
          teamID
          teamName
          selectedOpponent
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedMatchPosts {
        items {
          id
          profileId
          matchPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      playerPosts {
        items {
          id
          title
          description
          createdByName
          createdByProfileID
          ageGroup
          positionsNeeded
          numOfPlayersNeeded
          skillLevel
          kickOff
          street
          townCity
          county
          postcode
          isActive
          selectedPlayers
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedPlayerPosts {
        items {
          id
          profileId
          playerPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      chats {
        items {
          id
          profileId
          chatId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMatchPost = /* GraphQL */ `
  mutation CreateMatchPost(
    $input: CreateMatchPostInput!
    $condition: ModelMatchPostConditionInput
  ) {
    createMatchPost(input: $input, condition: $condition) {
      id
      title
      description
      createdByName
      createdByProfileID
      gameType
      ageGroup
      teamSize
      substitutionLimit
      cards
      halfLength
      kickOff
      street
      townCity
      county
      postcode
      isActive
      teamID
      teamName
      interestedUsers {
        items {
          id
          profileId
          matchPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      selectedOpponent
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMatchPost = /* GraphQL */ `
  mutation UpdateMatchPost(
    $input: UpdateMatchPostInput!
    $condition: ModelMatchPostConditionInput
  ) {
    updateMatchPost(input: $input, condition: $condition) {
      id
      title
      description
      createdByName
      createdByProfileID
      gameType
      ageGroup
      teamSize
      substitutionLimit
      cards
      halfLength
      kickOff
      street
      townCity
      county
      postcode
      isActive
      teamID
      teamName
      interestedUsers {
        items {
          id
          profileId
          matchPostId
          profile {
            id
            username
            name
            dob
            email
            accountType
            street
            townCity
            county
            postcode
            phoneNumber
            team {
              items {
                id
                name
                league
                ageGroup
                location
                email
                phoneNumber
                website
                profileID
                createdAt
                updatedAt
                __typename
              }
              nextToken
              __typename
            }
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      selectedOpponent
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMatchPost = /* GraphQL */ `
  mutation DeleteMatchPost(
    $input: DeleteMatchPostInput!
    $condition: ModelMatchPostConditionInput
  ) {
    deleteMatchPost(input: $input, condition: $condition) {
      id
      title
      description
      createdByName
      createdByProfileID
      gameType
      ageGroup
      teamSize
      substitutionLimit
      cards
      halfLength
      kickOff
      street
      townCity
      county
      postcode
      isActive
      teamID
      teamName
      interestedUsers {
        items {
          id
          profileId
          matchPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      selectedOpponent
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPlayerPost = /* GraphQL */ `
  mutation CreatePlayerPost(
    $input: CreatePlayerPostInput!
    $condition: ModelPlayerPostConditionInput
  ) {
    createPlayerPost(input: $input, condition: $condition) {
      id
      title
      description
      createdByName
      createdByProfileID
      ageGroup
      positionsNeeded
      numOfPlayersNeeded
      skillLevel
      kickOff
      street
      townCity
      county
      postcode
      isActive
      interestedUsers {
        items {
          id
          profileId
          playerPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      registeredPlayers {
        items {
          id
          playerId
          playerPostId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      selectedPlayers
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePlayerPost = /* GraphQL */ `
  mutation UpdatePlayerPost(
    $input: UpdatePlayerPostInput!
    $condition: ModelPlayerPostConditionInput
  ) {
    updatePlayerPost(input: $input, condition: $condition) {
      id
      title
      description
      createdByName
      createdByProfileID
      ageGroup
      positionsNeeded
      numOfPlayersNeeded
      skillLevel
      kickOff
      street
      townCity
      county
      postcode
      isActive
      selectedPlayers
      createdAt
      updatedAt
      interestedUsers {
        items {
          id
          profileId
          playerPostId
          profile {
            id
            username
            name
            dob
            email
            accountType
            street
            townCity
            county
            postcode
            phoneNumber
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      registeredPlayers {
        items {
          id
          playerId
          playerPostId
          player {
            id
            name
            dob
            ageGroup
            positions
            skillLevel
            profileID
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const deletePlayerPost = /* GraphQL */ `
  mutation DeletePlayerPost(
    $input: DeletePlayerPostInput!
    $condition: ModelPlayerPostConditionInput
  ) {
    deletePlayerPost(input: $input, condition: $condition) {
      id
    }
  }
`;
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          id
          profileId
          chatId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      messages {
        items {
          id
          chatID
          senderUserID
          message
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      userIDs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          id
          profileId
          chatId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      messages {
        items {
          id
          chatID
          senderUserID
          message
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      userIDs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
      id
    }
  }
`;
export const createChatMessage = /* GraphQL */ `
  mutation CreateChatMessage(
    $input: CreateChatMessageInput!
    $condition: ModelChatMessageConditionInput
  ) {
    createChatMessage(input: $input, condition: $condition) {
      id
      chatID
      senderUserID
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChatMessage = /* GraphQL */ `
  mutation UpdateChatMessage(
    $input: UpdateChatMessageInput!
    $condition: ModelChatMessageConditionInput
  ) {
    updateChatMessage(input: $input, condition: $condition) {
      id
      chatID
      senderUserID
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChatMessage = /* GraphQL */ `
  mutation DeleteChatMessage(
    $input: DeleteChatMessageInput!
    $condition: ModelChatMessageConditionInput
  ) {
    deleteChatMessage(input: $input, condition: $condition) {
      id
      chatID
      senderUserID
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPlayerPlayerPost = /* GraphQL */ `
  mutation CreatePlayerPlayerPost(
    $input: CreatePlayerPlayerPostInput!
    $condition: ModelPlayerPlayerPostConditionInput
  ) {
    createPlayerPlayerPost(input: $input, condition: $condition) {
      id
      playerId
      playerPostId
      player {
        id
        name
        dob
        ageGroup
        positions
        skillLevel
        profileID
        registeredPlayerPosts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      playerPost {
        id
        title
        description
        createdByName
        createdByProfileID
        ageGroup
        positionsNeeded
        numOfPlayersNeeded
        skillLevel
        kickOff
        street
        townCity
        county
        postcode
        isActive
        interestedUsers {
          nextToken
          __typename
        }
        registeredPlayers {
          nextToken
          __typename
        }
        selectedPlayers
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePlayerPlayerPost = /* GraphQL */ `
  mutation UpdatePlayerPlayerPost(
    $input: UpdatePlayerPlayerPostInput!
    $condition: ModelPlayerPlayerPostConditionInput
  ) {
    updatePlayerPlayerPost(input: $input, condition: $condition) {
      id
      playerId
      playerPostId
      player {
        id
        name
        dob
        ageGroup
        positions
        skillLevel
        profileID
        registeredPlayerPosts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      playerPost {
        id
        title
        description
        createdByName
        createdByProfileID
        ageGroup
        positionsNeeded
        numOfPlayersNeeded
        skillLevel
        kickOff
        street
        townCity
        county
        postcode
        isActive
        interestedUsers {
          nextToken
          __typename
        }
        registeredPlayers {
          nextToken
          __typename
        }
        selectedPlayers
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePlayerPlayerPost = /* GraphQL */ `
  mutation DeletePlayerPlayerPost(
    $input: DeletePlayerPlayerPostInput!
    $condition: ModelPlayerPlayerPostConditionInput
  ) {
    deletePlayerPlayerPost(input: $input, condition: $condition) {
      id
      playerId
      playerPostId
      player {
        id
        name
        dob
        ageGroup
        positions
        skillLevel
        profileID
        registeredPlayerPosts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      playerPost {
        id
        title
        description
        createdByName
        createdByProfileID
        ageGroup
        positionsNeeded
        numOfPlayersNeeded
        skillLevel
        kickOff
        street
        townCity
        county
        postcode
        isActive
        interestedUsers {
          nextToken
          __typename
        }
        registeredPlayers {
          nextToken
          __typename
        }
        selectedPlayers
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProfileMatchPost = /* GraphQL */ `
  mutation CreateProfileMatchPost(
    $input: CreateProfileMatchPostInput!
    $condition: ModelProfileMatchPostConditionInput
  ) {
    createProfileMatchPost(input: $input, condition: $condition) {
      id
      profileId
      matchPostId
      profile {
        id
        username
        name
        dob
        email
        accountType
        street
        townCity
        county
        postcode
        phoneNumber
        players {
          nextToken
          __typename
        }
        team {
          nextToken
          __typename
        }
        matchPosts {
          nextToken
          __typename
        }
        interestedMatchPosts {
          nextToken
          __typename
        }
        playerPosts {
          nextToken
          __typename
        }
        interestedPlayerPosts {
          nextToken
          __typename
        }
        chats {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      matchPost {
        id
        title
        description
        createdByName
        createdByProfileID
        gameType
        ageGroup
        teamSize
        substitutionLimit
        cards
        halfLength
        kickOff
        street
        townCity
        county
        postcode
        isActive
        teamID
        teamName
        interestedUsers {
          nextToken
          __typename
        }
        selectedOpponent
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProfileMatchPost = /* GraphQL */ `
  mutation UpdateProfileMatchPost(
    $input: UpdateProfileMatchPostInput!
    $condition: ModelProfileMatchPostConditionInput
  ) {
    updateProfileMatchPost(input: $input, condition: $condition) {
      id
      profileId
      matchPostId
      profile {
        id
        username
        name
        dob
        email
        accountType
        street
        townCity
        county
        postcode
        phoneNumber
        players {
          nextToken
          __typename
        }
        team {
          nextToken
          __typename
        }
        matchPosts {
          nextToken
          __typename
        }
        interestedMatchPosts {
          nextToken
          __typename
        }
        playerPosts {
          nextToken
          __typename
        }
        interestedPlayerPosts {
          nextToken
          __typename
        }
        chats {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      matchPost {
        id
        title
        description
        createdByName
        createdByProfileID
        gameType
        ageGroup
        teamSize
        substitutionLimit
        cards
        halfLength
        kickOff
        street
        townCity
        county
        postcode
        isActive
        teamID
        teamName
        interestedUsers {
          nextToken
          __typename
        }
        selectedOpponent
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProfileMatchPost = /* GraphQL */ `
  mutation DeleteProfileMatchPost(
    $input: DeleteProfileMatchPostInput!
    $condition: ModelProfileMatchPostConditionInput
  ) {
    deleteProfileMatchPost(input: $input, condition: $condition) {
      id
      profileId
      matchPostId
      profile {
        id
        username
        name
        dob
        email
        accountType
        street
        townCity
        county
        postcode
        phoneNumber
        players {
          nextToken
          __typename
        }
        team {
          nextToken
          __typename
        }
        matchPosts {
          nextToken
          __typename
        }
        interestedMatchPosts {
          nextToken
          __typename
        }
        playerPosts {
          nextToken
          __typename
        }
        interestedPlayerPosts {
          nextToken
          __typename
        }
        chats {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      matchPost {
        id
        title
        description
        createdByName
        createdByProfileID
        gameType
        ageGroup
        teamSize
        substitutionLimit
        cards
        halfLength
        kickOff
        street
        townCity
        county
        postcode
        isActive
        teamID
        teamName
        interestedUsers {
          nextToken
          __typename
        }
        selectedOpponent
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProfilePlayerPost = /* GraphQL */ `
  mutation CreateProfilePlayerPost(
    $input: CreateProfilePlayerPostInput!
    $condition: ModelProfilePlayerPostConditionInput
  ) {
    createProfilePlayerPost(input: $input, condition: $condition) {
      id
      profileId
      playerPostId
      profile {
        id
        username
        name
        dob
        email
        accountType
        street
        townCity
        county
        postcode
        phoneNumber
        players {
          nextToken
          __typename
        }
        team {
          nextToken
          __typename
        }
        matchPosts {
          nextToken
          __typename
        }
        interestedMatchPosts {
          nextToken
          __typename
        }
        playerPosts {
          nextToken
          __typename
        }
        interestedPlayerPosts {
          nextToken
          __typename
        }
        chats {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      playerPost {
        interestedUsers {
          nextToken
          __typename
        }
        registeredPlayers {
          nextToken
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const updateProfilePlayerPost = /* GraphQL */ `
  mutation UpdateProfilePlayerPost(
    $input: UpdateProfilePlayerPostInput!
    $condition: ModelProfilePlayerPostConditionInput
  ) {
    updateProfilePlayerPost(input: $input, condition: $condition) {
      id
      profileId
      playerPostId
      profile {
        id
        username
        name
        dob
        email
        accountType
        street
        townCity
        county
        postcode
        phoneNumber
        players {
          nextToken
          __typename
        }
        team {
          nextToken
          __typename
        }
        matchPosts {
          nextToken
          __typename
        }
        interestedMatchPosts {
          nextToken
          __typename
        }
        playerPosts {
          nextToken
          __typename
        }
        interestedPlayerPosts {
          nextToken
          __typename
        }
        chats {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      playerPost {
        id
        title
        description
        createdByName
        createdByProfileID
        ageGroup
        positionsNeeded
        numOfPlayersNeeded
        skillLevel
        kickOff
        street
        townCity
        county
        postcode
        isActive
        interesetdUsers {
          nextToken
          __typename
        }
        registeredPlayers {
          nextToken
          __typename
        }
        selectedPlayers
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProfilePlayerPost = /* GraphQL */ `
  mutation DeleteProfilePlayerPost(
    $input: DeleteProfilePlayerPostInput!
    $condition: ModelProfilePlayerPostConditionInput
  ) {
    deleteProfilePlayerPost(input: $input, condition: $condition) {
      id
      playerPostId
      profileId
    }
  }
`;
export const createProfileChat = /* GraphQL */ `
  mutation CreateProfileChat(
    $input: CreateProfileChatInput!
    $condition: ModelProfileChatConditionInput
  ) {
    createProfileChat(input: $input, condition: $condition) {
      id
      profileId
      chatId
      profile {
        id
        username
        name
        dob
        email
        accountType
        street
        townCity
        county
        postcode
        phoneNumber
        players {
          nextToken
          __typename
        }
        team {
          nextToken
          __typename
        }
        matchPosts {
          nextToken
          __typename
        }
        interestedMatchPosts {
          nextToken
          __typename
        }
        playerPosts {
          nextToken
          __typename
        }
        interestedPlayerPosts {
          nextToken
          __typename
        }
        chats {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      chat {
        id
        name
        users {
          nextToken
          __typename
        }
        messages {
          nextToken
          __typename
        }
        userIDs
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProfileChat = /* GraphQL */ `
  mutation UpdateProfileChat(
    $input: UpdateProfileChatInput!
    $condition: ModelProfileChatConditionInput
  ) {
    updateProfileChat(input: $input, condition: $condition) {
      id
      profileId
      chatId
      profile {
        id
        username
        name
        dob
        email
        accountType
        street
        townCity
        county
        postcode
        phoneNumber
        players {
          nextToken
          __typename
        }
        team {
          nextToken
          __typename
        }
        matchPosts {
          nextToken
          __typename
        }
        interestedMatchPosts {
          nextToken
          __typename
        }
        playerPosts {
          nextToken
          __typename
        }
        interestedPlayerPosts {
          nextToken
          __typename
        }
        chats {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      chat {
        id
        name
        users {
          nextToken
          __typename
        }
        messages {
          nextToken
          __typename
        }
        userIDs
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProfileChat = /* GraphQL */ `
  mutation DeleteProfileChat(
    $input: DeleteProfileChatInput!
    $condition: ModelProfileChatConditionInput
  ) {
    deleteProfileChat(input: $input, condition: $condition) {
      id
      profileId
      chatId
      profile {
        id
        username
        name
        dob
        email
        accountType
        street
        townCity
        county
        postcode
        phoneNumber
        players {
          nextToken
          __typename
        }
        team {
          nextToken
          __typename
        }
        matchPosts {
          nextToken
          __typename
        }
        interestedMatchPosts {
          nextToken
          __typename
        }
        playerPosts {
          nextToken
          __typename
        }
        interestedPlayerPosts {
          nextToken
          __typename
        }
        chats {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      chat {
        id
        name
        users {
          nextToken
          __typename
        }
        messages {
          nextToken
          __typename
        }
        userIDs
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateProfileEmail = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      email
    }
  }
`;

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      createdByProfileId
      associtedUsersProfileIDs
      opposingCoachName
      location
      date
      status
    }
  }
`;

export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      createdByProfileId
      associtedUsersProfileIDs
      opposingCoachName
      location
      date
      status
    }
  }
`;

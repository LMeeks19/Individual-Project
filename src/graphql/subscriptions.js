/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeamPlayer = /* GraphQL */ `
  subscription OnCreateTeamPlayer(
    $filter: ModelSubscriptionTeamPlayerFilterInput
  ) {
    onCreateTeamPlayer(filter: $filter) {
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
export const onUpdateTeamPlayer = /* GraphQL */ `
  subscription OnUpdateTeamPlayer(
    $filter: ModelSubscriptionTeamPlayerFilterInput
  ) {
    onUpdateTeamPlayer(filter: $filter) {
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
export const onDeleteTeamPlayer = /* GraphQL */ `
  subscription OnDeleteTeamPlayer(
    $filter: ModelSubscriptionTeamPlayerFilterInput
  ) {
    onDeleteTeamPlayer(filter: $filter) {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onCreateTeam(filter: $filter) {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onUpdateTeam(filter: $filter) {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
    onDeleteTeam(filter: $filter) {
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onCreatePlayer(filter: $filter) {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onUpdatePlayer(filter: $filter) {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onDeletePlayer(filter: $filter) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onCreateProfile(filter: $filter) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onUpdateProfile(filter: $filter) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
    onDeleteProfile(filter: $filter) {
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
export const onCreateMatchPost = /* GraphQL */ `
  subscription OnCreateMatchPost(
    $filter: ModelSubscriptionMatchPostFilterInput
  ) {
    onCreateMatchPost(filter: $filter) {
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
export const onUpdateMatchPost = /* GraphQL */ `
  subscription OnUpdateMatchPost(
    $filter: ModelSubscriptionMatchPostFilterInput
  ) {
    onUpdateMatchPost(filter: $filter) {
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
export const onDeleteMatchPost = /* GraphQL */ `
  subscription OnDeleteMatchPost(
    $filter: ModelSubscriptionMatchPostFilterInput
  ) {
    onDeleteMatchPost(filter: $filter) {
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
export const onCreatePlayerPost = /* GraphQL */ `
  subscription OnCreatePlayerPost(
    $filter: ModelSubscriptionPlayerPostFilterInput
  ) {
    onCreatePlayerPost(filter: $filter) {
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
export const onUpdatePlayerPost = /* GraphQL */ `
  subscription OnUpdatePlayerPost(
    $filter: ModelSubscriptionPlayerPostFilterInput
  ) {
    onUpdatePlayerPost(filter: $filter) {
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
export const onDeletePlayerPost = /* GraphQL */ `
  subscription OnDeletePlayerPost(
    $filter: ModelSubscriptionPlayerPostFilterInput
  ) {
    onDeletePlayerPost(filter: $filter) {
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
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
    onCreateChat(filter: $filter) {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
    onUpdateChat(filter: $filter) {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
    onDeleteChat(filter: $filter) {
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
export const onCreateChatMessage = /* GraphQL */ `
  subscription OnCreateChatMessage(
    $filter: ModelSubscriptionChatMessageFilterInput
  ) {
    onCreateChatMessage(filter: $filter) {
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
export const onUpdateChatMessage = /* GraphQL */ `
  subscription OnUpdateChatMessage(
    $filter: ModelSubscriptionChatMessageFilterInput
  ) {
    onUpdateChatMessage(filter: $filter) {
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
export const onDeleteChatMessage = /* GraphQL */ `
  subscription OnDeleteChatMessage(
    $filter: ModelSubscriptionChatMessageFilterInput
  ) {
    onDeleteChatMessage(filter: $filter) {
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
export const onCreatePlayerPlayerPost = /* GraphQL */ `
  subscription OnCreatePlayerPlayerPost(
    $filter: ModelSubscriptionPlayerPlayerPostFilterInput
  ) {
    onCreatePlayerPlayerPost(filter: $filter) {
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
export const onUpdatePlayerPlayerPost = /* GraphQL */ `
  subscription OnUpdatePlayerPlayerPost(
    $filter: ModelSubscriptionPlayerPlayerPostFilterInput
  ) {
    onUpdatePlayerPlayerPost(filter: $filter) {
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
export const onDeletePlayerPlayerPost = /* GraphQL */ `
  subscription OnDeletePlayerPlayerPost(
    $filter: ModelSubscriptionPlayerPlayerPostFilterInput
  ) {
    onDeletePlayerPlayerPost(filter: $filter) {
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
export const onCreateProfileMatchPost = /* GraphQL */ `
  subscription OnCreateProfileMatchPost(
    $filter: ModelSubscriptionProfileMatchPostFilterInput
  ) {
    onCreateProfileMatchPost(filter: $filter) {
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
export const onUpdateProfileMatchPost = /* GraphQL */ `
  subscription OnUpdateProfileMatchPost(
    $filter: ModelSubscriptionProfileMatchPostFilterInput
  ) {
    onUpdateProfileMatchPost(filter: $filter) {
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
export const onDeleteProfileMatchPost = /* GraphQL */ `
  subscription OnDeleteProfileMatchPost(
    $filter: ModelSubscriptionProfileMatchPostFilterInput
  ) {
    onDeleteProfileMatchPost(filter: $filter) {
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
export const onCreateProfilePlayerPost = /* GraphQL */ `
  subscription OnCreateProfilePlayerPost(
    $filter: ModelSubscriptionProfilePlayerPostFilterInput
  ) {
    onCreateProfilePlayerPost(filter: $filter) {
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
export const onUpdateProfilePlayerPost = /* GraphQL */ `
  subscription OnUpdateProfilePlayerPost(
    $filter: ModelSubscriptionProfilePlayerPostFilterInput
  ) {
    onUpdateProfilePlayerPost(filter: $filter) {
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
export const onDeleteProfilePlayerPost = /* GraphQL */ `
  subscription OnDeleteProfilePlayerPost(
    $filter: ModelSubscriptionProfilePlayerPostFilterInput
  ) {
    onDeleteProfilePlayerPost(filter: $filter) {
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
export const onCreateProfileChat = /* GraphQL */ `
  subscription OnCreateProfileChat(
    $filter: ModelSubscriptionProfileChatFilterInput
  ) {
    onCreateProfileChat(filter: $filter) {
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
export const onUpdateProfileChat = /* GraphQL */ `
  subscription OnUpdateProfileChat(
    $filter: ModelSubscriptionProfileChatFilterInput
  ) {
    onUpdateProfileChat(filter: $filter) {
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
export const onDeleteProfileChat = /* GraphQL */ `
  subscription OnDeleteProfileChat(
    $filter: ModelSubscriptionProfileChatFilterInput
  ) {
    onDeleteProfileChat(filter: $filter) {
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

export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onCreateNotification(filter: $filter) {
      id
      toProfileId
      message
      type
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onUpdateNotification(filter: $filter) {
      id
      toProfileId
      message
      type
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onDeleteNotification(filter: $filter) {
      id
      toProfileId
      message
      type
      isRead
      createdAt
      updatedAt
      __typename
    }
  }
`;

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
      posts {
        items {
          id
          title
          description
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
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedPosts {
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
      posts {
        items {
          id
          title
          description
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
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedPosts {
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
      posts {
        items {
          id
          title
          description
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
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      interestedPosts {
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
      interestedUsers {
        items {
          profileId
          id
          matchPostId
          createdAt
          updatedAt
          profile {
            id
            name
            email
            accountType
            county
            createdAt
            dob
            phoneNumber
            postcode
            street
            townCity
            updatedAt
            username
            team {
              items {
                ageGroup
                createdAt
                email
                id
                league
                location
                name
                updatedAt
                website
                profileID
                phoneNumber
              }
              nextToken
            }
          }
        }
        nextToken
      }
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
          profileId
          id
          matchPostId
          createdAt
          updatedAt
          profile {
            id
            name
            email
            accountType
            county
            createdAt
            dob
            phoneNumber
            postcode
            street
            townCity
            updatedAt
            username
            team {
              items {
                ageGroup
                createdAt
                email
                id
                league
                location
                name
                updatedAt
                website
                profileID
                phoneNumber
              }
              nextToken
            }
          }
        }
        nextToken
      }
      createdAt
      updatedAt
      __typename
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
          profile {
            id
            name
            email
          }
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
          profile {
            id
            name
            email
          }
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
          }
          nextToken
          __typename
        }
        posts {
          nextToken
          __typename
        }
        interestedPosts {
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
        interestedUsers {
          __typename
        }
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
        posts {
          nextToken
          __typename
        }
        interestedPosts {
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
          items {
            ageGroup
            createdAt
            email
            id
            league
            location
            name
            updatedAt
            website
            profileID
            phoneNumber
          }
          nextToken
          __typename
        }
        posts {
          nextToken
          __typename
        }
        interestedPosts {
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
        posts {
          nextToken
          __typename
        }
        interestedPosts {
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
        posts {
          nextToken
          __typename
        }
        interestedPosts {
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

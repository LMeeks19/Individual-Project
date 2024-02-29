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
      createdByName
      team
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
      interestedUsers
      isActive
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
      createdByName
      team
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
      interestedUsers
      isActive
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
      createdByName
      team
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
      interestedUsers
      isActive
      createdAt
      updatedAt
      __typename
    }
  }
`;

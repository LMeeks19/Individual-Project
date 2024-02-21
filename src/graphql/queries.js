/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeamPlayer = /* GraphQL */ `
  query GetTeamPlayer($id: ID!) {
    getTeamPlayer(id: $id) {
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
export const listTeamPlayers = /* GraphQL */ `
  query ListTeamPlayers(
    $filter: ModelTeamPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const teamPlayersByTeamId = /* GraphQL */ `
  query TeamPlayersByTeamID(
    $teamID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTeamPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamPlayersByTeamID(
      teamID: $teamID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      profileId
      name
      league
      ageGroup
      location
      email
      phoneNumber
      website
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profileId
        name
        league
        ageGroup
        location
        email
        phoneNumber
        website
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
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
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const playersByProfileId = /* GraphQL */ `
  query PlayersByProfileID(
    $profileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    playersByProfileID(
      profileID: $profileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
      createdAt
      updatedAt
      profileTeamId
      __typename
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      name
      dob
      username
      email
      phoneNumber
      accountType
      street
      townCity
      county
      postcode
      createdAt
      updatedAt
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
        name
        dob
        username
        email
        phoneNumber
        accountType
        street
        townCity
        county
        postcode
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
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const getPlayersByProfileId = 
`query getPlayersByProfileId($profileId: ID!) {
  playersByProfileId(profileId: $profileId) {
    items {
      id
      profileId
      name
      dob
      ageGroup
      positions
      skillLevel
      createdAt
      updatedAt
    }
  }
}`;

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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      username
      name
      email
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
        username
        name
        email
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

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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

export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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

export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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

export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
      id
      profileId
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

export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
      id
      profileId
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

export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
      id
      profileId
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

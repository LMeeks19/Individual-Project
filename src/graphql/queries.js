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
export const teamPlayersByTeamID = /* GraphQL */ `
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
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        players {
          nextToken
          __typename
        }
        associatedMatchPosts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const teamsByProfileID = /* GraphQL */ `
  query TeamsByProfileID(
    $profileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamsByProfileID(
      profileID: $profileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        players {
          nextToken
          __typename
        }
        associatedMatchPosts {
          nextToken
          __typename
        }
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
export const playersByProfileID = /* GraphQL */ `
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMatchPost = /* GraphQL */ `
  query GetMatchPost($id: ID!) {
    getMatchPost(id: $id) {
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
export const listMatchPosts = /* GraphQL */ `
  query ListMatchPosts(
    $filter: ModelMatchPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatchPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        interestedUsers {
          items {
            id
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const matchPostsByCreatedByProfileID = /* GraphQL */ `
  query MatchPostsByCreatedByProfileID(
    $createdByProfileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMatchPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    matchPostsByCreatedByProfileID(
      createdByProfileID: $createdByProfileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        interestedUsers {
          items {
            id
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const matchPostsByTeamID = /* GraphQL */ `
  query MatchPostsByTeamID(
    $teamID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMatchPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    matchPostsByTeamID(
      teamID: $teamID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        interestedUsers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProfileMatchPost = /* GraphQL */ `
  query GetProfileMatchPost($id: ID!) {
    getProfileMatchPost(id: $id) {
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
export const listProfileMatchPosts = /* GraphQL */ `
  query ListProfileMatchPosts(
    $filter: ModelProfileMatchPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileMatchPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const profileMatchPostsByProfileId = /* GraphQL */ `
  query ProfileMatchPostsByProfileId(
    $profileId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileMatchPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileMatchPostsByProfileId(
      profileId: $profileId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const profileMatchPostsByMatchPostId = /* GraphQL */ `
  query ProfileMatchPostsByMatchPostId(
    $matchPostId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileMatchPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profileMatchPostsByMatchPostId(
      matchPostId: $matchPostId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

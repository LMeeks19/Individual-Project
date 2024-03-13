import { atom } from "recoil";

export const themeState = atom({
  key: "themeState",
  default: "system",
});

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    id: "f6322224-d0d1-70bd-9c34-ddc88ccb0b28",
    username: "lm683",
    name: "Louie Meeks",
    dob: "01/08/02",
    email: "lm683@sussex.ac.uk",
    phoneNumber: "+447340197183",
    accountType: "ADMIN",
    street: "25 Dallington Road",
    townCity: "Eastbourne",
    county: "East Sussex",
    postcode: "BN229EG",
    createdAt: "2024-03-01T18:49:41.389Z",
    updatedAt: "2024-03-01T20:13:14.036Z",
    players: [
      {
        name: "Player 1",
        dob: "01/01/01",
        ageGroup: "U21",
        positions: ["ST"],
        skillLevel: "Beginner",
      },
    ],
    team: {
      id: 1,
      profileId: "f6322224-d0d1-70bd-9c34-ddc88ccb0b28",
      name: "Team 1",
      league: "League 1",
      ageGroup: "U21",
      location: "Location 1",
      email: "Eamil 1",
      phoneNumber: "Phone Nuber 1",
      website: "https://youtube.com",
      players: [
        {
          name: " Player 1",
          age: "21",
          kitNumber: "10",
          positions: ["ST", "LM", "RM"],
        },
      ],
    },
  },
});

export const matchPostsState = atom({
  key: "matchPostsState",
  default: [],
});

export const playerPostsState = atom({
  key: "playerPostsState",
  default: [],
});


export const chatsState = atom({
  key: "chatsState",
  default: [],
});

export const selectedChatState = atom({
  key: "selectedChatState",
  default: {
    id: null,
    name: null,
    users: [],
    messages: [],
    userIDs: [],
  },
});

export const warningIsShownState = atom({
  key: "warningIsShownState",
  default: false,
});

export const modalState = atom({
  key: "modalState",
  default: {
    component: <></>,
    title: null,
    isShown: false,
  },
});

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});

import { atom } from "recoil";

export const themeState = atom({
  key: "themeState",
  default: "system",
});

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    id: null,
    username: null,
    name: null,
    dob: null,
    email: null,
    phoneNumber:null,
    accountType:null,
    street: null,
    townCity: null,
    county: null,
    postcode: null,
    createdAt: null,
    updatedAt: null,
    players: [],
    team: {
      id: 1,
      profileId: null,
      name: null,
      league: null,
      ageGroup: null,
      location: null,
      email: null,
      phoneNumber:null,
      website: null,
      players: []
    },
  },
});

export const matchPostsState = atom({
  key: "matchPostsState",
  default: [],
});

export const chatsState = atom({
  key: "chatsState",
  default: [],
});

export const selectedChatState = atom({
  key: "selectedChatState",
  default: null,
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

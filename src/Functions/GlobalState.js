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
    phoneNumber: null,
    accountType: null,
    street: null,
    townCity: null,
    county: null,
    postcode: null,
    players: [],
    team: {
      id: null,
      profileId: null,
      name: null,
      league: null,
      ageGroup: null,
      location: null,
      email: null,
      phoneNumber: null,
      website: null,
      players: []
    }
  },
});

export const matchPostsState = atom({
  key: "matchPostsState",
  default: []
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
    isShown: false
  },
});

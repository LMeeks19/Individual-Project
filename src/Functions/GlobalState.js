import { atom } from "recoil";

// This state contains all the various global variables that when altered will change site-wide
// This is so loads of local components and unnecessary calls to the api don;t need to be made 

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
    createdAt: null,
    updatedAt: null,
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
      players: [],
    },

  },
});

export const notificationsState = atom({
  key: "notificationsState",
  default: [],
});

export const eventsState = atom({
  key: "eventsState",
  default: [],
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
  default: true,
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

export const activeNavbarTabState = atom({
  key: "activateNavbarTabState",
  default: null,
});

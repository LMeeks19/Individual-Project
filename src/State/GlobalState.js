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
  },
});

export const usersRegisteredPlayersState = atom({
  key: "usersRegisteredPlayersState",
  default: [],
});

export const warningIsShownState = atom({
  key: "warningIsShownState",
  default: true,
});

export const modalIsShownState = atom({
  key: "modalIsShownState",
  default: false,
});

export const modalSlotState = atom({
  key: "modalSlotState",
  default: {
    component: <></>,
    title: null,
  },
});

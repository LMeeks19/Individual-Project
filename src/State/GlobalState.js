import { atom } from 'recoil';

export const themeState = atom({
    key: 'themeState',
    default: 'system'
});

export const currentUserState = atom({
    key: 'currentUserState',
    default: {
        id: null,
        username: null,
        name: null,
        dob: null,
        email: null,
        phoneNumber: null,
        accountType: null,
        buildingNameNumber: null,
        street: null,
        townCity: null,
        county: null,
        postcode: null,
    }
})

export const warningIsShownState = atom({
    key: 'warningIsShownState',
    default: true
})
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

export const CreateProfileModalIsShownState = atom({
    key: 'CreateProfileModalIsShownState',
    default: false
})

export const UpdateProfileModalIsShownState = atom({
    key: 'UpdateProfileModalIsShownState',
    default: false
})
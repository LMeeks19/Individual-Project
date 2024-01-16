import { atom } from 'recoil';

export const themeState = atom({
    key: 'themeState',
    default: 'system'
});

export const sideBarState = atom({
    key: 'sideBarState',
    default: false
});

export const isActiveState = atom({
    key: 'isActiveState',
    default: 0
});

export const isLoadingState = atom({
    key: 'isLoadingState',
    default: false
});
import { atom } from "recoil";

import { languages, debtTypes } from '../constants'

export const languageState = atom({
    key: 'languageState',
    default: languages[0],
})

export const debtState = atom({
    key: 'debtCountState',
    default: debtTypes[0],
})

export const selectDateState = atom({
    key: 'selectDate',
    default: new Date(),
})
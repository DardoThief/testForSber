import { createReducer } from '@reduxjs@toolkit';
import { getArray, putData } from "./action";

const initialState = {
    date: {
        name: '',
        lastName: '',
        surName: '',
        age: '',
    },
    array: [],
};

export const reducer = () => createReducer(initialState, {
    [getArray]: function (state, action) {
        state.array = action.payload;
    },
    [putData]: function (state, action) {
        state.data = action.payload;
    },
});
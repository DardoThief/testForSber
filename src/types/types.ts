import { Action, ActionCreator } from "redux";
import { ThunkAction } from 'redux-thunk';
import {store} from "../redux";

export type FormDataType = {
    name: string,
    surName?: string | '',
    lastName: string,
    age: number,
};

export type getArray = {
    type: 'GET_ARRAY',
    payload: string[],
}

export type putData = {
    type: 'PUT_DATA',
    payload: FormDataType,
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AsyncActionType<T,E = any> = ActionCreator<ThunkAction<Promise<T>,E,null,Action<T>>>;
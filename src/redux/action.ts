import { createAction } from '@reduxjs/toolkit';
import { FormDataType } from "../types/types";

export const getArray = createAction('GET_ARRAY');
export const putData = createAction<FormDataType>('PUT_DATA');
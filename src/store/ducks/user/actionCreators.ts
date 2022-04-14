import { createAction } from '@reduxjs/toolkit';
import {UserState, UserLogginData, Tokens, LoadingState, UserRegistrationData} from './store/state';

export enum UserActionsType {
    SET_USER_DATA = 'user/LOAD/SET_USER_DATA',
    FETCH_USER_DATA = 'user/LOAD/FETCH_USER_DATA',
    SET_TOKENS = 'user/SET_TOKENS',
    REFRESH_TOKENS = 'user/REFRESH_TOKENS',
    SET_LOADING_STATE = 'user/LOAD/SET_LOADING_STATE',
    SET_REG_LOADING_STATE = 'user/reg/SET_REG_LOADING_STATE',
    LOGOUT = 'user/LOAD/LOGOUT',
    SET_ERROR_MESSAGE = 'user/SET_ERROR_MESSAGE',
    SET_REG_ERROR_MESSAGE = 'user/SET_REG_ERROR_MESSAGE',
    SET_FORM_DATA = 'user/form/SET_FORM_DATA',
    REG_USER = 'user/reg/REG_USER'
}

export const setUserData = createAction<UserState['data']>(UserActionsType.SET_USER_DATA);
export const setAuthFormDataToStore = createAction<UserState['formState']>(UserActionsType.SET_FORM_DATA);
export const fetchUserData = createAction<UserLogginData>(UserActionsType.FETCH_USER_DATA);
export const regUser = createAction<UserRegistrationData>(UserActionsType.REG_USER);
export const setErrorMessage = createAction<string>(UserActionsType.SET_ERROR_MESSAGE);
export const setRegErrorMessage = createAction<string>(UserActionsType.SET_REG_ERROR_MESSAGE);
export const setTokens = createAction<Tokens | undefined>(UserActionsType.SET_TOKENS);
export const refreshTokens = createAction<Tokens>(UserActionsType.REFRESH_TOKENS);
export const logout = createAction(UserActionsType.LOGOUT);
export const setUserLoadingState = createAction<LoadingState>(UserActionsType.SET_LOADING_STATE);
export const setRegUserLoadingState = createAction<LoadingState>(UserActionsType.SET_REG_LOADING_STATE);

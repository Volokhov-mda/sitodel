import {RootState} from '../../store';
import {LoadingState, Tokens, UserState} from './store/state';

export const selectUser = (state: RootState): UserState => state.user;

export const selectLoadingState = (state: RootState): LoadingState => selectUser(state).loadingState;
export const selectRegLoadingState = (state: RootState): LoadingState => selectUser(state).regLoadingState;

export const selectIsUserLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingState.LOADING;
export const selectIsRegUserLoading = (state: RootState): boolean => selectRegLoadingState(state) === LoadingState.LOADING;

export const selectIsUserNever = (state: RootState): boolean => selectLoadingState(state) === LoadingState.NEVER;

export const selectIsUserLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingState.LOADED;
export const selectIsRegUserLoaded = (state: RootState): boolean => selectRegLoadingState(state) === LoadingState.LOADED;

export const selectErrorMessage = (state: RootState): string | undefined => selectUser(state).errorMessage;
export const selectRegErrorMessage = (state: RootState): string | undefined => selectUser(state).regErrorMessage;
export const selectUserData = (state: RootState): UserState['data'] => selectUser(state)?.data;
export const selectIsUserError = (state: RootState): boolean => selectLoadingState(state) === LoadingState.ERROR;
export const selectIsRegUserError = (state: RootState): boolean => selectRegLoadingState(state) === LoadingState.ERROR;

export const selectTokens = (state: RootState): Tokens | undefined => selectUser(state).tokens;
export const selectAuthFormData = (state: RootState): {email: string; password: string} => selectUser(state).formState;

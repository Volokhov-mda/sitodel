import produce, { Draft } from "immer";
import { UserActionsType } from "./actionCreators";
import { LoadingState, UserState } from "./store/state";

const initialUserState: UserState = {
  errorMessage: undefined,
  regErrorMessage: undefined,
  data: undefined,
  loadingState: LoadingState.NEVER,
  tokens: undefined,
  regLoadingState: LoadingState.NEVER,
  formState: {
    email: "",
    password: "",
  },
};

export const userReducer = produce((draft: Draft<UserState>, action) => {
  switch (action.type) {
    case UserActionsType.SET_TOKENS:
      draft.tokens = action.payload;
      break;
    case UserActionsType.SET_FORM_DATA:
      draft.formState = action.payload;
      break;
    case UserActionsType.FETCH_USER_DATA:
      draft.data = undefined;
      draft.loadingState = LoadingState.LOADING;
      break;
    case UserActionsType.REG_USER:
      draft.data = undefined;
      draft.regLoadingState = LoadingState.LOADING;
      break;
    case UserActionsType.LOGOUT:
      draft.data = undefined;
      draft.regLoadingState = LoadingState.NEVER;
      draft.loadingState = LoadingState.NEVER;
      draft.regErrorMessage = "";
      draft.errorMessage = "";
      break;
    case UserActionsType.SET_USER_DATA:
      draft.data = action.payload;
      draft.loadingState = LoadingState.LOADED;
      draft.errorMessage = "";
      draft.regErrorMessage = "";
      draft.regLoadingState = LoadingState.LOADED;
      break;
    case UserActionsType.SET_ERROR_MESSAGE:
      draft.errorMessage = action.payload;
      break;
    case UserActionsType.SET_REG_ERROR_MESSAGE:
      draft.regErrorMessage = action.payload;
      break;
    case UserActionsType.SET_REG_LOADING_STATE:
      draft.regLoadingState = action.payload;
      break;
    case UserActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;
    default:
      break;
  }
}, initialUserState);

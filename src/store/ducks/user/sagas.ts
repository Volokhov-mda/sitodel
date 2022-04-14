import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchUserData,
  logout,
  refreshTokens,
  regUser,
  setErrorMessage,
  setRegErrorMessage,
  setRegUserLoadingState,
  setTokens,
  setUserData,
  setUserLoadingState,
} from "./actionCreators";
import { userApi } from "../../../api/userApi";
import { LoadingState, Tokens, User } from "./store/state";
import axios from "axios";
import { selectTokens } from "./selectors";
export function* fetchUserDataRequest({
  payload,
}: ReturnType<typeof fetchUserData>) {
  try {
    const tokens: Tokens = yield call(userApi.fetchUserTokens, payload);
    if (tokens) {
      yield put(setTokens(tokens));
    } else {
      delete axios.defaults.headers.common["authorization"];
      yield put(setUserLoadingState(LoadingState.ERROR));
      yield put(setErrorMessage("Что-то пошло не так..."));
    }
  } catch (error) {
    yield put(setUserLoadingState(LoadingState.ERROR));
    yield put(
      setErrorMessage(
        "Неправильная почта или пароль. Возможно, Вы забыли подтвердить почту"
      )
    );
  }
}
function* _fetchUserData() {
  try {
    yield put(setUserLoadingState(LoadingState.LOADING));
    const user: User = yield call(userApi.fetchUserData);
    if (user) {
      yield put(setUserData(user));
    } else {
      yield put(setUserLoadingState(LoadingState.ERROR));
      yield put(setErrorMessage("Ошибка загрузки профиля"));
    }
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    yield put(setUserLoadingState(LoadingState.ERROR));
    yield put(setErrorMessage("Неизвестная ошибка загрузки профиля"));
  }
}
export function* setTokensWorker({ payload }: ReturnType<typeof setTokens>) {
  if (payload && payload.refreshToken) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${payload.accessToken}`;
    localStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("refreshToken", payload.refreshToken);
    yield _fetchUserData();
  }
}
export function* refreshTokensWorker({
  payload,
}: ReturnType<typeof refreshTokens>) {
  try {
    const newTokens: Tokens = yield call(
      userApi.fetchNewTokens,
      payload.refreshToken
    );
    yield put(setTokens(newTokens));
  } catch {
    yield put(setUserLoadingState(LoadingState.ERROR));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
export function* logoutWorker() {
  const tokens: Tokens = yield select(selectTokens);
  call(userApi.deleteToken, tokens.refreshToken);
  delete axios.defaults.headers.common["authorization"];
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  yield put(setTokens(undefined));
  yield put(setUserLoadingState(LoadingState.NEVER));
  yield put(setRegUserLoadingState(LoadingState.NEVER));
}
export function* regUserWorker({ payload }: ReturnType<typeof regUser>) {
  try {
    const resp: boolean | string = yield call(userApi.regUser, payload);
    console.error(resp);
    if ((typeof resp === "boolean")) {
      yield put(setRegUserLoadingState(LoadingState.LOADED));
      yield put(setRegErrorMessage(""));
    } else {
      delete axios.defaults.headers.common["authorization"];
      yield put(setRegUserLoadingState(LoadingState.ERROR));
      yield put(setRegErrorMessage(resp));
    }
  } catch (error) {
    console.error(error);
    yield put(setRegUserLoadingState(LoadingState.ERROR));
    yield put(setRegErrorMessage("Что-то пошло не так..."));
  }
}

export function* UserSaga() {
  yield takeLatest(fetchUserData, fetchUserDataRequest);
  yield takeLatest(refreshTokens, refreshTokensWorker);
  yield takeEvery(logout, logoutWorker);
  yield takeLatest(setTokens, setTokensWorker);
  yield takeEvery(regUser, regUserWorker);
}

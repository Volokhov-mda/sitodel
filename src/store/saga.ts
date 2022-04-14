import { all } from "redux-saga/effects";
import { UserSaga } from "./ducks/user/sagas";


export default function* rootSaga() {
    yield all([
      UserSaga(),
    ]);
  }
  
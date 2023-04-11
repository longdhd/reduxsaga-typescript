import { PayloadAction } from "@reduxjs/toolkit";
import customHistory from "utils/history";
import { take, fork, call, put, delay } from "redux-saga/effects";
import { authAction, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
    console.log("handleLogin", payload);
    yield delay(500);
    try {
        localStorage.setItem("access_Token", "accessToken");
        yield put(authAction.loginSuccess({
            id: 1,
            name: "Long"
        }))
        yield call(customHistory.push, "/admin");
    } catch (error: any) {
        yield put(authAction.loginFail(error.message))
    }
}

function* handleLogout() {
    yield delay(500);
    console.log("handleLogout");
    localStorage.removeItem("access_Token");
    yield call(customHistory.push, "/login");
}

function* watchLoginFlow() {
    while (true) {
        console.log("Watch login");
        const isLoggedIn = Boolean(localStorage.getItem("access_Token"));
        if (isLoggedIn) {
            yield take(authAction.logout.type);
            yield fork(handleLogout);
        }
        const action: PayloadAction<LoginPayload> = yield take(authAction.login.type)
        yield call(handleLogin, action.payload);
    }
}


export default function* authSaga() {
    yield fork(watchLoginFlow);
}
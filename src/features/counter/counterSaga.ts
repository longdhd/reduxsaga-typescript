import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest, delay } from "redux-saga/effects";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

// function log(action: PayloadAction){
//     console.log("Log ",action);
// }

function* handleIncrementSaga(action: PayloadAction<number>){
    console.log("Waiting 2s");
    yield delay(1000);
    console.log("2s passed");
    yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga(){
    console.log('Counter Saga');
    // yield takeEvery("*", log);
    yield takeLatest(incrementSaga.toString(), handleIncrementSaga)
}
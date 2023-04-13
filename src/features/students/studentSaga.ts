import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListParams, ListReponse, Student } from "models";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListReponse<Student> = yield call(studentApi.getAll, action.payload);
        yield put(studentActions.fetchStudentSuccess(response));
    } catch (error) {
        console.log("Failed to fetch students", error);
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>){
    yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudent.type, fetchStudentList);

    yield debounce(500, studentActions.setFilterWithDebouce.type, handleSearchDebounce)
}
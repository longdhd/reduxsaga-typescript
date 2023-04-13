import cityApi from "api/cityApi";
import { City, ListReponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";

function* fetchCityList() {
    try {
        const response: ListReponse<City> = yield call(cityApi.getAll);
        yield put(cityActions.fetchCitySuccess(response));

    } catch (error) {
        console.log('Fail to fetch city ', error);
        yield put(cityActions.fetchCityFail());
    }
}

export default function* citySaga() {
    yield takeLatest(cityActions.fetchCity.type, fetchCityList);
}
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListReponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { dashboardAction, RankingByCity } from './dashboardSlice'

function* fetchStats() {
    const responseList: Array<ListReponse<Student>> = yield all([
        call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
        call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
        call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
        call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    ])

    const statList = responseList.map(x => x.pagination._totalRows);
    const [maleCount, femaleCount, lowMarkCount, highMarkCount] = statList;

    yield put(dashboardAction.setStats({ maleCount, femaleCount, lowMarkCount, highMarkCount }));
}

function* fetchHighestMarkList() {
    const { data }: ListReponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc'
    })

    yield put(dashboardAction.setHighestMarkList(data));
}

function* fetchLowestMarkList() {
    const { data }: ListReponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc'
    })

    yield put(dashboardAction.setLowestMarkList(data));
}

function* fetchRankingByCity() {
    const { data: cityList }: ListReponse<City> = yield call(cityApi.getAll);

    const callApiList = cityList.map(x => call(studentApi.getAll, { _page: 1, _limit: 5, _sort: 'mark', _order: 'desc', city: x.code }));

    const responseList: Array<ListReponse<Student>> = yield all(callApiList);

    const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
        cityId: cityList[idx].code,
        rankingList: x.data,
    }));

    yield put(dashboardAction.setRankingByCity(rankingByCityList));
}

function* fetchDashboardSaga() {
    try {
        yield all([
            call(fetchStats),
            call(fetchHighestMarkList),
            call(fetchLowestMarkList),
            call(fetchRankingByCity)
        ]);

        yield put(dashboardAction.fetchDataSuccess());
    } catch (error) {
        console.log("Fail to fetch dashboard data", error);
        yield put(dashboardAction.fetchDataFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardAction.fetchData.type, fetchDashboardSaga);
}
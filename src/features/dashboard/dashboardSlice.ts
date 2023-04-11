import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Student } from "models";

export interface DashboardStats {
    maleCount: number,
    femaleCount: number,
    lowMarkCount: number,
    highMarkCount: number
}

export interface RankingByCity {
    cityId: string,
    rankingList: Student[]
}

export interface DashboardState {
    isLoading: boolean,
    stats: DashboardStats,
    highestMarkList: Student[],
    lowestMarkList: Student[],
    rankingByCity: RankingByCity[]
}

const initialState: DashboardState = {
    isLoading: false,
    stats: {
        maleCount: 0,
        femaleCount: 0,
        lowMarkCount: 0,
        highMarkCount: 0
    },
    highestMarkList: [],
    lowestMarkList: [],
    rankingByCity: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state) {
            state.isLoading = true;
        },
        fetchDataSuccess(state) {
            state.isLoading = false;
        },
        fetchDataFailed(state) {
            state.isLoading = false;
        },

        setStats(state, action: PayloadAction<DashboardStats>) {
            state.stats = action.payload;
        },
        setHighestMarkList(state, action: PayloadAction<Student[]>) {
            state.highestMarkList = action.payload;
        },
        setLowestMarkList(state, action: PayloadAction<Student[]>) {
            state.lowestMarkList = action.payload;
        },
        setRankingByCity(state, action: PayloadAction<RankingByCity[]>) {
            state.rankingByCity = action.payload;
        },
    }
})

//Actions
export const dashboardAction = dashboardSlice.actions;

//Selectors
export const selectLoading = (state: RootState) => state.dashboard.isLoading;
export const selectStats = (state: RootState) => state.dashboard.stats;
export const selectHighestMarkList = (state: RootState) => state.dashboard.highestMarkList;
export const selectLowestMarkList = (state: RootState) => state.dashboard.lowestMarkList;
export const selectRankingByCity = (state: RootState) => state.dashboard.rankingByCity;

//Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, ListReponse } from "models";

export interface CityState {
    loading: boolean,
    cityList: City[]
}

const initialState: CityState = {
    loading: false,
    cityList: []
}

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCity(state) {
            state.loading = true;
        },
        fetchCitySuccess(state, action: PayloadAction<ListReponse<City>>) {
            state.loading = false;
            state.cityList = action.payload.data;
        },
        fetchCityFail(state) {
            state.loading = false;
        },

    }
})

export const cityActions = citySlice.actions;

export const selectCityList = (state: RootState) => state.city.cityList;
export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
    cityList.reduce((map: { [key: string]: City }, city) => {
        map[city.code] = city;
        return map;
    }, {})
)
export const selectCityOptions = createSelector(selectCityList, cityList => 
    cityList.map(city => (
        {
            label: city.name,
            value: city.code
        }
)))

const cityReducer = citySlice.reducer;
export default cityReducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListReponse, PaginationParams, Student } from 'models';

export interface StudentState {
    loading: boolean,
    list: Student[],
    filter: ListParams,
    pagination: PaginationParams
}

const initialState: StudentState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 15,
    },
    pagination: {
        _page: 1,
        _limit: 15,
        _totalRows: 15
    }
}

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        fetchStudent(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchStudentSuccess(state, action: PayloadAction<ListReponse<Student>>) {
            state.loading = false;
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        fetchStudentFail(state, action) {
            state.loading = false;
        },

        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },

        setFilterWithDebouce(state, action: PayloadAction<ListParams>) { }
    }
})

//Actions
export const studentActions = studentSlice.actions;

//Selectors
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFiler = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

//Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
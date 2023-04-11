import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { User } from "models";

export interface LoginPayload {
    username: string,
    password: string
}

export interface AuthState {
    isLoggedIn: boolean,
    logging?: boolean,
    currentUser?: User
}

const initialState : AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>){
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>){
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        loginFail(state, action: PayloadAction){
            state.logging = false;
        },

        logout(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    }
})

//Actions
export const authAction = authSlice.actions;

//Selectors
export const selectIsLoggedIn = (state : RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state : RootState) => state.auth.logging;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;
import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    auth: false,
    loading: false
}

const appReducer  =createSlice({
    name: "app",
    initialState,
    reducers:{
        authSuccess: state => { // залезаем в локал сторадж
            state.auth = localStorage.getItem("TOKEN") !==null
        },
        startLoading: state=>{
            state.loading = true;
        },
        stopLoading: state=>{
            state.loading= false;
        },
        logout: state =>{
            localStorage.removeItem("TOKEN");
            state.auth = false
        }
    }
})

export default appReducer.reducer;
export const {authSuccess, startLoading, stopLoading, logout} = appReducer.actions;
export const appSelector = state => state.app;
export const authSelector = state => state.app.auth;

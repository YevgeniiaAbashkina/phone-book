import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import app from "./app";
import auth from "./auth";
import contacts from "./contacts";

const rootReducer = combineReducers({
    app,
    auth,
    contacts,
})

const store = configureStore({reducer:rootReducer});

export default store;

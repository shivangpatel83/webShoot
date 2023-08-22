// import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { rootReducer } from "./components/rootReducers";

export const Store = createStore(rootReducer)

//for api call i have implemented the sagas in this project but did not use just because i have to a single api call
//for api calls we use sagas
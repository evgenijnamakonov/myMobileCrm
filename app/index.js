'use strict';

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { initialState } from './initialState';
import { Root } from "./routes";

const loggerMiddleware = createLogger({ predicate: (getState, action) => true, collapsed: true });
const reducer = combineReducers(reducers);

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
        ),
    );
    return createStore(reducer, initialState, enhancer);
}

const store = configureStore(initialState);

console.disableYellowBox = true;

const App = () => {
    return (
        <Provider store = {store}>
            <Root />
        </Provider>
    );
};
AppRegistry.registerComponent('myMobileCrm', () => App);

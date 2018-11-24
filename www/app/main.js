import React from "react";
import ReactDOM from "react-dom";
import {createStore , applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import App from "./App.js";
import reducer from "./reducers/";

const store = createStore(reducer, applyMiddleware(logger,thunk));

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    ,
    document.getElementById("app-container")
);
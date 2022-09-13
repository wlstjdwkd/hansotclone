import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./Router";
import { applyMiddleware, createStore } from "redux";
import promiseMiddlerware from "redux-thunk";
import reduxThunk from "redux-thunk";

const createStoreWidthMiddleware = applyMiddleware(
    promiseMiddlerware,
    reduxThunk
)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
          <Router />
  </>
);

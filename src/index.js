import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Router from "./Router";
// import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
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
      {/*<Provider store={createStoreWidthMiddleware(*/}
      {/*    // 리듀서를 생성후 넣어준다*/}
      {/*    //*/}
      {/*    //개발자 도구를 사용하기 위한 설정*/}
      {/*    window.__REDUX_DEVTOOLS_EXTENSION__ &&*/}
      {/*    window.__REDUX_DEVTOOLS_EXTENSION__()*/}
      {/*)}>*/}
          <Router />
      {/*</Provider>*/}
  </>
);

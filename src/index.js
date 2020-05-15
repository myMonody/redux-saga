import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import user from './userReducer';
import saga from './sagaReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import {createStore, applyMiddleware, combineReducers} from 'redux';

// 合并拆分的reducer
const reducer = combineReducers({
  user,
  saga
})

const sagaMiddleware = createSagaMiddleware();
// applyMiddleware --> compose
const store = createStore(reducer, applyMiddleware(thunk,sagaMiddleware));
// 执行saga
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);

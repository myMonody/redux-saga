import { put, call, take, select } from "redux-saga/effects";
import { actionTypes } from "../sagaReducer";

// 延时
export const delay = (timer) =>
  new Promise((resolve) => setTimeout(resolve, timer));

// 1，移除item
export function* removeItemFlow() {
  while (true) {
    // 监听action,拿到index
    const action = yield take(actionTypes.REMOVE_ITEM);
    yield call(delay, 500);
    // 拿到state
    let tempList = yield select(({ saga: { list } }) => list);
    let list = [
      ...tempList.slice(0, action.index),
      ...tempList.slice(action.index + 1),
    ];
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list,
    });
  }
}

// toggle--切换finished
export function* toggleItemFlow() {
  while (true) {
    // 监听action,拿到index
    const action = yield take(actionTypes.TOGGLE_ITEM);
    yield call(delay, 500);
    // 拿到state
    const tempList = yield select(({ saga: { list } }) => list);
    // 深度处理数据
    let list = [...tempList];
    list = list.map((item, index) =>
      index === action.index
        ? {
            ...item,
            finished: !item.finished,
          }
        : {
            ...item,
          }
    );
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list,
    });
  }
}

// 更新数据
export function* updateItemFlow() {
  while (true) {
    // 监听action,拿到 value index
    const action = yield take(actionTypes.UPDATE_ITEM);
    yield call(delay, 500);
    const tempList = yield select(({ saga: { list } }) => list);
    let list = [...tempList];
    list = list.map((item, index) =>
      index === action.index
        ? {
            ...item,
            title: action.value,
          }
        : {
            ...item,
          }
    );
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list,
    });
  }
}

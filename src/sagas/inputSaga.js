import { put, call, take, select } from "redux-saga/effects";
import { actionTypes } from "../sagaReducer";
import uuid from "../util";
export const delay = (timer) =>
  new Promise((resolve) => setTimeout(resolve, timer));
// 新增数据
export function* addItemFlow() {
  while (true) {
    // 监听action,拿到了value参数值。
    let action = yield take(actionTypes.APPEND_ITEM);
    // 延迟调用。
    yield call(delay, 500);
    // 拿到state数据
    let tempList = yield select(({ saga: { list } }) => list);
    let list = [
      ...tempList,
      {
        title: action.value,
        id: uuid(),
        finished: false,
      },
    ];
    // 调用dispatch(action),
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list,
    });
  }
}

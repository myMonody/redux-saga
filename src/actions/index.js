import { actionTypes } from '../sagaReducer';

export const combineActions = (dispatch) => ({
  appendItem: (value) => dispatch(appendItem(value)),
  removeItem: (index) => dispatch(removeItem(index)),
  toggleItem: (index) => dispatch(toggleItem(index)),
  updateItem: (value, index) => dispatch(updateItem(value, index)),
})
// 追加item
export function appendItem(value) {
  return {
    type: actionTypes.APPEND_ITEM,
    value
  }
}

// 移除item
export function removeItem(index) {
  return {
    type: actionTypes.REMOVE_ITEM,
    index
  }
}

// 切换item
export function toggleItem(index) {
  return {
    type: actionTypes.TOGGLE_ITEM,
    index
  }
}

// 修改数据
export function updateItem(value,index) {
  return {
    type: actionTypes.UPDATE_ITEM,
    value,
    index
  }
}
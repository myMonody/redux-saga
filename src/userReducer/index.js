import fetch from "fetch";
const initialState = {
  condition: {
    username: "",
    address: "",
  },
  userList: [
    {
      key: 0,
      text: "新浪体育",
    },
    {
      key: 1,
      text: "天下足球",
    },
    {
      key: 2,
      text: "五星体育",
    },
  ],
};
export const combineState = ({ user: { condition, userList } }) => ({
  username: condition.username,
  address: condition.address,
  userList: userList,
});
export const combineDispatch = (dispatch) => ({
  changeName: (username) => dispatch(actions.change_name(username)),
  changeAddress: (address) => dispatch(actions.change_address(address)),
  search: () => dispatch(actions.search()),
  reset: () => dispatch(actions.reset()),
  delItem: (index) => dispatch(actions.del_item(index)),
  addItem: (item) => dispatch(actions.add_item(item)),
  modifyItem: (index, item) => dispatch(actions.modify_item(index, item)),
  loadAsyncData: (data) => dispatch(actions.load_async_data(data)),
  loadData: (url) => dispatch(actions.loadData(url)),
});
export const actions = {
  change_name: (username) => ({ type: userTypes.CHANGE_NAME, username }),
  change_address: (address) => ({ type: userTypes.CHANGE_ADDRESS, address }),
  search: () => ({ type: userTypes.SEARCH }),
  reset: () => ({ type: userTypes.RESET }),
  del_item: (index) => ({ type: userTypes.DEL_ITEM, index }),
  add_item: (item) => ({ type: userTypes.ADD_ITEM, item }),
  modify_item: (index, item) => ({ type: userTypes.MODIFY_ITEM, index, item }),
  // 使用redux-thunk
  load_async_data: (data) => (dispatch, getState) => {
    return setTimeout(() => {
      dispatch({ type: userTypes.LOAD_ASYNC_DATA, data });
    }, 1000);
  },
  // redux-thunk伪代码
  loadData: (url) => (dispatch, getState) => {
    dispatch({
      type: userTypes.POST_START,
      isFetching: true,
    });
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: userTypes.POST_SUCCSS,
          isFetching: false,
          payload: json,
        });
      });
  },
};
export const userTypes = {
  CHANGE_NAME: "CHANGE_NAME",
  CHANGE_ADDRESS: "CHANGE_ADDRESS",
  RESET: "RESET",
  DEL_ITEM: "DEL_ITEM",
  ADD_ITEM: "ADD_ITEM",
  MODIFY_ITEM: "MODIFY_ITEM",
  LOAD_ASYNC_DATA: "LOAD_ASYNC_DATA",
  SEARCH: "SEARCH",
  POST_START: "POST_START",
  POST_SUCCSS: "POST_SUCCSS",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case userTypes.CHANGE_NAME:
      return {
        ...state,
        condition: {
          ...state.condition,
          username: action.username,
        },
      };
    case userTypes.CHANGE_ADDRESS:
      return {
        ...state,
        condition: {
          ...state.condition,
          address: action.address,
        },
      };
    case userTypes.RESET:
      return {
        ...state,
        ...initialState,
      };
    case userTypes.DEL_ITEM:
      return {
        ...state,
        userList: [
          ...state.userList.slice(0, action.index),
          ...state.userList.slice(action.index + 1),
        ],
      };
    case userTypes.ADD_ITEM:
      return {
        ...state,
        userList: [...state.userList, action.item],
      };
    case userTypes.MODIFY_ITEM:
      return {
        ...state,
        userList: [
          ...state.userList.map((item, index) =>
            index === action.index
              ? {
                  ...item,
                  ...action.item,
                }
              : { ...item }
          ),
        ],
      };
    case userTypes.LOAD_ASYNC_DATA:
      return {
        ...state,
        userList: [...action.data],
      };
    case userTypes.SEARCH:
      return {
        ...state,
      };
    default:
      return state;
  }
}


export const actionTypes = {
  TODO_COUNT: 'TODO_COUNT',
  APPEND_ITEM: 'APPEND_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  TOGGLE_ITEM: 'TOGGLE_ITEM',
  UPDATE_DATA: 'UPDATE_DATA',
  UPDATE_ITEM: 'UPDATE_ITEM',
};

const initState = {
  count: 0,
  list: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.TODO_COUNT:
      return {
        count: state.count,
      };
    case actionTypes.UPDATE_DATA:
      return {
        ...state,
        list: action.data,
      };
    default:
      return state;
  }
};

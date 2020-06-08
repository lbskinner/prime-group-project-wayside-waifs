import { combineReducers } from "redux";

const requestReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_REQUESTS":
      return action.payload;
    default:
      return state;
  }
};

const detailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  requestReducer,
  detailsReducer,
});

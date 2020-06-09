import { combineReducers } from "redux";

const eventReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENT":
      return action.payload;
    default:
      return state;
  }
};

const detailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENT_DETAILS":
      return [...action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  eventReducer,
  detailsReducer,
});

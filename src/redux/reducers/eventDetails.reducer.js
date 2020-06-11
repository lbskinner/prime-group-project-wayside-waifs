const eventDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENT_DETAILS":
      return [...action.payload];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.eventDetails
export default eventDetailsReducer;

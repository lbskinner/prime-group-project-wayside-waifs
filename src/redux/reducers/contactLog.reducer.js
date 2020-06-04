const contactReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CONTACT":
      return action.payload;
    default:
      return state;
  }
};

// event will be on the redux state at:
// state.contact
export default contactReducer;

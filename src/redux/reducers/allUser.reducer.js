const allUserReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_USER":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.allUser
export default allUserReducer;

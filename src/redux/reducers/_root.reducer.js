import { combineReducers } from "redux";
import errors from "./errors.reducer";
import loginMode from "./loginMode.reducer";
import user from "./user.reducer";
import event from "./event.reducer";
import contact from "./contactLog.reducer";
import allUser from "./allUser.reducer";

import report from "./report.reducer";

import eventDetails from "./eventDetails.reducer";


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  event, // will have all event data
  contact, // will have contact log data
  allUser, // will have all user list

  report, // for reporting events

  eventDetails, // will have specific event details

});

export default rootReducer;

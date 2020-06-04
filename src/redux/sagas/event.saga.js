import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

// save new event request to database
function* saveRequest(action) {
  try {
    // don't need the config since it does not require login to save events
    yield axios.post("/api/request/new", action.payload);
  } catch (error) {
    console.log("Save new event request failed", error);
  }
}

function* eventSaga() {
  yield takeEvery("SAVE_NEW_REQUEST", saveRequest);
}

export default eventSaga;

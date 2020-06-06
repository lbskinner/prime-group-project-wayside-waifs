import axios from "axios";

import { put, takeLatest } from "redux-saga/effects";

function* getEvent() {
  try {
    const response = yield axios.get("/api/event");

    yield put({ type: "SET_EVENT", payload: response.data });
  } catch (error) {
    console.log("Event get request failed", error);
  }
}

function* getEventDetails() {
  try {
    const response = yield axios.get("/api/event/eventDetails");

    yield put({ type: "SET_EVENT_DETAILS", payload: response.data });
  } catch (error) {
    console.log("Event Details get request failed", error);
  }
}

function* assignEvent(action) {
  try {
    yield axios.put("/api/event/assign", action.payload);
  } catch (error) {
    console.log("Error with Assign Event", error);
  }
}
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
  yield takeLatest("GET_EVENTS", getEvent);
  yield takeLatest("GET_EVENT_DETAILS", getEventDetails);
  yield takeLatest("ASSIGN_EVENT", assignEvent);
  yield takeLatest("SAVE_NEW_REQUEST", saveRequest);
}

export default eventSaga;

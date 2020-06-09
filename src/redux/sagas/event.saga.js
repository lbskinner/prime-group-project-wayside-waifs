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

function* getEventDetails(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/event/details/${action.payload}`,
      config
    );
    console.log(response);
    yield put({
      type: "SET_EVENT_DETAILS",
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
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

function* saveEventEdit(action) {
  try {
    // don't need the config since it does not require login to save events
    yield axios.post("/api/event/edit", action.payload);
  } catch (error) {
    console.log("Save event edit failed", error);
  }
}

function* eventSaga() {
  yield takeLatest("GET_EVENTS", getEvent);
  yield takeLatest("GET_EVENT_DETAILS", getEventDetails);
  yield takeLatest("ASSIGN_EVENT", assignEvent);
  yield takeLatest("SAVE_NEW_REQUEST", saveRequest);
  yield takeLatest("SAVE_EVENT", saveEventEdit);
}

export default eventSaga;

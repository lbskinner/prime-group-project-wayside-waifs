import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getEvent() {
  try {
    const response = yield axios.get("/api/event/event");

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

function* assignEvent() {
  try {
    yield axios.put("/api/event/assign", action.payload);
  } catch (error) {
    console.log("Error with Assign Event", error);
  }
}

function* eventSaga() {
  yield takeLatest("GET_EVENT", getEvent);
  yield takeLatest("GET_EVENT_DETAILS", getEventDetails);
  yield takeLatest("ASSIGN_EVENT", assignEvent);
}

export default eventSaga;

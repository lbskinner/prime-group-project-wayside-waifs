import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getEvent() {
  try {
    const response = yield axios.get("/api/user/event");

    yield put({ type: "SET_EVENT", payload: response.data });
  } catch (error) {
    console.log("Event get request failed", error);
  }
}

function* getEventDetails() {
  try {
    const response = yield axios.get("/api/user/eventDetails");

    yield put({ type: "SET_EVENT_DETAILS", payload: response.data });
  } catch (error) {
    console.log("Event Details get request failed", error);
  }
}

function* eventSaga() {
  yield takeLatest("GET_EVENT", getEvent);
  yield takeLatest("GET_EVENT_DETAILS", getEventDetails);
}

export default eventSaga;

import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getReportingEvent(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.post("/api/report", action.payload, config);
    yield put({ type: "SET_REPORTING_EVENT", payload: response.data });
  } catch (error) {
    console.log("Get events for report request failed", error);
  }
}

// function* getEventDetails() {
//   try {
//     const response = yield axios.get("/api/event/eventDetails");

//     yield put({ type: "SET_EVENT_DETAILS", payload: response.data });
//   } catch (error) {
//     console.log("Event Details get request failed", error);
//   }
// }

// function* assignEvent(action) {
//   try {
//     yield axios.put("/api/event/assign", action.payload);
//   } catch (error) {
//     console.log("Error with Assign Event", error);
//   }
// }
// // save new event request to database
// function* saveRequest(action) {
//   try {
//     // don't need the config since it does not require login to save events
//     yield axios.post("/api/request/new", action.payload);
//   } catch (error) {
//     console.log("Save new event request failed", error);
//   }
// }

function* reportSaga() {
  yield takeLatest("GET_REPORTING_EVENT", getReportingEvent);
  //   yield takeLatest("GET_EVENT_DETAILS", getEventDetails);
  //   yield takeLatest("ASSIGN_EVENT", assignEvent);
  //   yield takeLatest("SAVE_NEW_REQUEST", saveRequest);
}

export default reportSaga;

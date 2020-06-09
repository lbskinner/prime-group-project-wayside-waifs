import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import swal from "sweetalert";

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
    const response = yield axios.post("/api/request/new", action.payload);
    if (response.data === "Created") {
      swal(
        "Thank you for submitting your request. An educator will contact you soon."
      );
    } else {
      swal("Oops, something went wrong, please try again!");
    }
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

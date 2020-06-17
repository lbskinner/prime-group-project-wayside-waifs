import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import swal from "sweetalert";

function* getEvent() {
  try {
    const response = yield axios.get("/api/event");
    console.log(response.data);
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
    // console.log("In GET Saga", action.payload);
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
    console.log("In assign event:", action.payload);
    yield axios.put("/api/event/assign", action.payload);
    swal(`The event has been assigned to ${action.payload.name}`);
    yield put({ type: "GET_EVENT_DETAILS", payload: action.payload.event });
    yield put({
      type: "GET_EVENTS",
    });
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

function* saveEvent(action) {
  try {
    // don't need the config since it does not require login to save events
    yield axios.put("/api/event/edit", action.payload);
    yield put({ type: "GET_EVENT_DETAILS", payload: action.payload.id });
  } catch (error) {
    console.log("Edit event request failed", error);
  }
}

function* setStatus(action) {
  try {
    console.log("In Status:", action.payload);
    yield axios.put("/api/event/status", action.payload);
    if (action.payload.status === "Missed") {
      swal(`The status has been set to Missed Connections`);
    } else {
      swal(`The status has been set to ${action.payload.status}`);
    }
    yield put({ type: "GET_EVENT_DETAILS", payload: action.payload.id });
  } catch (error) {
    console.log("Set Status request failed", error);
  }
}

function* eventSaga() {
  yield takeLatest("GET_EVENTS", getEvent);
  yield takeLatest("GET_EVENT_DETAILS", getEventDetails);
  yield takeLatest("ASSIGN_EVENT", assignEvent);
  yield takeLatest("SAVE_NEW_REQUEST", saveRequest);
  yield takeLatest("SAVE_EVENT", saveEvent);
  yield takeLatest("SET_STATUS", setStatus);
}

export default eventSaga;

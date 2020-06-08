import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
// import swal from "sweetalert";

function* fetchAllEvents(action) {
  try {
    let response = yield axios.get("/api/event");
    yield put({
      type: "SET_EVENTS",
      payload: response.data,
    });
    yield console.log(response.data);
  } catch (err) {
    console.warn(err);
  }
}

function* getEvent(action) {
  try {
    const response = yield axios.get(`/api/event/details/${action.payload.id}`);
    console.log(response);
    yield put({
      type: "SET_DETAILS",
      payload: response.data[0],
    });
  } catch (err) {
    console.warn(err);
  }
}

// save new event request to database
function* saveEvent(action) {
  try {
    // don't need the config since it does not require login to save events
    const response = yield axios.post("/api/event", action.payload);
    // if (response.data === "Created") {
    //   swal(
    //     "Thank you for submitting your request. An educator will contact you soon."
    //   );
    // } else {
    //   swal("Oops, something went wrong, please try again!");
    // }
  } catch (error) {
    console.log("Save new event request failed", error);
  }
}

function* eventSaga() {
  yield takeEvery("FETCH_EVENTS", fetchAllEvents);
  yield takeEvery("GET_EVENTS", getEvent);
  yield takeEvery("SAVE_EVENT", saveEvent);
}

export default eventSaga;

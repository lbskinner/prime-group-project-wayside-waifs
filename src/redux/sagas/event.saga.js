import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import swal from "sweetalert";

function* fetchAllRequests(action) {
  try {
    let response = yield axios.get("/api/request");
    yield put({
      type: "SET_REQUESTS",
      payload: response.data,
    });
    yield console.log(response.data);
  } catch (err) {
    console.warn(err);
  }
}

function* getRequest(action) {
  try {
    const response = yield axios.get(`/api/request/details`, action.payload);
    yield put({
      type: "GET_DETAILS",
      payload: response.data[0],
    }); // put() is the same as this.props.dispatch()
  } catch (err) {
    console.warn(err);
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
  yield takeEvery("FETCH_REQUESTS", fetchAllRequests);
  yield takeEvery("GET_REQUEST", getRequest);
  yield takeEvery("SAVE_NEW_REQUEST", saveRequest);
}

export default eventSaga;

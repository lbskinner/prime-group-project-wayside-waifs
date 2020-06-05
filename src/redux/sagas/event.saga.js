import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import swal from "sweetalert";

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
  yield takeEvery("SAVE_NEW_REQUEST", saveRequest);
}

export default eventSaga;

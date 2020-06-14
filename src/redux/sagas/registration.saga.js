import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import swal from "sweetalert";
// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });

    // passes the username password, first name and last name from the payload to the server
    const response = yield axios.post("/api/user/register", action.payload);
    console.log(response);
    if (response.status === 200) {
      swal(
        `User "${response.data[0].username}" has been successfully created.`
      );
    }
    // did not automatically log in the new user after registration
    // because a new user can only be created by another logged in user
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
}

export default registrationSaga;

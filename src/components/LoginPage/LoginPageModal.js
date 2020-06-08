import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

class LoginPageModal extends Component {
  state = {
    username: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      // this.props.handleCloseModal();
      // this.props.history.push("/event");
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    if (this.props.store.user.id) {
      this.props.handleCloseModal();
      this.props.history.push("/event");
    }
    return (
      <div>
        <form onSubmit={this.login}>
          <h1 className="center-login">Login</h1>
          {this.props.store.errors.loginMessage ? (
            <p className="alert" role="alert">
              {this.props.store.errors.loginMessage}
            </p>
          ) : (
            <p>&nbsp;</p>
          )}

          <div>
            <TextField
              value={this.state.username}
              onChange={this.handleInputChangeFor("username")}
              variant="outlined"
              size="small"
              label="Username"
              className="login-input"
            />
          </div>
          <br />
          <div>
            <TextField
              type="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
              variant="outlined"
              size="small"
              label="Password"
              className="login-input"
            />
          </div>
          <br />
          <div>
            <Button
              // className="log-in"
              type="submit"
              name="submit"
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
            >
              Log In
            </Button>
          </div>
        </form>
        {/* <center>
          <button
            type="button"
            // className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            Register
          </button>
        </center> */}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(LoginPageModal));

import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import { Grid, Paper } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    paddingTop: 10,
    paddingBottom: 10,
  },
  padding: {
    padding: "8px 20px",
  },
  inputSize: {
    minWidth: "425px",
    margin: "10px 0px",
  },
});

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  };

  registerUser = (event) => {
    event.preventDefault();
    if (
      this.state.username &&
      this.state.password &&
      this.state.first_name &&
      this.state.last_name
    ) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: 15 }}>
        <Paper classes={{ root: classes.root }} elevation={2}>
          <Typography classes={{ root: classes.padding }} variant="h4">
            Create New User
          </Typography>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            {this.props.errors.registrationMessage && (
              <h2 className="alert" role="alert">
                {this.props.errors.registrationMessage}
              </h2>
            )}
            <Grid container justify="space-between">
              <Grid item>
                <TextField
                  type="text"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor("username")}
                  label="Username*"
                  variant="outlined"
                  classes={{ root: classes.inputSize }}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                  label="Password*"
                  variant="outlined"
                  classes={{ root: classes.inputSize }}
                />
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item>
                <TextField
                  type="text"
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor("first_name")}
                  label="First Name*"
                  variant="outlined"
                  classes={{ root: classes.inputSize }}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor("last_name")}
                  label="Last name*"
                  variant="outlined"
                  classes={{ root: classes.inputSize }}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container justify="flex-end">
              <Button
                variant="contained"
                color="secondary"
                onClick={this.registerUser}
              >
                Create User
              </Button>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(RegisterPage));

import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import swal from "sweetalert";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ReCAPTCHA from "react-google-recaptcha";

import "./RequestForm.css";

const styles = (theme) => ({
  root: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    paddingTop: 10,
    paddingBottom: 10,
  },
  paperTransparent: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#fff0",
  },
  padding: {
    padding: "8px 20px",
  },
  selectorSize: {
    minWidth: 600,
  },
  inputMargin: {
    margin: "10px 0px",
    minWidth: 600,
  },
});

// created to use ref to get recaptcha value
const recaptchaRef = React.createRef();

class RequestForm extends Component {
  state = {
    contact_first_name: "",
    contact_last_name: "",
    contact_email: "",
    contact_phone_number: "",
    organization: "",
    program: "",
    program_other: "",
    program_date: "",
    time_of_day: "",
    student_number: "",
    grade_level: "",
    adult_sponsors: "",
    location: "",
    location_other: "",
    // recaptchaValue: "",
    recaptchaErrorMessage: "",
  };

  // capture values for input fields other than program data
  handelChange = (event, propertyKey) => {
    this.setState({
      ...this.state,
      [propertyKey]: event.target.value,
    });
  };

  // capture program data value with react data picker
  handleDateChange = (date) => {
    this.setState({
      ...this.state,
      program_date: date,
    });
  };

  // submit/dispatch new request data event saga
  submitRequest = (event) => {
    // because recaptcha expires in about 1 minute after it's been clicked
    // get recaptche value when click on submit request button to validate
    const recaptchaValue = recaptchaRef.current.getValue();
    // if recaptch does not have a value (not checked), display an error message
    if (recaptchaValue == "") {
      this.setState({
        ...this.state,
        recaptchaErrorMessage: "Please validate that you are not a robot!",
      });
      // swal("Please validate that you are not a robot!");
      return;
    }
    // create new request object to save to database
    const newRequest = {
      status: "requestReceived",
      contact_first_name: this.state.contact_first_name,
      contact_last_name: this.state.contact_last_name,
      contact_email: this.state.contact_email,
      contact_phone_number: this.state.contact_phone_number,
      organization: this.state.organization,
      program:
        this.state.program === "other"
          ? this.state.program_other
          : this.state.program,
      program_date: moment(this.state.program_date).format("L"),
      time_of_day: this.state.time_of_day,
      student_number: this.state.student_number,
      grade_level: this.state.grade_level,
      adult_sponsors: this.state.adult_sponsors,
      location:
        this.state.location === "off_site"
          ? this.state.location_other
          : this.state.location,
    };
    // validate input fields
    if (
      !newRequest.contact_first_name ||
      !newRequest.contact_last_name ||
      !newRequest.contact_email ||
      !newRequest.contact_phone_number ||
      !newRequest.organization ||
      !newRequest.program ||
      !newRequest.program_date ||
      !newRequest.time_of_day ||
      !newRequest.student_number ||
      !newRequest.grade_level ||
      !newRequest.adult_sponsors ||
      !newRequest.location
    ) {
      swal("Please fill all required fields!");
      return;
    }
    console.log(newRequest);
    // dispatch new request data to saga
    this.props.dispatch({
      type: "SAVE_NEW_REQUEST",
      payload: newRequest,
    });
    // reset local state
    this.setState({
      contact_first_name: "",
      contact_last_name: "",
      contact_email: "",
      contact_phone_number: "",
      organization: "",
      program: "",
      program_other: "",
      program_date: "",
      time_of_day: "",
      student_number: "",
      grade_level: "",
      adult_sponsors: "",
      location: "",
      location_other: "",
    });
  };

  handleClickRecaptcha = (value) => {
    this.setState({
      ...this.state,
      recaptchaErrorMessage: "",
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: 15 }}>
        <Paper classes={{ root: classes.root }} elevation={2}>
          <Typography classes={{ root: classes.padding }} variant="h4">
            Humane Education Request Form
          </Typography>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Contact Information*</Typography>
            <br />
            <Grid container spacing={3}>
              <Grid item>
                <TextField
                  required
                  label="First Name"
                  variant="outlined"
                  value={this.state.contact_first_name}
                  onChange={(event) =>
                    this.handelChange(event, "contact_first_name")
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="Last Name"
                  variant="outlined"
                  value={this.state.contact_last_name}
                  onChange={(event) =>
                    this.handelChange(event, "contact_last_name")
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="Email"
                  variant="outlined"
                  value={this.state.contact_email}
                  onChange={(event) =>
                    this.handelChange(event, "contact_email")
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="Phone Number"
                  variant="outlined"
                  value={this.state.contact_phone_number}
                  onChange={(event) =>
                    this.handelChange(event, "contact_phone_number")
                  }
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">School or Organization Name*</Typography>
            <br />
            <TextField
              variant="outlined"
              fullWidth
              value={this.state.organization}
              onChange={(event) => this.handelChange(event, "organization")}
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Estimated Number of Students*</Typography>
            <br />
            <TextField
              variant="outlined"
              value={this.state.student_number}
              onChange={(event) => this.handelChange(event, "student_number")}
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">
              Please indicate the grade level and age of students*
            </Typography>
            <br />
            <TextField
              variant="outlined"
              value={this.state.grade_level}
              onChange={(event) => this.handelChange(event, "grade_level")}
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Number of Adult Sponsors*</Typography>
            <br />
            <TextField
              variant="outlined"
              value={this.state.adult_sponsors}
              onChange={(event) => this.handelChange(event, "adult_sponsors")}
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">
              Which Program are you interested in?*
            </Typography>
            <br />
            <FormControl
              variant="outlined"
              classes={{ root: classes.selectorSize }}
            >
              <Select
                displayEmpty
                value={this.state.program}
                onChange={(event) => this.handelChange(event, "program")}
              >
                <MenuItem value="">Select a program</MenuItem>
                <MenuItem value="FIA">
                  "Kindness in Action!" (formerly Families in Action)
                </MenuItem>
                <MenuItem value="NMB">"No More Bullying!®"</MenuItem>
                <MenuItem value="DS">
                  PAW-etiquette for Pooches & People: Dog Safety
                </MenuItem>
                <MenuItem value="AE">
                  Activating Em-PAW-thy: Exploring Similarities between Pets and
                  People
                </MenuItem>
                <MenuItem value="OUT">
                  Once U-PAW-n a Time Reading Program
                </MenuItem>
                <MenuItem value="KIA">Kids-in-Action</MenuItem>
                <MenuItem value="ET">Educational Tours</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {this.state.program === "other" && (
              <TextField
                variant="outlined"
                label="Enter program name"
                value={this.state.program_other}
                onChange={(event) => this.handelChange(event, "program_other")}
                classes={{ root: classes.inputMargin }}
              />
            )}
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Preferred location of Program*</Typography>
            <br />
            <FormControl
              variant="outlined"
              classes={{ root: classes.selectorSize }}
            >
              <Select
                displayEmpty
                value={this.state.location}
                onChange={(event) => this.handelChange(event, "location")}
              >
                <MenuItem value="">Select a location</MenuItem>
                <MenuItem value="on_site">Wayside Waifs</MenuItem>
                <MenuItem value="off_site">Other</MenuItem>
              </Select>
            </FormControl>
            {this.state.location === "off_site" && (
              <div>
                <Typography>
                  * Please note that in order to be good stewards of our
                  resources we are unable to deliver programming at locations
                  outside of a 30 minute radius of Wayside Waifs.
                </Typography>
                <TextField
                  variant="outlined"
                  label="Please enter full address"
                  multiline
                  rows="3"
                  value={this.state.location_other}
                  onChange={(event) =>
                    this.handelChange(event, "location_other")
                  }
                  classes={{ root: classes.inputMargin }}
                />
              </div>
            )}
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Preferred date of program*</Typography>
            <Typography>
              * Because weekends are our busiest days for adoptions, educational
              programs are typically held Monday-Friday.
            </Typography>
            <DatePicker
              placeholderText="Click to select a date"
              selected={this.state.program_date}
              onChange={this.handleDateChange}
              minDate={new Date()}
            />
            <Typography variant="h6">Time of day preferred*</Typography>
            <br />
            <FormControl
              variant="outlined"
              classes={{ root: classes.selectorSize }}
            >
              <Select
                displayEmpty
                value={this.state.time_of_day}
                onChange={(event) => this.handelChange(event, "time_of_day")}
              >
                <MenuItem value="">Select time of day</MenuItem>
                <MenuItem value="morning">Morning</MenuItem>
                <MenuItem value="afternoon">Afternoon</MenuItem>
                <MenuItem value="evening">Evening</MenuItem>
                <MenuItem value="no_preference">No Preference</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Paper>

        <Paper classes={{ root: classes.paperTransparent }} elevation={0}>
          <Grid container direction="column" alignItems="flex-end">
            {this.state.recaptchaErrorMessage ? (
              <Typography color="secondary">
                {this.state.recaptchaErrorMessage}
              </Typography>
            ) : (
              <Typography>&nbsp;</Typography>
            )}
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA}
              ref={recaptchaRef}
              onChange={this.handleClickRecaptcha}
            />
          </Grid>
        </Paper>

        <Paper classes={{ root: classes.paperTransparent }} elevation={0}>
          <Grid container justify="flex-end" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={this.submitRequest}
            >
              Submit Request
            </Button>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(RequestForm));

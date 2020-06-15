import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const moment = require("moment");

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

class EventDetailsEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request_date: " ",
      program: this.props.store.eventDetails[0].program || " ",
      program_date: " ",
      time_of_day: " ",
      location: " ",
      organization: " ",
      grade_level: " ",
      student_number: " ",
      adult_sponsors: " ",
      contact_first_name: " ",
      contact_last_name: " ",
      contact_phone_number: " ",
      contact_email: " ",
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    // dispatch to saga to call server API
    this.props.dispatch({
      type: "SET_DETAILS",
      payload: this.props.match.params.id,
    });
  }

  changeDetails = (fieldKey) => (event) => {
    this.setState({
      [fieldKey]: event.target.value,
    });
  };

  programSelect = (event) => {
    this.setState({
      program: event.target.value,
    });
  };

  clickSaveDetails = (event) => {
    // dispatch to saga to make API call
    let newDetails = this.state;

    if (newDetails.request_date == null || newDetails.request_date === " ") {
      newDetails.request_date = this.props.store.eventDetails[0].request_date;
    }

    if (newDetails.program == null || newDetails.program === " ") {
      newDetails.program = this.props.store.eventDetails[0].program;
    }

    if (newDetails.program_date == null || newDetails.program_date === " ") {
      newDetails.program_date = this.props.store.eventDetails[0].program_date;
    }

    if (newDetails.time_of_day == null || newDetails.time_of_day === " ") {
      newDetails.time_of_day = this.props.store.eventDetails[0].time_of_day;
    }

    if (newDetails.location == null || newDetails.location === " ") {
      newDetails.location = this.props.store.eventDetails[0].location;
    }

    if (newDetails.organization == null || newDetails.organization === " ") {
      newDetails.organization = this.props.store.eventDetails[0].organization;
    }

    if (newDetails.grade_level == null || newDetails.grade_level === " ") {
      newDetails.grade_level = this.props.store.eventDetails[0].grade_level;
    }

    if (
      newDetails.student_number == null ||
      newDetails.student_number === " "
    ) {
      newDetails.student_number = this.props.store.eventDetails[0].student_number;
    }

    if (
      newDetails.adult_sponsors == null ||
      newDetails.adult_sponsors === " "
    ) {
      newDetails.adult_sponsors = this.props.store.eventDetails[0].adult_sponsors;
    }

    if (
      newDetails.contact_first_name == null ||
      newDetails.contact_first_name === " "
    ) {
      newDetails.contact_first_name = this.props.store.eventDetails[0].contact_first_name;
    }

    if (
      newDetails.contact_last_name == null ||
      newDetails.contact_last_name === " "
    ) {
      newDetails.contact_last_name = this.props.store.eventDetails[0].contact_last_name;
    }

    if (
      newDetails.contact_phone_number == null ||
      newDetails.contact_phone_number === " "
    ) {
      newDetails.contact_phone_number = this.props.store.eventDetails[0].contact_phone_number;
    }

    if (newDetails.contact_email == null || newDetails.contact_email === " ") {
      newDetails.contact_email = this.props.store.eventDetails[0].contact_email;
    }

    this.props.dispatch({
      type: "SAVE_EVENT",
      payload: { ...newDetails, id: this.props.match.params.id },
    });

    // navigate to the details page
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    const { classes } = this.props;
    return (
      <CssBaseline>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h4">Edit This Event</Typography>
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Edit Event Information:</Typography>
            <br />

            <FormControl variant="outlined">
              <Select
                value={this.state.program}
                onChange={(event) => this.programSelect(event)}
              >
                <MenuItem value="All">All Programs</MenuItem>
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
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">
              Requested Date and Time of Day:
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  variant="outlined"
                  className="input-field"
                  placeholder={`${moment(
                    this.props.store.eventDetails[0].program_date
                  ).format("MM-DD-YYYY")}`}
                  onChange={this.changeDetails("program_date")}
                  type="text"
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  className="input-field"
                  placeholder={`${this.props.store.eventDetails[0].time_of_day}`}
                  onChange={this.changeDetails("time_of_day")}
                  type="text"
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Location:</Typography>
            <TextField
              variant="outlined"
              className="input-field"
              placeholder={`${this.props.store.eventDetails[0].location}`}
              onChange={this.changeDetails("location")}
              type="text"
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Organization:</Typography>
            <TextField
              variant="outlined"
              className="input-field"
              fullWidth
              placeholder={`${this.props.store.eventDetails[0].organization}`}
              onChange={this.changeDetails("organization")}
              type="text"
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Grade Level:</Typography>
            <TextField
              variant="outlined"
              className="input-field"
              placeholder={`${this.props.store.eventDetails[0].grade_level}`}
              onChange={this.changeDetails("grade_level")}
              type="text"
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Number of Students:</Typography>
            <TextField
              variant="outlined"
              className="input-field"
              placeholder={`${this.props.store.eventDetails[0].student_number}`}
              onChange={this.changeDetails("student_number")}
              type="number"
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Number of Adults:</Typography>
            <TextField
              variant="outlined"
              className="input-field"
              placeholder={`${this.props.store.eventDetails[0].adult_sponsors}`}
              onChange={this.changeDetails("adult_sponsors")}
              type="number"
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Edit Contact Information:</Typography>
            <br />
            <Typography variant="h6">Contact Name:</Typography>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  variant="outlined"
                  className="input-field"
                  placeholder={`${this.props.store.eventDetails[0].contact_first_name}`}
                  onChange={this.changeDetails("contact_first_name")}
                  type="text"
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  className="input-field"
                  placeholder={`${this.props.store.eventDetails[0].contact_last_name}`}
                  onChange={this.changeDetails("contact_last_name")}
                  type="text"
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Phone Number:</Typography>
            <TextField
              variant="outlined"
              className="input-field"
              placeholder={`${this.props.store.eventDetails[0].contact_phone_number}`}
              onChange={this.changeDetails("contact_phone_number")}
              type="text"
            />
          </div>
        </Paper>{" "}
        <Paper classes={{ root: classes.root }} elevation={1}>
          <div className={classes.padding}>
            <Typography variant="h6">Email Address:</Typography>
            <TextField
              variant="outlined"
              className="input-field"
              fullWidth
              placeholder={`${this.props.store.eventDetails[0].contact_email}`}
              onChange={this.changeDetails("contact_email")}
              type="text"
            />
          </div>
        </Paper>
        <br />
        <Box display="flex" justifyContent="flex-end" m={1} mr={10} p={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.clickSaveDetails}
          >
            Save
          </Button>
        </Box>
      </CssBaseline>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default withStyles(styles)(connect(mapStoreToProps)(EventDetailsEdit));

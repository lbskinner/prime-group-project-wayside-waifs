import React, { Component } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class EventDetailsEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request_date: " ",
      program: " ",
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

  clickSaveDetails = (event) => {
    // dispatch to saga to make API call
    let newDetails = this.state;

    if (newDetails.request_date == null || newDetails.request_date === "") {
      newDetails.request_date = this.props.store.eventDetails.request_date;
    }

    if (newDetails.program == null || newDetails.program === "") {
      newDetails.program = this.props.store.eventDetails.program;
    }

    if (newDetails.program_date == null || newDetails.program_date === "") {
      newDetails.program_date = this.props.store.eventDetails.program_date;
    }

    if (newDetails.time_of_day == null || newDetails.time_of_day === "") {
      newDetails.time_of_day = this.props.store.eventDetails.time_of_day;
    }

    if (newDetails.location == null || newDetails.location === "") {
      newDetails.location = this.props.store.eventDetails.location;
    }

    if (newDetails.organization == null || newDetails.organization === "") {
      newDetails.organization = this.props.store.eventDetails.organization;
    }

    if (newDetails.grade_level == null || newDetails.grade_level === "") {
      newDetails.grade_level = this.props.store.eventDetails.grade_level;
    }

    if (newDetails.student_number == null || newDetails.student_number === "") {
      newDetails.student_number = this.props.store.eventDetails.student_number;
    }

    if (newDetails.adult_sponsors == null || newDetails.adult_sponsors === "") {
      newDetails.adult_sponsors = this.props.store.eventDetails.adult_sponsors;
    }

    if (
      newDetails.contact_first_name == null ||
      newDetails.contact_first_name === ""
    ) {
      newDetails.contact_first_name = this.props.store.eventDetails.contact_first_name;
    }

    if (
      newDetails.contact_last_name == null ||
      newDetails.contact_last_name === ""
    ) {
      newDetails.contact_last_name = this.props.store.eventDetails.contact_last_name;
    }

    if (
      newDetails.contact_phone_number == null ||
      newDetails.contact_phone_number === ""
    ) {
      newDetails.contact_phone_number = this.props.store.eventDetails.contact_phone_number;
    }

    if (newDetails.contact_email == null || newDetails.contact_email === "") {
      newDetails.contact_email = this.props.store.eventDetails.contact_email;
    }

    this.props.dispatch({
      type: "SAVE_EVENT",
      payload: { newDetails },
    });

    // navigate to the details page
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    return (
      <CssBaseline>
        <div>
          <Paper>
            <Typography variant="h4">Edit This Event</Typography>
          </Paper>
          <br />
          <Paper>
            <Typography variant="h6">Edit Event Information:</Typography>

            <Grid>
              <Typography>Program Requested:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].program}
                onChange={this.changeDetails("program")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Requested Date and Time:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].program_date}
                onChange={this.changeDetails("program_date")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Time of Day:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].time_of_day}
                onChange={this.changeDetails("time_of_day")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Location:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].location}
                onChange={this.changeDetails("location")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Organization:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].organization}
                onChange={this.changeDetails("organization")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Grade Level:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].grade_level}
                onChange={this.changeDetails("grade_level")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Number of Students:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].student_number}
                onChange={this.changeDetails("student_number")}
                type="number"
              />
            </Grid>
            <Grid>
              <Typography>Number of Adults:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].adult_sponsors}
                onChange={this.changeDetails("adult_sponsors")}
                type="number"
              />
            </Grid>
            <br />
            <Typography variant="h6">Edit Contact Information:</Typography>
            <Grid>
              <Typography>First Name:</Typography>
              <TextField
                className="input-field"
                placeholder={
                  this.props.store.eventDetails[0].contact_first_name
                }
                onChange={this.changeDetails("contact_first_name")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Last Name:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].contact_last_name}
                onChange={this.changeDetails("contact_last_name")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Phone Number:</Typography>
              <TextField
                className="input-field"
                placeholder={
                  this.props.store.eventDetails[0].contact_phone_number
                }
                onChange={this.changeDetails("contact_phone_number")}
                type="text"
              />
            </Grid>
            <Grid>
              <Typography>Email Address:</Typography>
              <TextField
                className="input-field"
                placeholder={this.props.store.eventDetails[0].contact_email}
                onChange={this.changeDetails("contact_email")}
                type="text"
              />
            </Grid>
          </Paper>
          <br />
          <Paper>
            <Button className="saveBtn" onClick={this.clickSaveDetails}>
              Save
            </Button>
          </Paper>
        </div>
      </CssBaseline>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(EventDetailsEdit);

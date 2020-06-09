import React, { Component } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

class EventDetailsEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request_date: this.props.store.event.detailsReducer.request_date,
      program: "",
      program_date: "",
      time_of_day: "",
      location: "",
      organization: "",
      grade_level: "",
      student_number: "",
      adult_sponsors: "",
      contact_first_name: "",
      contact_last_name: "",
      contact_phone_number: "",
      contact_email: "",
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
      newDetails.request_date = this.props.store.event.detailsReducer.request_date;
    }

    if (newDetails.program == null || newDetails.program === "") {
      newDetails.program = this.props.store.event.detailsReducer.program;
    }

    if (newDetails.program_date == null || newDetails.program_date === "") {
      newDetails.program_date = this.props.store.event.detailsReducer.program_date;
    }

    if (newDetails.time_of_day == null || newDetails.time_of_day === "") {
      newDetails.time_of_day = this.props.store.event.detailsReducer.time_of_day;
    }

    if (newDetails.location == null || newDetails.location === "") {
      newDetails.location = this.props.store.event.detailsReducer.location;
    }

    if (newDetails.organization == null || newDetails.organization === "") {
      newDetails.organization = this.props.store.event.detailsReducer.organization;
    }

    if (newDetails.grade_level == null || newDetails.grade_level === "") {
      newDetails.grade_level = this.props.store.event.detailsReducer.grade_level;
    }

    if (newDetails.student_number == null || newDetails.student_number === "") {
      newDetails.student_number = this.props.store.event.detailsReducer.student_number;
    }

    if (newDetails.adult_sponsors == null || newDetails.adult_sponsors === "") {
      newDetails.adult_sponsors = this.props.store.event.detailsReducer.adult_sponsors;
    }

    if (
      newDetails.contact_first_name == null ||
      newDetails.contact_first_name === ""
    ) {
      newDetails.contact_first_name = this.props.store.event.detailsReducer.contact_first_name;
    }

    if (
      newDetails.contact_last_name == null ||
      newDetails.contact_last_name === ""
    ) {
      newDetails.contact_last_name = this.props.store.event.detailsReducer.contact_last_name;
    }

    if (
      newDetails.contact_phone_number == null ||
      newDetails.contact_phone_number === ""
    ) {
      newDetails.contact_phone_number = this.props.store.event.detailsReducer.contact_phone_number;
    }

    if (newDetails.contact_email == null || newDetails.contact_email === "") {
      newDetails.contact_email = this.props.store.event.detailsReducer.contact_email;
    }

    this.props.dispatch({
      type: "SAVE_EVENT",
      payload: { newDetails, id: this.props.match.params.id },
    });

    // navigate to the details page
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    return (
      <CssBaseline>
        <div className="bg-img-edit">
          <h3 className="edit-head">Edit This Event</h3>

          <br />
          <div align="center">
            <input
              className="input-field"
              placeholder={this.state.request_date}
              onChange={this.changeDetails("name")}
              type="text"
            />
          </div>
          <div align="center">
            <input
              className="input-field"
              placeholder="Insert New Hours"
              onChange={this.changeDetails("hours")}
              type="text"
            />
          </div>
          <div align="center">
            <input
              className="input-field"
              placeholder="Insert New Number"
              onChange={this.changeDetails("number")}
              type="text"
            />
          </div>
          <div align="center">
            <input
              className="input-field"
              placeholder="Insert New Address"
              onChange={this.changeDetails("address")}
              type="text"
            />
          </div>
          <div align="center">
            <input
              className="input-field"
              placeholder="Insert New Information"
              onChange={this.changeDetails("information")}
              type="text"
            />
          </div>
          <br />

          <div>
            <button className="saveBtn" onClick={this.clickSaveDetails}>
              Save
            </button>
          </div>
        </div>
      </CssBaseline>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(EventDetailsEdit);

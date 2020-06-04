import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Select from "react-select";

const users = this.props.store.allUser;

class AllEvent extends Component {
  // click handlers
  eventDetails = () => {
    this.props.dispatch({
      type: "GET_EVENT_DETAILS",
      payload: this.props.event,
    });
    this.props.history.push("/details");
  };

  assign = (selectedOption) => {
    let submission = {
      user: selectedOption.value.id,
      event: this.props.event.id,
    };

    this.props.dispatch({
      type: "ASSIGN_EVENT",
      payload: submission,
    });
  };

  render() {
    let background = { backgroundColor: "white" };
    if (this.props.event.status === "Contacted") {
      background = { backgroundColor: "lightblue" };
    } else if (this.props.event.status === "Scheduled") {
      background = { backgroundColor: "yellow" };
    }
    return (
      <div onClick={this.eventDetails} style={background}>
        <p>
          {this.props.event.organization}
          <span>{this.props.event.request_date}</span>
        </p>
        <p>Program Date: {this.props.event.program_date}</p>
        <p>Program Requested: {this.props.event.training_program}</p>
        <Select
          value="Assign"
          onChange={this.assign}
          options={users}
          className="selector_container"
        />
      </div>
    );
  }
}
export default connect(mapStoreToProps)(AllEvent);

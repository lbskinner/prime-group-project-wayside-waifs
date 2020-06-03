import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

class AllEvent extends Component {
  // click handlers
  eventDetails = () => {
    this.props.dispatch({
      type: "GET_EVENT_DETAILS",
      payload: this.props.event,
    });
    this.props.history.push("/details");
  };

  assign = () => {
    console.log("Assign clicked");
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
        <button onClick={this.assign}>Assign</button>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(AllEvent);

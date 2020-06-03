import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

class RequestedEvent extends Component {
  // click handlers
  eventDetails = () => {
    console.log("Event Details Clicked");
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
      <div>
        {this.props.event.status === "Requested" && (
          <div onClick={this.eventDetails} style={background}>
            <p>
              {this.props.event.organization}
              <span>{this.props.event.request_date}</span>
            </p>
            <p>Program Date: {this.props.event.program_date}</p>
            <p>Program Requested: {this.props.event.training_program}</p>
            <button onClick={this.assign}>Assign</button>
          </div>
        )}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(RequestedEvent);

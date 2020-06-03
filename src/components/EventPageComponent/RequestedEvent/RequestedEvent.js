import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

class RequestedEvent extends Component {
  render() {
    return (
      <div>
        {this.props.event.status === "Requested" && (
          <div onClick={this.eventDetails}>
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
